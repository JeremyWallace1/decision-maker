// Client facing scripts here
$(() => {

  const queryString = location.search;
  const defaultView = 'pollNew';
  const output = [];
  let view = null;
  let uri = null;
  if (queryString) {
    uri = queryString.slice(1).split('&')[0];
  }
  
  getPollByUri(uri)
    .then(data => {
      if (!data[0]) {
        return Promise.reject('end');
      }
      
      output.push(data[0]);
    })
    .then(() => {
      if (output[0].uriType === 'Share') {
        view = 'pollRespond';
        return Promise.reject('end');
      }
    })
    .then(() => getResponsesByUri(uri))
    .then(data => {
      output[0].pollId = output[0].config.id;
      output[0].responses = data[0].responses;
      output[0].scores = data[0].scores;
      polls.addPolls(output, true);
      view = 'polls';
      return Promise.reject('end');
    })
    .catch(err => {
      if (err.message) {
      };
    })
    .then(() => {
      if (!view) {
        view = defaultView; 
      }
    
      views_manager.show(view);
    })

  const redirectButton = () => {
    if ($('#inputEmail').val() || $('#inputQuestion').val() || $('#inputQuestion').val() || $('#answer1').val() || $('#answer2').val()) {
      if (confirm('This will start a new poll and remove the current form\'s data.\nAre you sure?')) {
        $(location).attr('href', '/');
      }
    } else {
      $(location).attr('href', '/');
    }
  };

  document.getElementById("newPoll").addEventListener("click", redirectButton);

  let num = 2;
  const max = 5;
  const toggleButtons = () => {
    if (num > 2) {
      $('#removeAnswers').prop('disabled', false);
    } else {
      $('#removeAnswers').prop('disabled', true);
    }
    if (num === max) {
      $('#addMoreAnswers').prop('disabled', true);
    } else {
      $('#addMoreAnswers').prop('disabled', false);
    }
  };

  addOption = () => {
    if (num < max) {
      num++;
      $('#moreAnswers').append(
        `
        <div class="row mb-3">
          <h5>Answer #${num}:</h5>
          <div class="row mb-3">
            <label for="answer${num}" class="col-md-2 col-form-label">
              Answer:
            </label>
            <div class="col-md-10">
              <input type="text" class="form-control" id="answer${num}" 
              aria-describedby="answer${num}Feedback" name="answer${num}_title" required>
            </div>
          </div>
          <div class="row mb-3">
            <label for="answer${num}_description" class="col-md-2 col-form-label">
              Description:
            </label>
            <div class="col-md-10">
              <textarea rows="3" class="form-control" id="answer${num}_description" name="answer${num}_description" placeholder="optional"></textarea>
            </div>
          </div>
        </div>
        `
      );
      toggleButtons();
    } 
  };
  removeOption = () => {
    if (num > 2) {
      $(`#Answer${num}`).remove();
      num--;
      toggleButtons();
    }
  };

  copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    // Alert the copied text
    alert(`Copied the text '${url}' to the clipboard.`);
  };

});
