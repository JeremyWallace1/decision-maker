$(() => {

  window.poll_respond = {};
  const $formPollRespond = $('<form></form>');
  window.$formPollRespond = $formPollRespond;

  const getHtml = (data) => {
    const poll = data;
    let buffer = `
      <form action="/responses/${poll.config.id}" method="POST" id="poll-response" class="poll">
        <header class="poll_heading">
          <div class="row mb-2"></div>
          <div class="row mb-3">
            <h5 id="email${poll.config.id}">${poll.config.creator_email} has asked a question...</h5>
          </div>

          <hr>

          <div class="row">
            <h4 class="col-md-2" id="labelQuestion${poll.config.id}">
              Question:
            </h4>
            <h4 class="col-md-10" id="question${poll.config.id}">
              ${poll.config.question}
            </h4>
          </div>

          <div class="row">
            <p class="col-md-12" id="description${poll.config.id}">
              ${poll.config.description}
            </p>
          </div>

          <hr class="major">
          
        </header>
        <script>
          $(()=> {
            $( "#sortable" ).sortable();
          });
        </script>
        <p class="col-md-12" id="orderInstructions">
          Please order your choices from top to bottom before submitting.
        </p>
        <ul id="sortable" class="ui-sortable">

      `;

    let count = 0;
    for (const choice in poll.choices) {
      count++;
      buffer += `
      <li class="row ui-state-default ui-sortable-handle" id="answer${poll.choices[choice].id}">
        <div class="row">
          <h5 class="col-md-2" id="labelAnswer${poll.choices[choice].id}">Answer #${count}:</h5>
          <h6 class="col-md-10" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h6>
          <p class="col-md-12" id="description${poll.choices[choice].id}">${poll.choices[choice].description}</p>
          <input type="hidden" name="choices" value="${poll.choices[choice].id}" />
        </div>

      </li>
      `;
    }

    buffer += `
      </ul>
      <footer class="poll_footer row mb-3">
          <div class="buttons">
            <button type="submit" class="button button-large col-12">Submit Choices</button>
            <input type="hidden" name="poll_id" value="${poll.config.id}" />
            <input type="hidden" name="results_url" value="${poll.config.results_url}" />
          </div>
        </footer>
      </form>
      `;
    
    const $html = $(buffer);
    return $html;
  }
  
  const createForm = (data) => {
    window.$formPollRespond = getHtml(data);
    attachEventListener(window.$formPollRespond);
  }

  window.poll_respond.createForm = createForm;
  
  const attachEventListener = ($element) => {
    $element.on('submit', function (event) {

      event.preventDefault();

      views_manager.show('none');
      
      const postData = $(this).serialize();
      let uri = null;
      const output = [];

      getMyIp()
        .then(data => postData + '&ip=' + data.ip)
        .then(modifiedPostData => submitResponse(modifiedPostData))
        .then(data => uri = data[0].results_url)
        .then(() => getPollByUri(uri))
        .then(data => output.push(data[0]))
        .then(() => getResponsesByUri(uri))
        .then(data => {
          output[0].pollId = output[0].config.id;
          output[0].responses = data[0].responses;
          output[0].scores = data[0].scores;
        })
        .then(() => {
          polls.addPolls(output, false);
          views_manager.show('polls');
        })
    });

  }

});