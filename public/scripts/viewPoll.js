$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
    console.log(`poll info: ${poll.config}`);
    let buffer = `
      <article class="poll" id="poll_${poll.config.id}">
        <header class="poll_heading">
          <div class="row mb-3">
            <h3 id="email${poll.config.id}">${poll.config.creator_email} has asked a question...</h3>
          </div>

          <hr class="border border-primary border-1">
  
          <div class="row">
            <h2 class="col-sm-3" id="labelQuestion${poll.config.id}">Question:</h2>
            <h2 class="col-sm-9" id="question${poll.config.id}">${poll.config.question}</h2>
          </div>
        
          <div class="row mb-3">
            <h4 class="col-sm-3 id="labelDescription${poll.config.id}">Description:</h4>
            <h4 class="col-sm-9 " id="description${poll.config.id}">${poll.config.description}</h4>
          </div>

          <hr class="border-dashed border-0.5">
          
        </header>`
    
    // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
    let num = 0;
    for (const choice in poll.choices) {
      num++;
      buffer += `

          <div class="row">
            <h3 class="col-sm-3" id="labelAnswer${poll.choices[choice].id}">Answer #${num}:</h3>
            <h3 class="col-sm-9" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h3>
          </div>
      
          <div class="row mb-3">
            <h4 class="col-sm-3 id="labelDescription${poll.choices[choice].id}">Description:</h4>
            <h4 class="col-sm-9" id="description${poll.choices[choice].id}">$${poll.choices[choice].description}</h4>
          </div>

          <div class="row">
            ${showResults ? 
              `<p>Current score: TBD</p>` 
              : ``}
          </div>
      `
    }
    let shareurl = poll.config.sharing_url;
    let resultsurl = poll.config.results_url;

    buffer += `
        <footer class="poll_footer row mb-3">
          <h5 class="col-sm-6 poll_share_url">
          Share poll: <a href='${poll.config.sharing_url}' class="shareUrl" title='share this poll'>${poll.config.sharing_url}</a>
          <button type="button" class="btn btn-outline-none" id="copyShareUrl" onclick="copyUrl('${shareurl}')">📋</button>
          </h5>
          ${showResults ? 
          `<h5 class="col-sm-6 poll_results_url">
          View Results: <a href='${poll.config.results_url}' class="shareUrl" title='view poll results'>${poll.config.results_url}</a>
          <button type="button" class="btn btn-outline-none" id="copyResultsUrl" onclick="copyUrl('${resultsurl}')">📋</button>
          </h5>`
          : `` }
        </footer>
      </article>
    `;

    return buffer;
  }

  window.poll.createPoll = createPoll;

});