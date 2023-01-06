/*
 * All routes for response data are defined here
 * Since this file is loaded in server.js into api/responses,
 *   these routes are mounted onto /api/responses
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const responseQueries = require('../db/queries/polls');

// API request for responses data with ip address
router.get('/:uri/:ip', (req, res) => {
  const uri = req.params.uri;
  const ip = req.params.ip;
  const responsesData = {};
  const outputData = [];
  responsesData.responseUri = uri;
  responseQueries.getPollBySharingUri(uri)
    .then(data => responsesData.pollId = data.id)
    .then(pollId => responseQueries.getRespondentChoices(ip, pollId))
    .then(data => responsesData.responses = data)
    .then(() => outputData.push(responsesData))
    .then(() => res.json(outputData))
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

// API request for responses data with shortcode uri reference
router.get('/:uri', (req, res) => {
  const uri = req.params.uri;
  const responsesData = {};
  const outputData = [];
  responseQueries.getPollByResultsUri(uri)
    .then(data => responsesData.pollId = data.id)
    .then(responseQueries.getPollResponses(responsesData.pollId))
    .then(data => responsesData.responses = data)
    .then(() => responseQueries.sumResponseScores(responsesData.pollId))
    .then(scores => responsesData.scores = scores)
    .then(() => outputData.push(responsesData))
    .then(() => res.json(outputData))
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
