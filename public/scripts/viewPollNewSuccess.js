$(() => {
  window.pollNewSuccess = {};
  const $newPollSuccessMessage = $(`
    <section></section>
    `
  );
  window.$newPollSuccessMessage = $newPollSuccessMessage;

  const generateHTML = (poll) => {
    const origin = window.location.origin;
    const sharingUrl = origin.concat('/?', poll.config.sharing_url);
    const resultsUrl = origin.concat('/?', poll.config.results_url);
    let buffer = `
    <h1 class="display-4">
      Your new poll was created successfully!
    </h3>

    <article class="poll" id="poll_${poll.config.id}">
      <header class="poll_heading">
      <div class="row mb-2"></div>
      <div class="row mb-3">
        <h5 id="email${poll.config.id}">An email with the below links has been sent to: ${poll.config.creator_email}</h5>
      </div>

      <hr>
      
      <footer class="poll_footer row mb-3">
      <div class="row">
        <h1 class="" id="question${poll.config.id}">
          ${poll.config.question}
        </h1>
      </div>
        <h6 class="poll_share_url">
          Share poll: &nbsp;&nbsp;<a href='${sharingUrl}' class="shareUrl" title='share this poll'>${sharingUrl}</a>
          <button type="button" class="button button-small" id="copyShareUrl" onclick="copyUrl('${sharingUrl}')"><i class="fa-solid fa-copy fa-lg"></i></i></button>
        </h6>
   
        <h6 class="poll_results_url">
          View poll results: &nbsp;&nbsp;<a href='${resultsUrl}' class="shareUrl" title='view poll results'>${resultsUrl}</a>
          <button type="button" class="button button-small" id="copyResultsUrl" onclick="copyUrl('${resultsUrl}')"><i class="fa-solid fa-copy fa-lg"></i></i></button>
        </h6>
      
      </footer>
    </article>
    `;
    return buffer;
  };

  const createSuccessMessage = (pollData) => {
    window.$newPollSuccessMessage = $(generateHTML(pollData));
  };

  window.pollNewSuccess.createSuccessMessage = createSuccessMessage;

});
