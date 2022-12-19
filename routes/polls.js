/*
 * All routes for polls are defined here
 * Since this file is loaded in server.js into /polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const pollQueries = require('../db/queries/polls');

router.post('/', (req, res) => {
  // const { email, title, question } = req.body;
  // const answerTitle1 = req.body.answer1_title;
  // const answerTitle2 = req.body.answer2_title;
  // const answerTitle3 = req.body.answer3_title;
  // const answerDescription1 = req.body.answer1_description;
  // const answerDescription2 = req.body.answer2_description;
  // const answerDescription3 = req.body.answer3_description;
  // // TODO: Better random generator for urls
  // const results_url = 'r' + Math.floor(Math.random() * 99999) + 1;
  // const sharing_url = 's' + Math.floor(Math.random() * 99999) + 1;
  req.body.results_url = 'r' + Math.floor(Math.random() * 99999) + 1;
  req.body.sharing_url = 's' + Math.floor(Math.random() * 99999) + 1;

  pollQueries.createPoll(req.body)
    .then(data => {
      const choicePromises = [];
      choicePromises.push(pollQueries.createPoll(req.body));
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
      
      Promise.all(choicePromises)
        .then(console.log)
        .catch(error => console.log(error.message)); 
      }

    );
  }
)
module.exports = router;
