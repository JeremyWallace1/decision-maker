// load .env data into process.env
require('dotenv').config();
const axios = require('axios');

// Returns a promise
const getIP = () => {
  const output = {};
  switch (process.env.ENV_TYPE) {
    case ('development') :
      return new Promise((resolve, reject) => {
        if (!process.env.DEV_IP) {
          reject(new Error('Error retrieving IP. DEV_IP not defined in .env'));
        } else {
          resolve ({ ip: process.env.DEV_IP });
        }
      });

    case ('staging') :
      return new Promise((resolve, reject) => {
        if (!process.env.DEV_IP) {
          reject(new Error('Error retrieving IP. STAGING_IP not defined in .env'));
        } else {
          resolve ({ ip: process.env.STAGING_IP });
        }
      });

    case ('production') :
      return axios.get('https://api.ipify.org')
      .then(data => data.data)
      .catch(err => console.log('Error retrieving IP: ', err.message))
  }
  return output;
}

module.exports = {
  getIP
};