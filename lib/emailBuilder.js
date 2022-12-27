const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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 ';

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