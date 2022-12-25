$(() => {

  window.poll_respond = {};
  const $formPollRespond = $('<form></form>');
  window.$formPollRespond = $formPollRespond;

  const getHtml = (data) => {
    const poll = data;
    let buffer = `
    <form action="/responses/${poll.config.id}" method="POST" id="poll-response" class="poll">
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

        <div class="row">
          <p class="col-md-12" id="description${poll.config.id}">
            ${poll.config.description}
          </p>
        </div>

        <hr class="major">
        
      </header>
      `;

      let count = 0;
      for (const choice in poll.choices) {
        count++;
       buffer += `
        <div class="row">
          <h5 class="col-md-2" id="labelAnswer${poll.choices[choice].id}">Answer #${count}:</h5>
          <h6 class="col-md-10" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h6>
        </div>
    
        <div class="row">
          <p class="col-md-12" id="description${poll.choices[choice].id}">${poll.choices[choice].description}</p>
        </div>

        <hr class="minor">
        `;
      }

    buffer += `
        <footer class="poll_footer row mb-3">
          <div class="buttons">
            <button type="submit" class="button button-large col-12">Submit Choices</button> 
          </div>
        </footer>
      </form>
      `;
    
    const $html = $(buffer);
    return $html;
  }
  
  const createForm = (data) => {
    window.$formPollRespond = getHtml(data);
    attachEventListener(window.$formPollRespond);
  }

  window.poll_respond.createForm = createForm;
  
  const attachEventListener = ($element) => {
    $element.on('submit', function (event) {
      event.preventDefault();
      console.log('test')
      views_manager.show('none');
      
    });
  }

});