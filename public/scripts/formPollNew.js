$(() => {

  const $formPollNew = $(`
    <form action="" method="POST" class="col-12" id="create-poll">

      <div class="row mb-3" id="question">
        <h3 class="col">What do you want to ask?</h3>
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
        <label for="inputEmail" class="col-md-2 col-form-label text-capitalize">your email:</label>
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

  const htmlTemplateQuestionAndChoices = (`
  <div class=":type: :type:-regular" id="container:id:">
    
    <!-- TITLE INPUT -->
    <div class="form-group row mb-3" id="containerTitle:id:">
      <label for=":type:_title:id:" class="col-md-2 col-form-label text-capitalize" id="labelChoiceTitle:id:">
        :type: #:id:
      </label>
      <div class="col-md-10">
        <input type="text" class="form-control" id="inputTitle:id:" name=":type::id:_title" required>
      </div>
    </div>

    <!-- IMAGE -->
    <div class="form-group row mb-3 justify-content-end" id="containerImage:id:">

      <!-- IMAGE INPUT -->
      <label for=":type::id:_image" class="col-md-2 col-form-label text-capitalize">
        Add Image:
      </label>
      <div class="col-md-10">
        <input
          class="form-control"
          id="inputImage:id:"
          name=":type::id:_image"
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
      <label for=":type::id:_description" class="col-md-2 col-form-label text-capitalize" id="labelDescription:id:">
        Description:
      </label>
      <div class="col-md-10">
        <textarea rows="3" class="form-control" id="inputDescription:id:" name=":type::id:_description" placeholder="optional"></textarea>
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

  const createInputBlock = (html, id, type = 'choice') => {
    let parsedHTML = html.replaceAll(':id:', id);
    parsedHTML = parsedHTML.replaceAll(':type:', type);
    const $buffer = $(parsedHTML);
    const $containerDescription = $buffer.find(`#containerDescription${id}`);
    const $containerImage = $buffer.find(`#containerImage${id}`);
    const $containerPreviewImage = $buffer.find(`#containerPreviewImage${id}`);
    const $containerAddInputImage = $buffer.find(`#containerAddInputImage${id}`);
    const $buttonAddInputImage = $buffer.find(`#buttonAddInputImage${id}`);
    const $buttonRemoveImage = $buffer.find(`#buttonRemoveImage${id}`);
    const $buttonAddInputDescription = $buffer.find(`#buttonAddInputDescription${id}`);
    const $imgPreviewImage = $buffer.find(`#imgPreviewImage${id}`);
    const $inputImage = $buffer.find(`#inputImage${id}`);
    
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
      $buffer.find(`#containerAddInputDescription${id}`).hide(300);
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
    return $buffer;
  }

  $formPollNew.images = {};
  window.$formPollNew = $formPollNew;

  $formPollNew.attr('action', '/polls');
  
  // Run once: Question
  (() => {
    const $question = $formPollNew.find('#question');
    const id = 0;
    $question.append(createInputBlock(htmlTemplateQuestionAndChoices, id, 'question'))
    $question.find(`#labelChoiceTitle0`).text('Question');
  })();

  // Run once: Choices
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
      $choices.append(createInputBlock(htmlTemplateQuestionAndChoices, id, 'choice'));
    }

    // Button press: Add Choice
    $buttonAddChoice.on('click', function(event) {
      event.preventDefault();
      const countChoice = $choices.children(`.choice-regular`).length;
      if (countChoice < maxChoices) {
        const id = countChoice + 1;
        const $choice = createInputBlock(htmlTemplateQuestionAndChoices, id, 'choice');
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
    delay(0).then(() => {

      views_manager.show('none');
  
      const submittedPostData = $(this).serialize();
      let appendPostData = '';
      for (const imageKey in $formPollNew.images) {
        appendPostData += `&${imageKey}=`;
        const imageBase64 = $formPollNew.images[imageKey];
        if (imageBase64) {
          appendPostData += encodeURIComponent(imageBase64);
        }
      }
      
      const finalPostData = submittedPostData + appendPostData;
      let uri = null;
      const output = [];
      submitPoll(finalPostData)
      .then(data => {
        uri = data[0].results_url;
      })
      .then(() => getPollByUri(uri))
      .then(data => output.push(data[0]))
      .then(() => getResponsesByUri(uri))
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