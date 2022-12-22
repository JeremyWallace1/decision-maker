$(() => {
  window.poll = {};

  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
    console.log(`poll info: ${poll.config}`);
    let buffer = `
      <article class="poll" id="poll_${poll.config.id}">
        <header class="poll_heading">
          <h3>${poll.config.creator_email} has asked a question...</h3>
          <hr>
          <h2>Question: ${poll.config.question}</h2>
          <p>Description: ${poll.config.description}</p>
        </header>`
    
    // if showResults is true, shows current score below the answer/description, otherwise nothing under it.
    for (const choice in poll.choices) {
      let num = 1;
      buffer += `
        <section id="question${poll.choices[choice].id}">
          <h4>Question: ${poll.choices[choice].title}</h4>
          <p>Description: ${poll.choices[choice].description}</p>
          ${showResults ? 
            `<p>Current score: TBD</p>` 
            : ``}
        </section>
      `
    }
    
    buffer += `
        <footer class="poll_footer">
          <p class="poll_share_url">
          Share poll: <a href='${poll.config.sharing_url}' title='share this poll'>${poll.config.sharing_url}</a>
          </p>
          ${showResults ? 
          `<p class="poll_results_url">
          View Results: <a href='${poll.config.results_url}' title='view poll results'>${poll.config.results_url}</a></p>`
          : `` }
          </footer>
      </article>
    `;

    return buffer;
  }

  window.poll.createPoll = createPoll;

});