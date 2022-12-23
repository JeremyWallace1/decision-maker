$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
    // console.log(`poll info: ${JSON.stringify(poll.config)}`);
    let buffer = `
      <article class="poll" id="poll_${poll.config.id}">
        <header class="poll_heading">
          <div class="row mb-3">
            <h3 id="email${poll.config.id}">${poll.config.creator_email} has asked a question...</h3>
          </div>

          <hr>
  
          <div class="row mb-3">
            <div class="row">
              <h4 class="col-sm-2" id="labelQuestion${poll.config.id}">
                Question:
              </h4>
              <h4 class="col-sm-10" id="question${poll.config.id}">
                ${poll.config.question}
              </h4>
            </div>
          </div>

          <div class="row">
            <h5 class="col-sm-2"></h5>
            <h6 class="col-sm-10" id="description${poll.config.id}">
              ${poll.config.description}
            </h6>
          </div>

          <hr class="major">
          
        </header>`
    
    // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
    let num = 0;
    for (const choice in poll.choices) {
      num++;
      const choiceId = poll.choices[choice].id;
      poll.scores = [{choice_id: choiceId, scoring: `${num}`}];
      // console.log('poll.scores:', JSON.stringify(poll.scores), 'poll.scores.length', poll.scores.length);
      let score = 0;
      if (poll.scores.length > 0) {
        const target = poll.scores.filter(element => element.choice_id = choiceId)[0];
        // console.log(`target is ${target}, target.scoring = ${target.scoring}`);
        score = target.scoring;
        // console.log(`score is ${score}`);
      } 
      buffer += `
      
          <div class="row">
            <h5 class="col-sm-2" id="labelAnswer${poll.choices[choice].id}">Answer #${num}:</h5>
            <h5 class="col-sm-10" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h5>
          </div>
      
          <div class="row">
            <h5 class="col-sm-2"></h5>
            <p class="col-sm-10" id="description${poll.choices[choice].id}">${poll.choices[choice].description}</p>
          </div>

          <div class="row mb-12">
            ${showResults ? 
              `<h6>Current score: ${score}</h6>` 
              : ``}
          </div>

          <hr class="minor">

      `
    }
    let shareurl = poll.config.sharing_url;
    let resultsurl = poll.config.results_url;

    buffer += `
        <footer class="poll_footer row mb-3">
          <h6 class="col-sm-4 poll_share_url">
          Share poll: <a href='${poll.config.sharing_url}' class="shareUrl" title='share this poll'>${poll.config.sharing_url}</a>
          <button type="button" class="btn btn-outline-none" id="copyShareUrl" onclick="copyUrl('${shareurl}')">📋</button>
          </h6>
          ${showResults ? 
          `<h6 class="col-sm-6 poll_results_url">
          View results: <a href='${poll.config.results_url}' class="shareUrl" title='view poll results'>${poll.config.results_url}</a>
          <button type="button" class="btn btn-outline-none" id="copyResultsUrl" onclick="copyUrl('${resultsurl}')">📋</button>
          </h6>
          <hr>
          <hr>
          `
          : `` }
        </footer>
      </article>
    `;

    return buffer;
  }

  window.poll.createPoll = createPoll;

});