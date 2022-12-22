$(() => {

  const $polls = $(`
  <section class="polls" id="polls">
      <p>Loading...</p>
    </section>
  `);
  window.$polls = $polls;

  window.polls = {};

  function addPoll(poll) {
    $polls.append(poll);
  }
  function clearPolls() {
    $polls.empty();
  }
  window.polls.clearPolls = clearPolls;

  function addPolls(jsonData, showResults = false) {
    clearPolls();
    for (const pollData of jsonData) {
      const createdPoll = poll.createPoll(pollData, showResults);
      addPoll(createdPoll);
    }
  }

  window.polls.addPolls = addPolls;

});