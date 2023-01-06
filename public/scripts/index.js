
// Client facing scripts here
window.api = {};
window.api.data = null;

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
        return getEnvType()
          .then(envType => getMyIp(envType))
          .then(data => {
            return data;
          })
          .then(data => getResponsesByIp(data.ip, uri))
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
    if ($('#inputEmail').val() || $('#inputTitle0').val() || $('#inputDescription0').val() || $('#inputTitle1').val() || $('#inputDescription1').val() || $('#inputTitle2').val() || $('#inputDescription2').val()) {
      if (confirm('This will start a new poll and remove the current form\'s data.\nAre you sure?')) {
        $(location).attr('href', '/');
      }
    } else {
      $(location).attr('href', '/');
    }
  };

  document.getElementById("newPoll").addEventListener("click", redirectButton);

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
