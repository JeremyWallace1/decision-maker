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

// user views poll and values and can modify selections before posting
router.get('/:id', (req, res) => {
  const pollId = req.params.id;
  const responsesData = {};
  const outputData = [];
  responseQueries.getPollResponses(pollId)
    .then(responses => res.json(responses))
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
