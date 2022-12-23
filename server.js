// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Custom middleware to rewrite a uri request for api routing
app.get('/:uri', (req, res, next) => {
  const uri = req.params.uri;
  const path = '/api/polls/' + uri;
  req.url = path;
  next();
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pollsApiRoutes = require('./routes/polls-api');
const responsesApiRoutes = require('./routes/responses-api');
const pollsRoutes = require('./routes/polls');
const responsesRoutes = require('./routes/responses');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/polls', pollsApiRoutes);
app.use('/api/responses', responsesApiRoutes);
app.use('/polls', pollsRoutes);
app.use('/responses', responsesRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
