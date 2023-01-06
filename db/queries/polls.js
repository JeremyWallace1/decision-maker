const db = require('../connection');

const createPoll = (data) => {
  const query = {
    text: `
    INSERT INTO polls (
      creator_email,
      question,
      image,
      description,
      results_url,
      sharing_url
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    values: [data.email, data.question, data.image, data.description, data.resultsUri, data.sharingUri],
  };
  
  return db.query(query)
    .then(response => {
      data.response = response.rows[0];
      return data;
    });
};

const createChoice = (data) => {
  const query = {
    text: `
    INSERT INTO poll_choices (
      poll_id,
      title,
      image,
      description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    values: [data.pollId, data.title, data.image, data.description],
  };
  
  return db.query(query)
    .then(response => {
      return response.rows[0];
    });
};

const createResponse = (data) => {
  const query = {
    text: `
    INSERT INTO responses (
      poll_id,
      choice_id,
      respondent_ip,
      rank_score
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    values: [data.pollId, data.choiceId, data.respondentIp, data.rankScore],
  };
  
  return db.query(query)
    .then(response => {
      return response.rows[0];
    });
};

const getPollById = (id) => {
  return db.query(`
  SELECT
    id,
    creator_email,
    question,
    polls.image,
    polls.description,
    results_url,
    sharing_url
  FROM polls
  WHERE polls.id = $1`, [id])
    .then(response => {
      return response.rows[0];
    });
};

const getPollByResultsUri = (uri) => {
  return db.query(`
  SELECT
    id,
    creator_email,
    question,
    polls.image,
    polls.description,
    results_url,
    sharing_url
  FROM polls
  WHERE results_url = $1`, [uri])
    .then(response => {
      return response.rows[0];
    });
};

const getPollBySharingUri = (uri) => {
  return db.query(`
  SELECT
    id,
    creator_email,
    question,
    polls.image,
    polls.description,
    results_url,
    sharing_url
  FROM polls
  WHERE sharing_url = $1`, [uri])
    .then(response => {
      return response.rows[0];
    });
};

const getPollChoices = (id) => {
  return db.query(`
  SELECT
    id,
    title,
    image,
    description
  FROM poll_choices
  WHERE poll_id = $1`, [id])
    .then(response => {
      return response.rows;
    });
};

const getRespondentChoices = (ip, id) => {
  return db.query(`
  SELECT
    id AS response_id,
    poll_id,
    choice_id,
    respondent_ip
  FROM responses
  WHERE respondent_ip = $1 AND poll_id = $2`, [ip, id])
    .then(response => {
      return response.rows;
    });
};

const getPollResponses = (id) => {
  return db.query(`
  SELECT
    responses.id AS response_id,
    responses.poll_id,
    responses.respondent_ip,
    choice_id
  FROM responses
  WHERE responses.poll_id = $1`, [id])
    .then(response => {
      return response.rows;
    });
};

const sumResponseScores = (id) => {
  const query = {
    text: `
    SELECT
      choice_id,
      SUM(rank_score) AS scoring
    FROM responses
    WHERE poll_id = $1
    GROUP BY choice_id
    ORDER BY scoring DESC
  `,
    values: [id],
  };

  return db.query(query)
    .then(response => {
      return response.rows;
    });
};

module.exports = {
  createPoll,
  createChoice,
  createResponse,
  getPollById,
  getPollByResultsUri,
  getPollBySharingUri,
  getPollChoices,
  getRespondentChoices,
  getPollResponses,
  sumResponseScores
};
