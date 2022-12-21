$(() => {
  let num = 2;
  const max = 5;
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
                <input type="text" class="form-control" id="answer${num}" name="answer${num}_title">
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
    } else {
      console.log(`too many answers, max number of answers is set to ${max}`);
    }
    console.log(`num is ${num}`)
  };
  removeOption = () => {
    console.log(`at time of removeProduct num is ${num}`);
    if (num > 2) {
      $(`#Answer${num}`).remove();
      num--;
      console.log(`now that it is removed num is ${num}`);
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

    } else {
      console.log(`unable to remove any more answers, 2 is the minimum`);
    }
  };
});
