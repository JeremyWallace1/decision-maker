const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API;

// Returns a promise
const sendEmail = (emailObject) => {
  return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(emailObject)
}

// Example of emailObject
// {
//   'subject':'Hello from the Node SDK!',
//   'sender' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
//   'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
//   'to' : [{'name': 'John Doe', 'email':'mark.bieganek@telus.com'}],
//   'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
//   'params' : {'bodyMessage':'Made just for you!'}
// }

module.exports = sendEmail;