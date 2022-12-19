const db = require('../connection');

const createPoll = (data) => {
  const query = {
    text: `
    INSERT INTO polls (
      creator_email,
      question,
      description,
      results_url,
      sharing_url
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    values: [data.email, data.question, data.description, data.results_url, data.sharing_url],
  }
  
  return db.query(query)
    .then(response => {
      data.response = response.rows[0];
      return data;
    })
};

const createChoice = (data) => {
  const query = {
    text: `
    INSERT INTO poll_choices (
      poll_id,
      title,
      description
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    values: [data.poll_id, data.title, data.description],
  }
  
  return db.query(query)
    .then(response => {
      return response.rows[0];
    })
};

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
  createPoll,
  createChoice,
  getPoll,
  getPollChoices,
  getRespondentChoices,
  getPollResponses
};