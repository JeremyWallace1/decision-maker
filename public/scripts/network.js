const getPollById = (id) => {
  return $.ajax({
    method: "GET",
    url: "/api/polls/" + id
  });
}

const getPollByUri = (uri) => {
  if (!uri) {
    return Promise.reject('no results');
  }
  return $.ajax({
    method: "GET",
    url: "/api/polls/" + uri
  });
}

const getResponsesByUri = (uri) => {
  if (!uri) {
    return Promise.reject('no results');
  }
  return $.ajax({
    method: "GET",
    url: "/api/responses/" + uri
  });
}

const getResponsesById = (id) => {
  return $.ajax({
    method: "GET",
    url: "/api/responses/" + id
  });
}


const submitPoll = (data) => {
  return $.ajax({
    method: "POST",
    url: "/polls",
    data,
  });
}


const submitResponse = (data) => {
  console.log('submitResponse activated')
  console.log('data typeof', typeof data)
  return $.ajax({
    method: "POST",
    url: "/responses",
    data,
  });
}