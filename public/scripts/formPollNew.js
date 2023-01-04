$(() => {

  const $formPollNew = $(`
    <form action="" method="POST" class="col-12" id="create-poll">

      <div class="row mb-3">
        <h3 class="col">What do you want to ask?</h3>
      </div>

      <div class="row mb-3">
        <label for="inputQuestion" class="col-md-2 col-form-label">
          Question:
        </label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="inputQuestion" name="question" minlength="5" required>
        </div>
      </div>

      <div class="row mb-3 justify-content-end" id="containerImage0">
        <label for="inputImage0" class="col-md-2 col-form-label">
          Add Image:
        </label>
        <div class="col-md-10">
          <input
            class="form-control"
            id="inputImage0"
            name="image_outputId"
            accept="image/*"
            type="file"
            capture="user"
          />
        </div>
        <div class="col-md-10 mt-3" id="previewImage0">
          <img src="" class="img-fluid img-thumbnail d-block question img-preview" id="imgImage0" />
          <button class="button my-2" id="removeImage0">remove image</button>
        </div>
      </div>
        
      <div class="row mb-3" id="containerDescription0" style="display: none">
        <label for="inputTitle" class="col-md-2 col-form-label">
          Description:
        </label>
        <div class="col-md-10">
          <textarea rows="3" class="form-control" id="inputTitle" name="description" placeholder="optional"></textarea>
        </div>
      </div>

      <div class="row mb-3 justify-content-end">
        <div class="col-md-10" id="addImage0">
          <button type="button" class="button-link">
            <i class="fa-regular fa-image fa-lg">&nbsp</i>
            add image
          </button>
        </div>
        <div class="col-md-10" id="addDescription0">
          <button type="button" class="button-link">
            <i class="fa-solid fa-plus fa-lg">&nbsp</i>
            add description
          </button>
        </div>
      </div>
      
      <hr class="minor">

      <section id="choices">
        <div class="row mb-3">
          <h3 class="col">Define poll choices</h3>
        </div>
      </section>

      <div class="row mb-3" id="moreChoices">
        <div class="col">
          <button type="button" class="button" id="addMoreChoices"  onclick="addChoices();">add choices</button>
          <span class="">&nbsp&nbsp </span>
          <button type="button" class="button" id="removeChoices" onclick="removeChoices();" style="display: none">remove choices</button>
        </div>
      </div>

      <hr class="minor">

      <div class="row mb-3">
        <h3 class="col">Tell us about yourself</h3>
      </div>  

      <div class="row mb-3">
        <label for="inputEmail" class="col-md-2 col-form-label">Your email:</label>
        <div class="col-md-10">
          <input type="email" class="form-control" id="inputEmail" name="email" required>
        </div>
      </div>

      <footer class="poll_footer row mb-3">
        <div class="col">
          <hr>
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

  const choiceRegularHTML = (`
  <div class="choice choice-regular" id="container:id:">
    
    <!-- TITLE INPUT -->
    <div class="form-group row mb-3" id="containerTitle:id:">
      <label for="choice_title:id:" class="col-md-2 col-form-label" id="labelChoiceTitle:id:">
        Choice:
      </label>
      <div class="col-md-10">
        <input type="text" class="form-control" id="inputChoiceTitle:id:" name="choice:id:_title" required>
      </div>
    </div>

    <!-- IMAGE INPUT -->
    <div class="form-group row mb-3 justify-content-end" id="containerImage:id:">
      <label for="choice:id:_image" class="col-md-2 col-form-label">
        Add Image:
      </label>
      <div class="col-md-10">
        <input
          class="form-control"
          id="inputChoiceImage:id:"
          name="choice:id:_image"
          accept="image/*"
          type="file"
          capture="user"
        />
      </div>
      <div class="col-md-10 mt-3" id="previewChoiceImage:id:">
        <img src="" class="img-fluid img-thumbnail d-block question img-preview" id="imgChoiceImage:id:" />
        <button class="button my-2" id="buttonRemoveImage:id:">remove image</button>
      </div>
    </div>

    <!-- DESCRIPTION INPUT -->
    <div class="form-group row mb-3" id="containerDescription:id:">
      <label for="choice:id:_description" class="col-md-2 col-form-label" id="labelDescription:id:">
        Description:
      </label>
      <div class="col-md-10">
        <textarea rows="3" class="form-control" id="inputDescription:id:" name="choice:id:_description" placeholder="optional"></textarea>
      </div>
    </div>

    <!-- SHOW DESCRIPTION -->
    <div class="row  mb-3 justify-content-end" id="containerAddDescription:id:">
      <div class="col-md-10">
        <button type="button" class="button-link" id="buttonAddDescription:id:"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
      </div>
    </div>

    <!-- SHOW IMAGE -->

  </div>
  `);

  $formPollNew.images = {};

  $formPollNew.attr('action', '/polls');

  const $containerDescription0 = $formPollNew.find('#containerDescription0');
  const $addDescription0 = $formPollNew.find('#addDescription0');
  $addDescription0.on('click', function() {
    $containerDescription0.show(300);
    $addDescription0.hide(300);
  })

  const $containerImage0 = $formPollNew.find('#containerImage0');
  const $previewImage0 = $containerImage0.find('#previewImage0');
  const $inputImage0 = $containerImage0.find('#inputImage0');
  const $imgImage0 = $containerImage0.find('#imgImage0');
  const $removeImage0 = $containerImage0.find('#removeImage0');
  const $addImage0 = $formPollNew.find('#addImage0');
  
  $containerImage0.hide();
  $previewImage0.hide();

  $addImage0.on('click', function(event) {
    $containerImage0.show(300);
    $addImage0.hide(300);
  });

  $removeImage0.on('click', function(event) {
    event.preventDefault();
    $formPollNew.images.Image0 = null;
    $previewImage0.hide(300);
  });

  $inputImage0.on('change', function (event) {
    const file = this.files[0];
    convertToBase64(file)
    .then(data => $formPollNew.images.Image0 = data)
    .then(data => {
      $imgImage0.attr('src', data);
      $previewImage0.show(300);
      $inputImage0.val('');
    })
    .catch(error => {
      $(this).toggleClass("error", true);
      console.log(error.message);
    })
  });

  const $choices = $formPollNew.find('#choices');

  const createRegularChoice = (choiceHTML) => {
    const totalChoices = $choices.children(`.choice-regular`).length;
    const countChoice = totalChoices + 1;
    const parsedHTML = choiceHTML.replaceAll(':id:', countChoice);
    const $choice = $(parsedHTML);
    
    $choice.find(`#containerDescription${countChoice}`)
      .hide(0);

    $choice.find(`#buttonAddDescription${countChoice}`)
      .on('click', function() {
        $choice.find(`#containerDescription${countChoice}`).show(300);
        $choice.find(`#containerAddDescription${countChoice}`).hide(300);
      }
    )
    
    return $choice;
  }

  $choices.append(createRegularChoice(choiceRegularHTML));
  $choices.append(createRegularChoice(choiceRegularHTML));
  $choices.append(createRegularChoice(choiceRegularHTML));
  
  window.$formPollNew = $formPollNew;

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

  $formPollNew.on('submit', function (event) {
    event.preventDefault();
    // loading button when it's taking it's time
    loadingButton();
    // adding artificial delay 
    delay(4000).then(() => {

      views_manager.show('none');
  
      const data = $(this).serialize();
      let modifiedData = data;
      if ($formPollNew.images.Image0) {
        modifiedData += '&image=' + encodeURIComponent($formPollNew.images.Image0);
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
        views_manager.show('pollNew');
      })
    })
  })
});