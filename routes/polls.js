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
// const { createPoll } = require('../public/scripts/app.js');

// creator landing page to create new poll
router.get('/', (req, res) => {
  res.redirect('/');
  // res.status(200).send('GET route /polls/ ***Coming soon...***');
});

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
    pollQueries.createPoll(req.body)
    .then(data => {
        const choicePromises = [];
        let countChoice = 0;
        while (true) {
          countChoice += 1;
          if (!req.body[`answer${countChoice}_title`] && countChoice > 2) {
            break;
          }

          const poll_id = data.response.id;
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
    .then(data => {
      const pollId = data[0].poll_id;
      return res.redirect(`/polls/${pollId}`);
    })
    .catch(error => {
      console.log(`error output: `, error.message)
      return res.status(500).send('500 - Internal Server Error');
    });
    
  }
);

module.exports = router;
