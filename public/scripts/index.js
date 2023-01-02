
// Client facing scripts here
window.api = {};
window.api.data = null;
window.user_ip = null;

$(() => {

  const queryString = location.search;
  const defaultView = 'pollNew';
  const output = [];
  let view = null;
  let uri = null;
  if (queryString) {
    uri = queryString.slice(1).split('&')[0];
    getPollByUri(uri)
    .then(data => {
      if (!data[0]) {
        return Promise.reject('end');
      }
      
      output.push(data[0]);
    })
    .then(() => {
      if (output[0].uriType === 'Share') {
        api.data = output[0];
        return getMyIp()
        .then(data => window.user_ip = data.ip)
        .then(ip => getResponsesByIp(ip, uri))
        .then(data => {
          if (data[0].responses.length === 0) {
            view = 'pollRespond';
            return Promise.reject('end promise chain');
          }
          output[0].pollId = output[0].config.id;
          output[0].responses = data[0].responses;
          output[0].scores = [];
          polls.addPolls(output, false);
          view = 'polls';
          return Promise.reject('end promise chain');
        })
      }
    })
    .then(() => getResponsesByUri(uri))
    .then(data => {
      output[0].pollId = output[0].config.id;
      output[0].responses = data[0].responses;
      output[0].scores = data[0].scores;
      polls.addPolls(output, true);
      view = 'polls';
      return Promise.reject('end promise chain');
    })
    .catch(err => {
      if (err.message) {
        console.log(err.message);
      };
    })
    .then(() => {
      if (!view) {
        view = defaultView; 
      }
      views_manager.show(view);
    })
  } else {
    views_manager.show(defaultView);
  }
  
  

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
        <div class="row mb-3" id="Answer${num}">
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
          <div class="row mb-3" id="description${num}" style="display: none">
            <label for="answer${num}_description" class="col-md-2 col-form-label">
              Description:
            </label>
            <div class="col-md-10">
              <textarea rows="3" class="form-control" id="answer${num}_description" name="answer${num}_description" placeholder="optional"></textarea>
            </div>
          </div>
          <button type="button" class="button-link" id="addDescription${num}"  onclick="addDescription(${num});">+ description</button>
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

  addDescription = (num) => {
    console.log(`clicked on #description${num}'s add description button...`)
    $(`#addDescription${num}`).hide(300);
    $(`#description${num}`).show(300);
  };

  // removeDescription = (num) => {
  //   console.log(`clicked on #description${num}'s remove description button...`)
  //   $(`#description${num}`).hide(500);
  // }

  copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    // Alert the copied text
    alert(`Copied the text '${url}' to the clipboard.`);
  };

});
