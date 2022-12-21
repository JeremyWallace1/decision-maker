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

const cookieParser = require('cookie-parser');

// user responds to a poll
router.post('/:id', (req, res) => {
  // const ip = req.cookies["ip"];
  // For test purposes only, when using curl to POST
  const generateIP = () => {
    const buffer = Array(4).fill(0);
    const ipRanges = buffer.map(element => Math.floor(Math.random() * 255) + 1);
    const joined = ipRanges.join('.');
    return joined;
  };

  const ip = generateIP();

  res.status(200).send('POST route /responses/:id ***Coming soon...***');
});

module.exports = router;