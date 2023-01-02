$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
    // console.log(`poll info: ${JSON.stringify(poll.config)}`);
    let buffer = `
      <article class="poll" id="poll_${poll.config.id}">
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
          <div class="row" id="resultsArea" hidden>
            <canvas id="resultsChart"></canvas>
          </div>
          <hr class="major" id="resultsHr" hidden>

        </header>`;
    
    const countChoiceImages = poll.choices.filter(element => element.image).length;
    if (countChoiceImages > 0) {
      buffer += `
        <div class="d-flex flex-row flex-wrap">
      `;
      for (const choice in poll.choices) {
        buffer += `
          <div class="col-sm-4 col-md-3">
        `;
        let choiceImage = poll.choices[choice].image;
        if (!choiceImage) {
          buffer += `<i class="fa-solid fa-image"></i>`;
        } else {
          buffer += `<img src="${choiceImage}" class="img-fluid img-thumbnail mx-auto d-block question img-preview" />`
        }
        buffer += `
          </div>
        `;
      }
      buffer += `
        </div>
      `;
    }

    if (countChoiceImages === 0) {
      let num = 0;
      for (const choice in poll.choices) {
        num++;
        const choiceId = poll.choices[choice].id;

        
        

        buffer += `
            <div class="row">
              <h5 class="col-md-2" id="labelAnswer${poll.choices[choice].id}">Answer #${num}:</h5>
              <h6 class="col-md-10" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h6>
            </div>

            <div class="row">
              <p class="col-md-12" id="description${poll.choices[choice].id}">${poll.choices[choice].description}</p>
            </div>

            <div class="row mb-12">
              ${showResults ? 
                `<h6>Current score: ${score}</h6>` 
                : ``}
            </div>

            <hr class="minor">
        `;
      }
    }

    const origin = window.location.origin;
    const sharingUrl = origin.concat('/?', poll.config.sharing_url);
    buffer += `
    <footer class="poll_footer row mb-3">
      <h6 class="poll_share_url">
        Share poll: &nbsp;&nbsp;<a href='${sharingUrl}' class="shareUrl" title='share this poll'>${sharingUrl}</a>
        <button type="button" class="button button-small" id="copyShareUrl" onclick="copyUrl('${sharingUrl}')"><i class="fa-solid fa-copy"></i></i></button>
      </h6>
    `;
    
    const resultsUrl = origin.concat('/?', poll.config.results_url);
    if (showResults) {
      buffer += 
      `<h6 class="poll_results_url">
        View results: &nbsp;&nbsp;<a href='${resultsUrl}' class="shareUrl" title='view poll results'>${resultsUrl}</a>
        <button type="button" class="button button-small" id="copyResultsUrl" onclick="copyUrl('${resultsUrl}')"><i class="fa-solid fa-copy"></i></i></button>
      </h6>
      `;
    }
    
    buffer += `
        </footer>
      </article>
    `;
    return buffer;
  }

  window.poll.createPoll = createPoll;

});