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
  switch (process.env.ENV_TYPE) {
    case ('development') :
      res.json({ ip: process.env.DEV_IP });
    case ('staging') :
      res.json({ ip: process.env.STAGING_IP });
    case ('production') :
      axios.get('https://api.ipify.org')
        .then(data => res.json({ ip: data.data }))
        .catch(err => console.log('Error retrieving IP: ', err.message))
  }
 
});

module.exports = router;