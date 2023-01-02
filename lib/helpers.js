// load .env data into process.env
require('dotenv').config();

// Returns a promise
const getIP = (data) => {
  const output = {};
  let ip = null;
  switch (process.env.ENV_TYPE) {
    case ('development') :
      ip = process.env.DEV_IP || null;
      break;
    case ('staging') :
      ip = process.env.STAGING_IP || null;
      break;
    case ('production') :
      if (data) {
        ip = data.socket.remoteAddress;
      }
      break;
  }

  return new Promise((resolve, reject) => {
    if (!ip) {
      reject(new Error('Error retrieving IP. IP data was not defined.'));
    } else {  
      resolve ({ ip });
    }
  })

}

module.exports = {
  getIP
};