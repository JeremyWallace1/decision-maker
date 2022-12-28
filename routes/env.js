/*
 * All routes for env variables accessible by runtime are defined here
 * Since this file is loaded in server.js into /env,
 *   these routes are mounted onto /env
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();

// user responds to a poll
router.get('/devip', (req, res) => {

  // const promiseDevIp = new Promise((resolve, reject) => {
  //   if (!process.env.DEV_IP) {
  //     reject(new Error('Development IP address is not set in .env file'));
  //   }
  //   const output = { ip: process.env.DEV_IP };
  //   resolve(output)
  // })

  // promiseDevIp()
  //   .then(data => res.send(data))
  //   .catch(error => {
  //     console.log(`error output: `, error.message)
  //     return res.status(500).send('500 - Internal Server Error');
  //   });
  const output = { ip: process.env.DEV_IP };
  res.send(output);
});

module.exports = router;