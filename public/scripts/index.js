// Client facing scripts here
$(() => {

  views_manager.show('pollNew');

  const redirectButton = () => {
    if ($('#inputEmail').val() || $('#inputQuestion').val() || $('#inputQuestion').val() || $('#answer1').val() || $('#answer2').val()) {
      if (confirm('This will start a new poll and remove the current form\'s data.\nAre you sure?')) {
        console.log('Ok is clicked.');
        $(location).attr('href', '/');
      } else {
        console.log('Cancel is clicked.');
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
        <div id="Answer${num}">
          <div class="row mb-3"><h3>Answer #${num}:</h3>
            <div class="row mb-3">
              <label for="answer${num}" class="col-sm-2 col-form-label">Answer:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="answer${num}" name="answer${num}_title" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="answer${num}_description" class="col-sm-2 col-form-label">Description:</label>
              <div class="col-sm-10">
                <textarea rows="3" class="form-control" id="answer${num}_description" name="answer${num}_description" placeholder="optional"></textarea>
              </div>
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
    console.log(url);
    // Alert the copied text
    alert(`Copied the text '${url}' to the clipboard.`);
  };

});
