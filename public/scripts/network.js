const getPoll = (id) => {
  return $.ajax({
    method: "GET",
    url: "/api/polls/" + id
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
