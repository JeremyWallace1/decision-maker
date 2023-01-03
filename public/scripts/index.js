
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
          polls.addPolls(output, false, false);
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
      polls.addPolls(output, true, false);
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
    if ($('#inputEmail').val() || $('#inputQuestion').val() || $('#inputQuestion').val() || $('#choice1').val() || $('#choice2').val()) {
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
    // if (num > 2) {
    //   $('#removeChoices').prop('disabled', false);
    // } else {
    //   $('#removeChoices').prop('disabled', true);
    // }
    // if (num === max) {
    //   $('#addMoreChoices').prop('disabled', true);
    // } else {
    //   $('#addMoreChoices').prop('disabled', false);
    // }
    if (num > 2) {
      $('#removeChoices').show();
    } else {
      $('#removeChoices').hide();
    }
    if (num === max) {
      $('#addMoreChoices').hide();
    } else {
      $('#addMoreChoices').show();
    }
  };

  addChoices = () => {
    if (num < max) {
      num++;
      $('#moreChoices').append(
        `
        <div class="row mb-3" id="Choice${num}">
          <h5>Choice #${num}:</h5>
          <div class="row mb-3">
            <label for="choice${num}" class="col-md-2 col-form-label">
              Choice:
            </label>
            <div class="col-md-10">
              <input type="text" class="form-control" id="choice${num}" 
              aria-describedby="choice${num}Feedback" name="choice${num}_title" required>
            </div>
          </div>
          <div class="row mb-3" id="description${num}" style="display: none">
            <label for="choice${num}_description" class="col-md-2 col-form-label">
              Description:
            </label>
            <div class="col-md-10">
              <textarea rows="3" class="form-control" id="choice${num}_description" name="choice${num}_description" placeholder="optional"></textarea>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-md-2">
            </div>
            <div class="col-md-10">
              <button type="button" class="button-link" id="addDescription${num}"  onclick="addDescription(${num});"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
            </div>
          </div>
        </div>
        `
      );
      toggleButtons();
    } 
  };
  removeChoices = () => {
    if (num > 2) {
      $(`#Choice${num}`).remove();
      num--;
      toggleButtons();
    }
  };

  addDescription = (num) => {
    // console.log(`clicked on #description${num}'s add description button...`)
    $(`#addDescription${num}`).hide(300);
    $(`#description${num}`).show(300);
  };

  loadingButton = () => {
    $(`#createPollText`).hide(0);
    $(`#loadingText`).show(0);
    $(`#loadingSpinner`).show(0);
    document.querySelector('#submitButton').disabled = true;
  }

  copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    // Alert the copied text
    alert(`Copied the text '${url}' to the clipboard.`);
  };

  delay = (t, v) => {
    return new Promise(resolve => setTimeout(resolve, t, v));
  }

});
