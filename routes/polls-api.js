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

// creator views poll results & links for sharing
router.get('/:id', (req, res) => {
  const pollId = req.params.id;
  const data = {};
  pollQueries.getPoll(pollId)
    .then(poll => {
      data.config = {
        id: poll.id,
        creator_email: poll.creator_email,
        question: poll.question,
        description: poll.description,
        results_url: poll.results_url,
        sharing_url: poll.sharing_url,
      };
      return poll;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
