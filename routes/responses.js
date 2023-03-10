/*
 * All routes for poll responses are defined here
 * Since this file is loaded in server.js into /responses,
 *   these routes are mounted onto /responses
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const responseQueries = require('../db/queries/polls');
const sendEmail = require('../lib/emailBuilder.js');

// user responds to a poll
router.post('/', (req, res) => {

  const output = [];
  output.push({ resultsUri: req.body.results_url });
  const countChoices = req.body.choices.length;
  const ip = req.body.ip;
  const pollId = req.body.poll_id;
  const promises = [];
  
  responseQueries.getRespondentChoices(ip, pollId)
    .then(data => {
      if (data.length > 0) {
        throw new Error(`IP address ${ip} has already replied to this poll`);
      }
    })
    .then(() => {
      for (const choice in req.body.choices) {
        const data = {};
        data.pollId = pollId;
        data.choiceId = req.body.choices[choice];
        data.respondentIp = ip;
        data.rankScore = countChoices - choice;
        promises.push(responseQueries.createResponse(data));
      }

      return Promise.all(promises)
        .then(all => {
          output[0].responses = all;
          console.log('database updated!', output);
        })
        .then(() => responseQueries.getPollByResultsUri(output[0].resultsUri))
        .then(data => {
          const referer = req.headers.referer;
          const indexOriginEnd = referer.indexOf('/', 8) + 1;
          const origin = referer.slice(0, indexOriginEnd);
        
          const poll = data;
          let recipientEmail = null;
          switch (process.env.ENV_TYPE) {
          case ('development') :
            recipientEmail = process.env.DEV_EMAIL || null;
            break;
          case ('staging') :
            recipientEmail = process.env.STAGING_EMAIL || null;
            break;
          case ('production') :
            recipientEmail = poll.creator_email || null;
            break;
          }

          const emailConfig = {};
          emailConfig['subject'] = 'New response to your poll!',
          emailConfig['sender'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
          emailConfig['replyTo'] = {'email': 'api@sendinblue.com', 'name': 'Sendinblue'},
          emailConfig['to'] = [{ 'name': 'Poll Owner', 'email': recipientEmail }];
          emailConfig['htmlContent'] = '<html><body><h1>{{params.headline}}</h1><p>{{params.body}}</p><p>{{params.share}}</p><p>{{params.results}}</p></body></html>',
          emailConfig['params'] = {
            'headline': 'Someone has responded to your poll!',
            'body': `We have just received a new response to your poll, ${poll.question}. Please use the links below to view results or share your poll with others.`,
            'share': 'Sharing url: ' + origin + '?' + poll.sharing_url,
            'results': 'Results url: ' + origin + '?' + poll.results_url
          };

          const sendReceipt = process.env.SENDINBLUE_ENABLE;
          if (!sendReceipt || sendReceipt === 'false') {
            return {};
          }

          return sendEmail(emailConfig);
        })
        .then((data) => console.log(data))
        .then(() => res.send(output))
        .catch(error => {
          console.log(error.message);
          return error;
        });
    })
    .catch(error => {
      console.log(`error output: `, error.message);
      res.status(500).send('403 - Forbidden. ' + error.message);
    });
    
});

module.exports = router;