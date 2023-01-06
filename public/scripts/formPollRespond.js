$(() => {

  window.pollRespond = {};
  const $formPollRespond = $('<form></form>');
  window.$formPollRespond = $formPollRespond;

  const getHtml = (data) => {
    const poll = data;
    let buffer = `
      <form action="/responses/${poll.config.id}" method="POST" id="poll-response" class="polls">
        <header class="poll_heading">


        <div class="row">
        <h1 class="display-4" id="question${poll.config.id}">
          ${poll.config.question}
        </h1>
      </div>
    `;
    let questionImage = poll.config.image;
    if (questionImage) {
      buffer += `
      <div class="row my-3" id="img-preview-question">
        <div class="col">
          <img src="${questionImage}" class="img-fluid img-thumbnail mx-auto d-block question img-preview" />
        </div>
      </div>
      `;
    }

    buffer += `
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

    for (const choice in poll.choices) {
      const choiceData = JSON.parse(JSON.stringify(poll.choices[choice]));

      const titleHTML = `${choiceData.title}`;
      const choiceDescHTML = `<p id="description${choiceData.id}">${choiceData.description}</p>`;
      const choiceImageHTML = `<img src="${choiceData.image}" class="choiceImage rounded" />`;

      buffer += `
      <li class="row ui-state-default ui-sortable-handle" id="choice${choiceData.id}">
        <div class="row col-12 choiceRow">
        `;

      if (choiceData.image) {
        buffer += `
          <div class="col-sm-9">
            <h3 class="col-sm-9 choiceTitle">
              ${titleHTML}
            </h3> 
            <div class="d-sm-block choiceDescription">
              ${choiceDescHTML}
            </div>
          </div>
          <div class="d-none d-sm-block col-sm-3 px-0 imageBox">
            ${choiceImageHTML}
          </div>
          <input type="hidden" name="choices" value="${poll.choices[choice].id}" />
        `;
      }
          
      if (!choiceData.image) {
        buffer += `
          <h3 class="col-sm-12 choiceTitle">
            ${titleHTML}
          </h3> 
          <div class="d-sm-block choiceDescription">
            ${choiceDescHTML}
          </div> 
          <input type="hidden" name="choices" value="${poll.choices[choice].id}" />
        `;
      }
      
      buffer += `
        </div>
      </li>
      `;
    }

    buffer += `
      </ul>
      <footer class="poll_footer row mb-3">
          <div class="buttons">
            <button type="submit" class="button button-large col-12" id="submitButton">
              <span class="spinner-border spinner-border-lg" id="loadingSpinner" role="status" style="display: none">
              </span>
              <span id="createPollText">Submit Choices</span>
              <span id="loadingText" style="display: none">Submitting...</span>
            </button>
            <input type="hidden" name="poll_id" value="${poll.config.id}" />
            <input type="hidden" name="results_url" value="${poll.config.results_url}" />
          </div>
        </footer>
      </form>
      `;
    
    const $html = $(buffer);
    return $html;
  };

  const createForm = (data) => {
    window.$formPollRespond = getHtml(data);
    attachEventListener(window.$formPollRespond);
  };

  window.pollRespond.createForm = createForm;

  const attachEventListener = ($element) => {

    $element.on('submit', function(event) {
      event.preventDefault();
      // loading button when it's taking it's time
      loadingButton();
      // adding artificial delay
      delay(500).then(() => {

        const postData = $(this).serialize();
        const output = [];
        let uri = null;

        getEnvType()
          .then(envType => getMyIp(envType))
          .then(data => {
            const ip = data.ip;
            const appendPostData = '&ip=' + ip;
            const finalPostData = postData + appendPostData;
            return finalPostData;
          })
          .then(data => submitResponse(data))
          .then(data => uri = data[0].resultsUri)
          .then(() => getPollByUri(uri))
          .then(data => output.push(data[0]))
          .then(() => getResponsesByUri(uri))
          .then(data => {
            output[0].pollId = output[0].config.id;
            output[0].responses = data[0].responses;
            output[0].scores = data[0].scores;
          })
          .then(() => {
            polls.addPolls(output, false, false);
            viewsManager.show('polls');
          });
      });
    });
  };
});