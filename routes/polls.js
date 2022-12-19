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
  // TODO: validation of data
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
