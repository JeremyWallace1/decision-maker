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
            class="form-control"1
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

      <div class="row mb-3" id="choices">
        <h3 class="col">Define poll choices</h3>
      </div>

      <div class="row mb-3 align-items-start" id="manageChoices">
        <div class="col-sm-6 col-md-3 col-lg-2">
          <button type="button" class="button" id="buttonAddChoice">add choice</button>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-2">
          <button type="button" class="button" id="buttonRemoveChoice">remove choice</button>
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
        <input type="text" class="form-control" id="inputTitle:id:" name="choice:id:_title" required>
      </div>
    </div>

    <!-- IMAGE -->
    <div class="form-group row mb-3 justify-content-end" id="containerImage:id:">

      <!-- IMAGE INPUT -->
      <label for="choice:id:_image" class="col-md-2 col-form-label">
        Add Image:
      </label>
      <div class="col-md-10">
        <input
          class="form-control"
          id="inputImage:id:"
          name="choice:id:_image"
          accept="image/*"
          type="file"
          capture="user"
        />
      </div>

      <!-- IMAGE PREVIEW -->
      <div class="col-md-10 mt-3" id="containerPreviewImage:id:">
        <img src="" class="img-fluid img-thumbnail d-block question img-preview" id="imgPreviewImage:id:" />
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

    <!-- SHOW INPUTS -->
    <div class="row mb-3 justify-content-end" id="containerAddInput:id:">

      <!-- SHOW IMAGE INPUT -->
      <div class="col-md-10" id="containerAddInputImage:id:">
        <button type="button" class="button-link" id="buttonAddInputImage:id:"><i class="fa-regular fa-image fa-lg">&nbsp</i>add image</button>
      </div>

      <!-- SHOW DESCRIPTION INPUT -->
      <div class="col-md-10" id="containerAddInputDescription:id:">
        <button type="button" class="button-link" id="buttonAddInputDescription:id:"><i class="fa-solid fa-plus fa-lg">&nbsp</i>add description</button>
      </div>

    </div>

  </div>
  `);

  const createRegularChoice = (choiceHTML, id) => {
    const parsedHTML = choiceHTML.replaceAll(':id:', id);
    const $choice = $(parsedHTML);
    const $containerDescription = $choice.find(`#containerDescription${id}`);
    const $containerImage = $choice.find(`#containerImage${id}`);
    const $containerPreviewImage = $choice.find(`#containerPreviewImage${id}`);
    const $containerAddInputImage = $choice.find(`#containerAddInputImage${id}`);
    const $buttonAddInputImage = $choice.find(`#buttonAddInputImage${id}`);
    const $buttonRemoveImage = $choice.find(`#buttonRemoveImage${id}`);
    const $buttonAddInputDescription = $choice.find(`#buttonAddInputDescription${id}`);
    const $imgPreviewImage = $choice.find(`#imgPreviewImage${id}`);
    const $inputImage = $choice.find(`#inputImage${id}`);
    
    $formPollNew.images[`image${id}`] = null;
    
    // Hide elements that should not be shown initially
    $containerDescription.hide();
    $containerImage.hide();
    $containerPreviewImage.hide();

    // Add event listeners
    // Button press: Add image
    $buttonAddInputImage.on('click', function(event) {
      event.preventDefault();
      $containerImage.show(300);
      $containerAddInputImage.hide(300);
    })
    // Button press: Add description
    $buttonAddInputDescription.on('click', function(event) {
      event.preventDefault();
      $containerDescription.show(300);
      $choice.find(`#containerAddInputDescription${id}`).hide(300);
    })
    // Button press: Remove image
    $buttonRemoveImage.on('click', function(event) {
      event.preventDefault();
      $formPollNew.images[`image${id}`] = null;
      $containerPreviewImage.hide(100);
      setTimeout(() => $imgPreviewImage.attr('src', ''), 100);
      $inputImage.val('');
    })
    // Input change: Choose image file
    $inputImage.on('change', function (event) {
      const file = this.files[0];
      convertToBase64(file)
      .then(data => {
        // Store image data, so it can be used by the form POST
        $formPollNew.images[`image${id}`] = data;
        // Preview image on display
        $containerPreviewImage.hide(100);
        setTimeout(() => {
          $imgPreviewImage.attr('src', '');
          $imgPreviewImage.attr('src', data);
          $containerPreviewImage.show(300);
        }, 300);
      })
      .catch(error => {
        $(this).toggleClass("error", true);
        console.log(error.message);
      })
    });
    return $choice;
  }

  $formPollNew.images = {};
  window.$formPollNew = $formPollNew;

  $formPollNew.attr('action', '/polls');
  
  // Run once: Choice management
  (() => {
    const $choices = $formPollNew.find('#choices');
    const $manageChoices = $formPollNew.find('#manageChoices');
    const $buttonAddChoice = $manageChoices.find('#buttonAddChoice');
    const $buttonRemoveChoice = $manageChoices.find('#buttonRemoveChoice');
    const minChoices = 2;
    const maxChoices = 5;
    const countChoice = $choices.children(`.choice-regular`).length;
    if (countChoice >= maxChoices) {
      $buttonAddChoice.hide();
    }

    if (countChoice <= minChoices) {
      $buttonRemoveChoice.hide();
    }

    // Add initial choices to the form
    for (let i = 1; i <= minChoices; i++) {
      const id = countChoice + i;
      $choices.append(createRegularChoice(choiceRegularHTML, id));
    }

    // Button press: Add Choice
    $buttonAddChoice.on('click', function(event) {
      event.preventDefault();
      const countChoice = $choices.children(`.choice-regular`).length;
      if (countChoice < maxChoices) {
        const id = countChoice + 1;
        const $choice = createRegularChoice(choiceRegularHTML, id);
        $choices.append($choice);
        $choice.hide().show(300);
        $buttonRemoveChoice.show(300);
        setTimeout(() => {
          if ((countChoice + 1) === maxChoices) {
            $buttonAddChoice.hide(300);
          }
        });
      }
    });

    // Button press: Remove Choice
    $buttonRemoveChoice.on('click', function(event) {
      event.preventDefault();
      const countChoice = $choices.children(`.choice-regular`).length;
      if (countChoice > minChoices) {
        const $choice = $choices.find(`#container${countChoice}`);
        $choice.hide(100);
        $formPollNew.images[`image${countChoice}`] = null;
        setTimeout(() => {
          $choice.remove();
          $buttonAddChoice.show(300);
          if ((countChoice - 1) === minChoices) {
            $buttonRemoveChoice.hide(300);
          }
        }, 100);
      }
    });

  })();

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
      if ($formPollNew.images.image0) {
        modifiedData += '&image=' + encodeURIComponent($formPollNew.images.image0);
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