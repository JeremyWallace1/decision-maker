/*
 * All routes for polls are defined here
 * Since this file is loaded in server.js into /polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { body, validationResult } = require('express-validator');
const pollQueries = require('../db/queries/polls');
const sendEmail = require('../lib/emailBuilder.js');

// creator submits new poll
router.post('/',
  // Use express-validator middleware to validate the post request
  [
    body('email')
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    body('question0_title')
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
    req.body.resultsUri = 'r' + Math.floor(Math.random() * 99999) + 1;
    req.body.sharingUri = 's' + Math.floor(Math.random() * 99999) + 1;
    const output = [];
    const pollData = {
      email:          req.body.email,
      question:       req.body.question0_title,
      image:          req.body.image0,
      description:    req.body.question0_description,
      resultsUri:    req.body.resultsUri,
      sharingUri:    req.body.sharingUri,
    };

    pollQueries.createPoll(pollData)
      .then(data => output.push(data.response))
      .then(() => {
        const choicePromises = [];
        let countChoice = 0;
        let condition = true;
        while (condition) {
          countChoice += 1;
          if (!req.body[`choice${countChoice}_title`] && countChoice > 2) {
            break;
          }

          const choiceData = {
            pollId: output[0].id,
            title: req.body[`choice${countChoice}_title`],
            image: req.body[`image${countChoice}`],
            description: req.body[`choice${countChoice}_description`],
          };
          
          if (!choiceData.title) {
            choicePromises.push(
              Promise.reject(
                new Error(`choice${countChoice}_title cannot be empty`)
              )
            );
            continue;
          }
          
          if (choiceData.title.length > 255) {
            choicePromises.push(
              Promise.reject(
                new Error(`choice${countChoice}_title is too long`)
              )
            );
            continue;
          }

          choicePromises.push(pollQueries.createChoice(choiceData));
        }
        return Promise.all(choicePromises);
      })
      .then(all => {
        output[0].choices = [];
        all.forEach(element => output[0].choices.push(element));
      })
      .then(() => {
        const referer = req.headers.referer;
        const indexOriginEnd = referer.indexOf('/', 8) + 1;
        const origin = referer.slice(0, indexOriginEnd);

        const poll = output[0];
        let recipientEmail = null;
        switch (process.env.ENV_TYPE) {
        case ('development') :
          recipientEmail = process.env.DEV_EMAIL || null;
          break;
        case ('staging') :
          recipientEmail = process.env.STAGING_EMAIL || null;
          break;
        case ('production') :
          recipientEmail = poll.creator_email || null;
          break;
        }

        const emailConfig = {};
        emailConfig['subject'] = 'New Decision Maker poll created!',
        emailConfig['sender'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
        emailConfig['to'] = [{ 'name': 'Poll Owner', 'email': recipientEmail }];
        emailConfig['replyTo'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
        emailConfig['htmlContent'] = '<html><body><h1>{{params.headline}}</h1><p>{{params.body}}</p><p>{{params.share}}</p><p>{{params.results}}</p></body></html>',
        emailConfig['params'] = {
          'headline': 'You have successfully created a new poll with Decision Maker!',
          'body': `You want to know, ${poll.question} Please use the links below to view results or share your poll with others.`,
          'share': 'Sharing url: ' + origin + '?' + poll.sharing_url,
          'results': 'Results url: ' + origin + '?' + poll.results_url
        };
      
        const sendReceipt = process.env.SENDINBLUE_ENABLE;
        if (!sendReceipt || sendReceipt === 'false') {
          return {};
        }
        return sendEmail(emailConfig);
      })
      .then((data) => console.log(data))
      .then(() => res.send(output))
      .catch(error => {
        console.log(`error output: `, error.message);
        return res.status(500).send('500 - Internal Server Error');
      });
  }
);

module.exports = router;
