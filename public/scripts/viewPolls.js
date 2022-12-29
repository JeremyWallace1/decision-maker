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
        <h2 class="titling">
          ${jsonData[0]['config'].creator_email}'s Polls
        </h2>
      `);
    }
    
    for (const pollData of jsonData) {
      const createdPoll = poll.createPoll(pollData, showResults);
      // creator = jsonData[0]['config'].creator_email;
      const length = jsonData[0]['scores'].length;
      let minNum = Infinity;
      for (let j = 0; j < length; j++) {
        if (jsonData[0]['choices'][j].id < minNum) {
          minNum = jsonData[0]['choices'][j].id;
        }
      }
      for (let i = 0; i < length; i++) {
        for (let k = 0; k < length; k++) {
          if (jsonData[0]['scores'][i].choice_id === jsonData[0]['choices'][k].id) {
            toolTipVal.push(jsonData[0]['choices'][k].title);
          }
        }
        // console.log('toolTipVal =', toolTipVal);
        xVal.push('Answer #' + (jsonData[0]['scores'][i].choice_id - minNum + 1));
        yVal.push(jsonData[0]['scores'][i].scoring);
      }
      if (showResults) {
        const pollWithResults = $(createdPoll).append(`
          <script src="scripts/chart.js"></script>
          <script>
            document.getElementById("resultsArea").hidden = false;
            document.getElementById("resultsHr").hidden = false;
          </script>
        `);
        addPoll(pollWithResults)

      } else {
        addPoll(createdPoll);
      }
    }
  }

  window.polls.addPolls = addPolls;
});