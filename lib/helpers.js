// load .env data into process.env
require('dotenv').config();

const generateIP = () => {
  const buffer = Array(4).fill(0);
  const ipRanges = buffer.map(element => Math.floor(Math.random() * 255) + 1);
  const joined = ipRanges.join('.');
  return joined;
};

// Returns a promise
const getIP = (data) => {
  const output = {};
  let ip = null;
  switch (process.env.ENV_TYPE) {
    case ('development') :
      ip = process.env.DEV_IP || null;
      break;
    case ('staging') :
      ip = generateIP();
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