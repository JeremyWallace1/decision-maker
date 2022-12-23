const getPoll = (id) => {
  return $.ajax({
    method: "GET",
    url: "/api/polls/" + id
  });
}

const getPollbyUri = (uri) => {
  return $.ajax({
    method: "GET",
    url: "/api/polls/" + uri
  });
}

const getResponsesbyUri = (uri) => {
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
