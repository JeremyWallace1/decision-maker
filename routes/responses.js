/*
 * All routes for poll responses are defined here
 * Since this file is loaded in server.js into /responses,
 *   these routes are mounted onto /responses
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const { body, validationResult } = require('express-validator');
const responseQueries = require('../db/queries/polls');

// user responds to a poll
router.post('/:id', (req, res) => {
  console.log(req.body);
  res.status(200).send('POST route /responses/:id ***Coming soon...***');
});

module.exports = router;
