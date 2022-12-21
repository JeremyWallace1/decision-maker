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

// view poll with options
router.get('/:id', (req, res) => {
  console.log(`${res.body}`);
  res.status(200).send('GET route /responses/:id ***Coming soon...***');
});

module.exports = router;
