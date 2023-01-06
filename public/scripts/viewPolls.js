const xVal = [];
const yVal = [];
const toolTipVal = [];
const colours = ['#008BBC', '#BBBC00', '#BC5F00', '#5F00BC', '#005777']; // #BC00BB

$(() => {
  // this is the creator view after creating a new poll
  // and same view for returning through admin link
  
  const $polls = $(`
    <section class="polls" id="polls">
      <p>Loading...</p>
    </section>
    `
  );
  
  window.$polls = $polls;

  window.polls = {};

  const addPoll = (poll) => {
    $polls.append(poll);
  };

  const clearPolls = () => {
    $polls.empty();
  };

  window.polls.clearPolls = clearPolls;

  // add all the polls by this creator
  const addPolls = (jsonData, showResults = false, alreadyAnswered = false) => {
    clearPolls();

    for (const pollData of jsonData) {
      const createdPoll = poll.createPoll(pollData, showResults, alreadyAnswered = true);
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
        xVal.push('Choice #' + (jsonData[0]['scores'][i].choice_id - minNum + 1));
        yVal.push(jsonData[0]['scores'][i].scoring);
      }
      if (showResults && length > 0) {
        $.getScript("scripts/chart.js", function(data, textStatus, jqxhr) {
          console.log(data); // Data returned
          console.log(textStatus); // Success
          console.log(jqxhr.status); // 200
          console.log("Load was performed.");
          const pollWithResults = $(createdPoll).append(`<script>${data}</script>`);
          $(pollWithResults).find('#resultsArea').removeAttr('hidden');
          $(pollWithResults).find('#resultsHr').removeAttr('hidden');
          addPoll(pollWithResults);
        });
      } else {
        addPoll(createdPoll);
      }
    }
  };

  window.polls.addPolls = addPolls;

});
