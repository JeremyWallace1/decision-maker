const getPoll = () => {
  return $.ajax({
    method: "GET",
    url: "/api/polls/1"
  });
}

const submitPoll = (data) => {
  return $.ajax({
    method: "POST",
    url: "/polls",
    data,
  });
}