$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults, successMessage = false) => { 
    // console.log(`poll info: ${JSON.stringify(poll.config)}`);
    const origin = window.location.origin;
    let buffer = ``;
    if (!successMessage) {
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
        `
        let questionImage = poll.config.image;
        if (questionImage) {
          buffer += `
          <div class="row my-3" id="img-preview-question">
            <div class="col">
              <img src="${questionImage}" class="img-fluid img-thumbnail mx-auto d-block question img-preview" />
            </div>
          </div>
          `
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
  
          </header>`
      
      // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
      let num = 0;
      for (const choice in poll.choices) {
        num++;
        const choiceId = poll.choices[choice].id;
  
        let score = 0;
        let target;
        if (poll.scores.length > 0) {
          for (let i in poll.scores) {
            if (poll.scores[i].choice_id === choiceId) {
              target = {choice_id: choiceId, scoring: poll.scores[i].scoring}
            }
  
          }
  
          score = target.scoring;
        }
  
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
    } else {
      buffer += `
      <article class="poll" id="poll_${poll.config.id}">
      <header class="poll_heading">
      <div class="row mb-2"></div>
      <div class="row mb-3">
        <h5 id="email${poll.config.id}">An email with the below links has been sent to: ${poll.config.creator_email}</h5>
      </div>

      <hr>
      `;
    }
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
        View poll results: &nbsp;&nbsp;<a href='${resultsUrl}' class="shareUrl" title='view poll results'>${resultsUrl}</a>
        <button type="button" class="button button-small" id="copyResultsUrl" onclick="copyUrl('${resultsUrl}')"><i class="fa-solid fa-copy"></i></i></button>
      </h6>
      `
    }
    
    buffer += `
        </footer>
      </article>
    `;
    return buffer;
  }

  window.poll.createPoll = createPoll;
});