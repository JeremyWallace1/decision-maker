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
const pollQueries = require('../db/queries/polls');

// users view poll and can submit their choice order preference
router.get('/:id', (req, res) => {
  res.status(200).send('GET route /responses/:id ***Coming soon...***');
});


module.exports = router;
