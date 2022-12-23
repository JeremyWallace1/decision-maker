$(() => {

  const $formPollNew = $(`
  <form action="/polls" method="POST" class="col-12" id="create-poll">
    <div class="row mb-3">
      <div class="row mb-3">
        <label for="inputEmail" class="col-sm-2 col-form-label">Your email:</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail" name="email" required>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <h3>What do you want to ask?</h3>
    </div>

    <div class="row mb-3">
      <div class="row mb-3">
        <label for="inputQuestion" class="col-sm-2 col-form-label">
          Question:
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputQuestion" name="question" minlength="5" required>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="row mb-3">
        <label for="inputTitle" class="col-sm-2 col-form-label">
          Description:
        </label>
        <div class="col-sm-10">
          <textarea class="form-control" id="inputTitle" name="description" placeholder="optional"></textarea>
        </div>
      </div>
    </div>

    <div id="Answer1">
      <div class="row mb-3 answerOne">
        <h5>Answer #1:</h5>
        <div class="row mb-3">
          <label for="answer1" class="col-sm-2 col-form-label">
            Answer:
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="answer1" name="answer1_title" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="answer1_description" class="col-sm-2 col-form-label">
            Description:
          </label>
          <div class="col-sm-10">
            <textarea rows="3" class="form-control" id="answer1_description" name="answer1_description" placeholder="optional"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div id="Answer2">
      <div class="row mb-3">
        <h5>Answer #2:</h5>
        <div class="row mb-3">
          <label for="answer2" class="col-sm-2 col-form-label">
            Answer:
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="answer2" aria-describedby="answer2Feedback" name="answer2_title" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="answer2_description" class="col-sm-2 col-form-label">
            Description:
          </label>
          <div class="col-sm-10">
            <textarea rows="3" class="form-control" id="answer2_description" name="answer2_description" placeholder="optional"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div id="moreAnswers">

    </div>

    <div class="buttons">
        <button type="button" class="button" id="addMoreAnswers"  onclick="addOption();">add options</button>
        <button type="button" class="button" id="removeAnswers" disabled onclick="removeOption();">remove options</button>
    </div>
    <hr>
    <button type="submit" class="button button-large col-12">Create Poll</button>      
  </form>
  `);

  window.$formPollNew = $formPollNew;

  $formPollNew.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    let uri = null;
    const output = [];
    submitPoll(data)
    .then(data => uri = data[0].results_url)
    .then(data => getPollByUri(uri))
    .then(data => output.push(data[0]))
    .then(data => getResponsesByUri(uri))
    .then(data => {
      output[0].pollId = output[0].config.id;
      output[0].responses = data[0].responses;
      output[0].scores = data[0].scores;
    })
    .then(data => {
      polls.addPolls(output, true);
      views_manager.show('polls');
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('pollNew');
    })
  });
});