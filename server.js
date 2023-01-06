// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ 
    extended: true,
    limit: '60mb',
  })
);
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const envRoutes = require('./routes/env');
const pollsApiRoutes = require('./routes/polls-api');
const responsesApiRoutes = require('./routes/responses-api');
const pollsRoutes = require('./routes/polls');
const responsesRoutes = require('./routes/responses');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/env', envRoutes);
app.use('/api/polls', pollsApiRoutes);
app.use('/api/responses', responsesApiRoutes);
app.use('/polls', pollsRoutes);
app.use('/responses', responsesRoutes);

app.listen(PORT, () => {
  console.log(`The Decision Maker app is listening on port ${PORT}`);
});
