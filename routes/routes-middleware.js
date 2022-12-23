const { response } = require('express');
const express = require('express');
const router  = express.Router();

// Rewrite a uri request for api routing
router.get('/:uri', (req, res, next) => {
  const uri = req.params.uri;
  const path = '/api/polls/' + uri;
  req.url = path;
  next();
});

module.exports = router;