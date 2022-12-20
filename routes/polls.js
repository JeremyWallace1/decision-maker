/*
 * All routes for polls are defined here
 * Since this file is loaded in server.js into /polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const { check, validationResult } = require('express-validator');
const pollQueries = require('../db/queries/polls');

router.post('/',
  // Use express-validator middleware to validate the post request
  [
    check('email')
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    check('question')
      .isLength({ min: 5})
      .withMessage("the poll question isn't descriptive long enough, please lengthen it")
      .isLength({ max: 255})
      .withMessage("the poll question is too long, please shorten it")
      .trim(),
    check('answer1_title')
      .isLength({ min: 1})
      .withMessage("poll answer 1 is not long enough, please lengthen it")
      .isLength({ max: 255})
      .withMessage("poll answer 1 is too long, please shorten it")
      .trim(),
    check('answer2_title')
      .isLength({ min: 1})
      .withMessage("poll answer 2 is not long enough, please lengthen it")
      .isLength({ max: 255})
      .withMessage("poll answer 2 is too long, please shorten it")
      .trim(),
    check('answer3_title')
      .isLength({ min: 1})
      .withMessage("poll answer 3 is not long enough, please lengthen it")
      .isLength({ max: 255})
      .withMessage("poll answer 3 is too long, please shorten it")
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
          if (!req.body[`answer${countChoice}_title`]) {
            break;
          }

          const choiceData = {
            poll_id: data.response.id,
            title: req.body[`answer${countChoice}_title`],
            description: req.body[`answer${countChoice}_description`]
          }

          choicePromises.push(pollQueries.createChoice(choiceData));
        }
        
        return Promise.all(choicePromises)
      }

    )
    .then(data => {
      const pollId = data[0].poll_id;
      return res.redirect(`/polls/${pollId}`);
    })
    .catch(error => console.log(error.message));
    
  }
)
module.exports = router;
