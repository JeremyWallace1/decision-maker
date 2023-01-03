$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
    // console.log(`poll info: ${JSON.stringify(poll.config)}`);
    const origin = window.location.origin;
    let buffer = ``;

    buffer += `
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
      
          ${generateQuestionImgHTML(poll.config.image)}
  
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

        </header>`
      
      // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
      let num = 0;
      for (const choice in poll.choices) {
        num++;
        const choiceId = poll.choices[choice].id;
        const score = getScore(choiceId, poll.scores)
  
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

        `
      }

    buffer += `
        </footer>
      </article>
    `;
    return buffer;
  }

  window.poll.createPoll = createPoll;

  const getScore = (choiceId = 0, data) => {
    const scoreData = data.filter(scoreData => scoreData.choice_id === choiceId);
    const score = scoreData[0] ? scoreData[0].scoring : 0;
    return score;
  }

  const generateQuestionImgHTML = (imageSrc) => {
    if (!imageSrc) {
      return '';
    }
    return `
    <div class="row my-3" id="img-preview-question">
      <div class="col">
        <img src="${imageSrc}" class="img-fluid img-thumbnail mx-auto d-block question img-preview" />
      </div>
    </div>
    `
  };

});
