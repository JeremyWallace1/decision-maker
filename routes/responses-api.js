/*
 * All routes for response data are defined here
 * Since this file is loaded in server.js into api/responses,
 *   these routes are mounted onto /api/responses
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const responseQueries = require('../db/queries/polls');

// API request for responses data with shortcode uri reference
router.get('/:uri', (req, res) => {
  const uri = req.params.uri;
  const responsesData = {};
  const outputData = [];
  let pollId = null;
  console.log('start')
  responseQueries.getPollByResultsUri(uri)
    .then(data => responsesData.poll_id = data.id)
    .then(data => responseQueries.getPollResponses(responsesData.poll_id))
    .then(data => responsesData.responses = data)
    .then(data => responseQueries.sumResponseScores(responsesData.poll_id))
    .then(scores => responsesData.scores = scores)
    .then(output => outputData.push(responsesData))
    .then(output => res.json(outputData))
    .catch(err => {
      res.status(500)
      .json({ error: err.message });
    });
});


// user views poll and values and can modify selections before posting
// router.get('/:id', (req, res) => {
//   const pollId = Number(req.params.id);
//   const responsesData = {};
//   const outputData = [];
//   responsesData.pollId = pollId;
//   responseQueries.getPollResponses(pollId)
//     .then(pollResponses => responsesData.responses = pollResponses)
//     .then(pollResponses => responseQueries.sumResponseScores(pollId))
//     .then(scores => responsesData.scores = scores)
//     .then(output => outputData.push(responsesData))
//     .then(output => res.json(outputData))
//     .catch(err => {
//       res.status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
