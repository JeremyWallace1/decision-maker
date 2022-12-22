$(() => {
  // this is the creator view after creating a new poll 
  // and same view for returning through admin link
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

  // add all the polls by this creator
  function addPolls(jsonData, showResults = false) {
    clearPolls();
    console.log('jsonData[0]',jsonData[0]);
    if (showResults) {
      $polls.append( `
        <h1 class="bg-dark text-center">${jsonData[0]['config'].creator_email}'s Polls</h1>
      `);
    }
    for (const pollData of jsonData) {
      const createdPoll = poll.createPoll(pollData, showResults);
      addPoll(createdPoll);
    }
  }

  window.polls.addPolls = addPolls;

});