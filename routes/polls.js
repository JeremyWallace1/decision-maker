/*
 * All routes for polls are defined here
 * Since this file is loaded in server.js into /polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  const { email, title, question } = req.body;
  const answerTitle1 = req.body.answer1_title;
  const answerTitle2 = req.body.answer2_title;
  const answerTitle3 = req.body.answer3_title;
  const answerDescription1 = req.body.answer1_description;
  const answerDescription2 = req.body.answer2_description;
  const answerDescription3 = req.body.answer3_description;
  console.log('email: ', email);
  console.log('title: ', title);
  console.log('question: ', question);
  console.log('answerTitle1: ', answerTitle1);
  console.log('answerTitle2: ', answerTitle2);
  console.log('answerTitle3: ', answerTitle3);
  console.log('answerDescription1: ', answerDescription1);
  console.log('answerDescription2: ', answerDescription2);
  console.log('answerDescription3: ', answerDescription3);
  }
); 

module.exports = router;
