/*
 * All routes for env variables accessible by runtime are defined here
 * Since this file is loaded in server.js into /env,
 *   these routes are mounted onto /env
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const { getIp } = require('../lib/helpers.js');

router.get('/ip', (req, res) => {
  getIp()
    .then(data => res.json(data))
    .catch(err => {
      return res.status(500)
        .send('500 - Internal Server Error. ' + err.message);
    });
});

module.exports = router;