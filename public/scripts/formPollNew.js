$(() => {

  const $formPollNew = $(`
  <form action="/polls" method="POST" class="col-12" id="create-poll">
    <div class="row mb-0">
      <div class="row mb-0">
        <label for="inputEmail" class="col-md-2 col-form-label">Your email:</label>
        <div class="col-md-10">
          <input type="email" class="form-control" id="inputEmail" name="email" required>
        </div>
      </div>
    </div>
    <hr class="minor">

    <div class="row mb-3">
      <h3>What do you want to ask?</h3>
    </div>

    <div class="row mb-0">
      <div class="row mb-3">
        <label for="inputQuestion" class="col-md-2 col-form-label">
          Question:
        </label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="inputQuestion" name="question" minlength="5" required>
        </div>
      </div>
    </div>

    <div class="row mb-0" id="descriptionImage0" style="display: none">
      <div class="row mb-3">
        <label for="selectQuestionImage" class="col-md-2 col-form-label">
          Add Image:
        </label>
        <div class="col-md-10">
          <input
            class="form-control"
            id="selectQuestionImage"
            name="question_image"
            accept="image/*"
            type="file"
            capture="user"
          />
        </div>
      </div>
    </div>
    <div class="row mb-0">
      <div class="col-md-2">
      </div>
      <div class="col-md-10">
        <button type="button" class="button-link" id="addDescriptionImage0"  onclick="addDescription('Image0');"><i class="fa-regular fa-image fa-lg">&nbsp</i>add image</button>
      </div>
    </div>


    <div class="row mb-0" id="description0" style="display: none">
      <div class="row mb-0">
        <label for="inputTitle" class="col-md-2 col-form-label">
          Description:
        </label>
        <div class="col-md-10">
          <textarea rows="3" class="form-control" id="inputTitle" name="description" placeholder="optional"></textarea>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-2">
      </div>
      <div class="col-md-10">
        <button type="button" class="button-link" id="addDescription0"  onclick="addDescription(0);"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
      </div>
    </div>
    <hr class="minor">

    <div id="Choice1">
      <div class="row mb-3 choiceOne">
        <h5>Choice #1:</h5>
        <div class="row mb-3">
          <label for="choice1" class="col-md-2 col-form-label">
            Choice:
          </label>
          <div class="col-md-10">
            <input type="text" class="form-control" id="choice1" name="choice1_title" required>
          </div>
        </div>
        <div class="row mb-3" id="description1" style="display: none">
          <label for="choice1_description" class="col-md-2 col-form-label">
            Description:
          </label>
          <div class="col-md-10">
            <textarea rows="3" class="form-control" id="choice1_description" name="choice1_description" placeholder="optional"></textarea>
          </div>
        </div>
        <div class="row mb-1">
          <div class="col-md-2">
          </div>
          <div class="col-md-10">
            <button type="button" class="button-link" id="addDescription1"  onclick="addDescription(1);"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
          </div>
        </div>
      </div>
    </div>

    <div id="Choice2">
      <div class="row mb-3">
        <h5>Choice #2:</h5>
        <div class="row mb-3">
          <label for="choice2" class="col-md-2 col-form-label">
            Choice:
          </label>
          <div class="col-md-10">
            <input type="text" class="form-control" id="choice2" aria-describedby="choice2Feedback" name="choice2_title" required>
          </div>
        </div>
        <div class="row mb-3" id="description2" style="display: none">
          <label for="choice2_description" class="col-md-2 col-form-label">
            Description:
          </label>
          <div class="col-md-10">
            <textarea rows="3" class="form-control" id="choice2_description" name="choice2_description" placeholder="optional"></textarea>
          </div>
        </div>
        <div class="row mb-1">
          <div class="col-md-2">
          </div>
          <div class="col-md-10">
            <button type="button" class="button-link" id="addDescription2"  onclick="addDescription(2);"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
          </div>
        </div>
      </div>
    </div>
    <div id="moreChoices"></div>

    
    <footer class="poll_footer row mb-3">
      <div class="buttons">
        <button type="button" class="button" id="addMoreChoices"  onclick="addChoices();">add choices</button>
        <span class="">&nbsp&nbsp </span>
        <button type="button" class="button" id="removeChoices" onclick="removeChoices();" style="display: none">remove choices</button>
      </div>
      <div class="col-12">
        <hr>
      </div>
      <div class="buttons">
        <button type="submit" class="button button-large col-12" id="submitButton">
          <span class="spinner-border spinner-border-lg" id="loadingSpinner" role="status" style="display: none">
          </span>
          <span id="createPollText">Create Poll</span>
          <span id="loadingText" style="display: none">Creating Poll...</span>
        </button> 
      </div>
    </footer>

  </form>
  `);

  window.$formPollNew = $formPollNew;

  const generateQuestionImgHTML = (imgData) => {
    return `
    <div class="row my-3" id="img-preview-question">
      <div class="col">  
        <img src="${imgData}" class="img-fluid img-thumbnail d-block question img-preview" />
        <button class="button my-2" id="remove-img-preview-question">remove image</button>
      </div>
    </div>
    `
  };

  $formPollNew.images = {};

  const $selectQuestionImage = $formPollNew.find('#selectQuestionImage');

  $selectQuestionImage.on('change', function (event) {
    const file = this.files[0];
    console.log(file)
    const parentElement = $(this).parent();
    convertToBase64(file)
    .then(data => $formPollNew.images.question = data)
    .then(data => previewImage(data, '#img-preview-question', parentElement))
    .catch(error => {
      $(this).toggleClass("error", true);
      console.log(error.message);
    })
  })

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onError = (error) => {
        reject(error);
      };
    });
  };

  const previewImage = (imgData, newElementId, appendToElementSelector) => {
    const html = generateQuestionImgHTML(imgData);
    $(newElementId).remove();
    $(appendToElementSelector).append(html);
    $(newElementId).find('#remove-img-preview-question')
      .on('click', function (event) {
        event.preventDefault();
        $(newElementId).remove();
      }
    )
  }


  $formPollNew.on('submit', function (event) {
    event.preventDefault();
    // loading button when it's taking it's time
    loadingButton();
    // adding artificial delay 
    delay(2000).then(() => {

      views_manager.show('none');
  
      const data = $(this).serialize();
      let modifiedData = data;
      if ($formPollNew.images.question) {
        modifiedData += '&image=' + encodeURIComponent($formPollNew.images.question);
      }
  
      let uri = null;
      const output = [];
      submitPoll(modifiedData)
      // data in format of "id, creator_email, question, description, results_url, sharing_url and an array of choices"
      .then(data => {
        uri = data[0].results_url;
      })
      .then((data) => getPollByUri(uri))
      .then(data => output.push(data[0]))
      .then(data => getResponsesByUri(uri))
      .then(data => {
        output[0].pollId = output[0].config.id;
        output[0].responses = data[0].responses;
        output[0].scores = data[0].scores;
      })
      .then(() => {
        window.api.data = output[0];
        views_manager.show('pollNewSuccess');
      })
      .catch((error) => {
        console.error(error);
        console.log('something went wrong!');
        stopLoadingButton();
        views_manager.show('pollNew');
      })
    })
  })
});