/*
 * All routes for poll responses are defined here
 * Since this file is loaded in server.js into /responses,
 *   these routes are mounted onto /responses
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const responseQueries = require('../db/queries/polls');

const cookieParser = require('cookie-parser');

// user responds to a poll
router.post('/', (req, res) => {
  // const ip = req.cookies["ip"];
  // For test purposes only, when using curl to POST
  const output = [];
  output.push({ results_url: req.body.results_url });

  const generateIP = () => {
    const buffer = Array(4).fill(0);
    const ipRanges = buffer.map(element => Math.floor(Math.random() * 255) + 1);
    const joined = ipRanges.join('.');
    return joined;
  };

  const countChoices = req.body.choices.length;
  const ip = generateIP();
  const pollId = req.body.poll_id;
  const promises = [];

  for (const choice in req.body.choices) {
    const data = {};
    data.poll_id = pollId;
    data.choice_id = req.body.choices[choice];
    data.respondent_ip = ip;
    data.rank_score = countChoices - choice;
    promises.push(responseQueries.createResponse(data));
  }

  Promise.all(promises)
    .then(all => {
      output[0].responses = all;
      res.send(output);
    })
    .catch(err => console.log(err.message));
    
});

module.exports = router;