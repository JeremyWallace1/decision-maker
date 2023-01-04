/*
 * All routes for poll data are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /api/polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const pollQueries = require('../db/queries/polls');

// API request for poll data with shortcode uri reference
router.get('/:uri', (req, res) => {
  const uri = req.params.uri;
  const pollData = {};
  const outputData = [];
  const promises = [];
  promises.push(pollQueries.getPollByResultsUri(uri));
  promises.push(pollQueries.getPollBySharingUri(uri));
  Promise.all(promises)
    .then(all => {
      if (all[0]) {
        pollData.config = all[0];
        pollData.uriType = 'Result';
        return pollData.config.id;
      } else if (all[1]) {
        pollData.config = all[1];
        pollData.uriType = 'Share';
        return pollData.config.id;
      }
      throw new Error('Poll not found!');
    })
    .then(pollId => pollQueries.getPollChoices(pollId))
    .then(choices => pollData.choices = choices)
    .then(() => outputData.push(pollData))
    .then(() => res.json(outputData))
    .catch(err => {
      if (err.message === 'Poll not found!') {
        return res.status(404)
          .json({ error: err.message });
      }
      return res.status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
