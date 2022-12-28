/*
 * All routes for polls are defined here
 * Since this file is loaded in server.js into /polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const { body, validationResult } = require('express-validator');
const pollQueries = require('../db/queries/polls');
const sendEmail = require('../lib/emailBuilder.js')

// creator submits new poll
router.post('/',
  // Use express-validator middleware to validate the post request
  [
    body('email')
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    body('question')
      .isLength({ min: 5})
      .withMessage("the poll question isn't descriptive long enough, please lengthen it")
      .isLength({ max: 255})
      .withMessage("the poll question is too long, please shorten it")
      .trim(),
  ],
  (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // TODO: better randomization, not just numerical
    req.body.results_url = 'r' + Math.floor(Math.random() * 99999) + 1;
    req.body.sharing_url = 's' + Math.floor(Math.random() * 99999) + 1;
    const output = [];
    pollQueries.createPoll(req.body)
    .then(data => output.push(data.response))
    .then(() => {
        const choicePromises = [];
        let countChoice = 0;
        while (true) {
          countChoice += 1;
          if (!req.body[`answer${countChoice}_title`] && countChoice > 2) {
            break;
          }

          const poll_id = output[0].id;
          const description = req.body[`answer${countChoice}_description`];
          let title = req.body[`answer${countChoice}_title`];
          
          if (!title) {
            choicePromises.push(
              Promise.reject(
                new Error(`answer${countChoice}_title cannot be empty`)
              )
            );
            continue;
          }
          
          if (title.length > 255) {
            choicePromises.push(
              Promise.reject(
                new Error(`answer${countChoice}_title is too long`)
              )
            );
            continue;
          }
          
          const choiceData = { poll_id, title, description };

          choicePromises.push(pollQueries.createChoice(choiceData));
        }
        
        return Promise.all(choicePromises)
      }
    )
    .then(all => {
      output[0].answers = [];
      all.forEach(element => output[0].answers.push(element));
      console.log(output);
    })
    .then(() => {
      const poll = output[0];
      const emailConfig = {};
      emailConfig['subject'] = 'New Decision Maker poll created!',
      emailConfig['sender'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
      emailConfig['replyTo'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
      // emailConfig['to'] = [{ 'name': 'Poll Owner', 'email': poll.creator_email }],
      emailConfig['to'] = [{ 'name': 'Poll Owner', 'email': process.env.DEV_EMAIL }],
      emailConfig['htmlContent'] = '<html><body><h1>{{params.headline}}</h1><p>{{params.body}}</p><p>{{params.share}}</p><p>{{params.results}}</p></body></html>',
      emailConfig['params'] = {
        'headline': 'You have successfully created a new poll with Decision Maker!',
        'body': `You want to know, ${poll.question} Please use the links below to view results or share your poll with others.`,
        'share': 'Sharing url: http://' + process.env.SERVER_ADDRESS + ':' + process.env.SERVER_PORT + '/?' + poll.sharing_url,
        'results': 'Results url: http://' + process.env.SERVER_ADDRESS + ':' + process.env.SERVER_PORT + '/?' + poll.results_url
      }
      console.log(emailConfig)
      // return sendEmail(emailConfig);
    })
    .then((data) => console.log(data))
    .then(() => res.send(output))
    // .then(data => {
    //   console.log(data);
    //   res.send(data);
    // })
    // .then(data => {
    //   const pollId = data[0].poll_id;
    //   return res.redirect(`/polls/${pollId}`);
    // })
    .catch(error => {
      console.log(`error output: `, error.message)
      return res.status(500).send('500 - Internal Server Error');
    });
    
  }
);

module.exports = router;
