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
      `
      let questionImage = poll.config.image;
      if (questionImage) {
        buffer += `
        <div class="row" id="img-preview-question">
          <div class="col">
            <img src="${questionImage}" class="question img-preview img-fluid" />
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
          
        </header>`
    
    // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
    let num = 0;
    for (const choice in poll.choices) {
      num++;
      const choiceId = poll.choices[choice].id;
      // poll.scores = [{choice_id: choiceId, scoring: `${num}`}];
      // console.log('poll.scores:', JSON.stringify(poll.scores), 'poll.scores.length', poll.scores.length);
      let score = 0;
      let target;
      if (poll.scores.length > 0) {
        for (let i in poll.scores) {
          if (poll.scores[i].choice_id === choiceId) {
            target = {choice_id: choiceId, scoring: poll.scores[i].scoring}
          }

        }

        // console.log(`target is ${JSON.stringify(target)}, target.scoring = ${target.scoring}`);
        score = target.scoring;
        // console.log(`score is ${score}`);
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

    const origin = window.location.origin;
    const sharingUrl = origin.concat('/?', poll.config.sharing_url);
    buffer += `
    <footer class="poll_footer row mb-3">
      <h6 class="poll_share_url">
        Share poll: &nbsp;&nbsp;<a href='${sharingUrl}' class="shareUrl" title='share this poll'>${sharingUrl}</a>
        <button type="button" class="button button-small" id="copyShareUrl" onclick="copyUrl('${sharingUrl}')">📋</button>
      </h6>
    `;
    
    const resultsUrl = origin.concat('/?', poll.config.results_url);
    if (showResults) {
      buffer += 
      `<h6 class="poll_results_url">
        View results: &nbsp;&nbsp;<a href='${resultsUrl}' class="shareUrl" title='view poll results'>${resultsUrl}</a>
        <button type="button" class="button button-small" id="copyResultsUrl" onclick="copyUrl('${resultsUrl}')">📋</button>
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