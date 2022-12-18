const db = require('../connection');

const getPoll = (id) => {
  return db.query(`
  SELECT
    id,
    creator_email,
    question,
    polls.description,
    results_url,
    sharing_url
  FROM polls
  WHERE polls.id = $1`, [id])
    .then(response => {
      return response.rows[0];
    });
};

const getPollChoices = (id) => {
  return db.query(`
  SELECT
    id,
    title,
    description,
  FROM poll_choices
  WHERE poll_id = $1`, [id])
    .then(response => {
      return response.rows;
    });
};

const getRespondentChoices = (ip) => {
  return db.query(`
  SELECT
    id AS response_id,
    poll_id,
    choice_id,
    respondent_ip
  FROM responses
  WHERE respondent_ip = $1`, [ip])
    .then(response => {
      return response.rows;
    });
};

const getPollResponses = (id) => {
  return db.query(`
  SELECT
    responses.id AS response_id,
    responses.poll_id,
    choice_id
  FROM responses
  WHERE responses.poll_id = $1`, [id])
    .then(response => {
      return response.rows;
    });
};

module.exports = {
  getPoll,
  getPollChoices,
  getRespondentChoices,
  getPollResponses
};
