$(() => {
  window.poll = {};

  const createPoll = (poll, showResults) => { 
    let buffer = `
      <article class="poll" id="poll_${poll.config.id}">
        <header class="poll_heading">
          <h1>${poll.config.question}</h1>
          <p>${poll.config.description}</p>
        </header>`
    
    for (const choice in poll.choices) {
      buffer += `
        <section class="poll_choice">
          <h3>${poll.choices[choice].title}</h3>
          <p>${poll.choices[choice].description}</p>
          ${showResults ? 
            `<p>result rank to be shown here</p>` 
            : ``}
        </section>
      `
    }
    
    buffer += `
        <footer class="poll_footer">
          <p class="poll_share_url">
            <a href='${poll.config.sharing_url}' title='share this poll'>${poll.config.sharing_url}</a>
          </p>
          ${showResults ? 
          `<p class="poll_results_url"><a href='${poll.config.results_url}' title='view poll results'>${poll.config.results_url}</a></p>`
          : `` }
          </footer>
      </article>
    `;

    return buffer;
  }

  window.poll.createPoll = createPoll;

});