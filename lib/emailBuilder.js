const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API;

// Returns a promise
const sendEmail = (emailObject) => {
  return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(emailObject);
};

module.exports = sendEmail;