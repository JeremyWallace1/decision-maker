/*
 * All routes for env variables accessible by runtime are defined here
 * Since this file is loaded in server.js into /env,
 *   these routes are mounted onto /env
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();
const axios = require('axios');

// user responds to a poll
router.get('/ip', (req, res) => {
  const output = {};
  switch (process.env.ENV_TYPE) {
    case ('development') :
      output.ip = process.env.DEV_IP;
      break;
    case ('staging') :
      output.ip = process.env.STAGING_IP;
      break;
    case ('production') :
      axios.get('https://api.ipify.org?format=json')
        .then(data => output.ip = data.ip)
        .catch(err => console.log('Error retrieving IP: ', err.message));
  }

  res.send(output);
});

module.exports = router;