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
const $ = require('../public/vendor/jquery-3.0.0');

// user views poll and values and can modify selections before posting
router.get('/:id', (req, res) => {
  const pollId = req.params.id;
  const data = {};
  responseQueries.getPoll(pollId)
    .then(poll => data.config = poll)
    .then(poll => responseQueries.getPollChoices(pollId))
    .then(choices => data.choices = choices)
    .then(output => res.json(data))
    .then(console.log('finished', pollId))
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
