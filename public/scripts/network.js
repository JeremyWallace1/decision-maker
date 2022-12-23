const getPoll = (id) => {
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

const submitPoll = (data) => {
  return $.ajax({
    method: "POST",
    url: "/polls",
    data,
  });
}

const getResponses = (id) => {
  return $.ajax({
    method: "GET",
    url: "/api/responses/" + id
  });
}
