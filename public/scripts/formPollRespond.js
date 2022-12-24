$(() => {

  window.poll = {};

  const $formPollRespond = $(`
  <form action="/responses/{placeholder:poll.config.id}" method="POST" id="poll-response" class="poll">
    <header class="poll_heading">
      <div class="row mb-2"></div>
      <div class="row mb-3">
        <h5 id="email{placeholder:poll.config.id}">{placeholder:poll.config.creator_email} has asked a question...</h5>
      </div>

      <hr>

      <div class="row">
        <h4 class="col-md-2" id="labelQuestion{placeholder:poll.config.id}">
          Question:
        </h4>
        <h4 class="col-md-10" id="question{placeholder:poll.config.id}">
          {placeholder:poll.config.question}
        </h4>
      </div>

      <div class="row">
        <p class="col-md-12" id="description{placeholder:poll.config.id}">
          {placeholder:poll.config.description}
        </p>
      </div>

      <hr class="major">
      
    </header>

    {placeholder:answers}

  </form>
  `);

  
  const populateResponseForm = (poll) => {
    
  }

  window.poll.populateResponseForm = populateResponseForm;
  
  window.$formPollRespond = $formPollRespond;

  $formPollRespond.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

  });
});