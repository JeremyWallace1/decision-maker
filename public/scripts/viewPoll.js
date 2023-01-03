$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults, alreadyAnswered) => { 
    // console.log(`poll info: ${JSON.stringify(poll.config)}`);
    const origin = window.location.origin;
    const sharingUrl = origin.concat('/?', poll.config.sharing_url);
    const resultsUrl = origin.concat('/?', poll.config.results_url);
    
    const pollUrlData = {};
    pollUrlData.sharing = {
      title: 'Share poll',
      url: sharingUrl,
      enable: true,
    };
    pollUrlData.results = {
      title: 'View poll results',
      url: resultsUrl,
      enable: showResults,
    };
    
    let buffer = ``;
    if (alreadyAnswered === true && showResults === false) {
      buffer += `
      <div class="row">
        <h1 class="" id="alreadyAnsweredAlert">
          You've submitted your choices in this poll.
        </h1>
      </div>
      `
    }

    buffer += `
      <article class="poll" id="poll_${poll.config.id}">
      <header class="poll_heading">
  
          <div class="row">
            <h1 class="display-4" id="question${poll.config.id}">
              ${poll.config.question}
            </h1>
          </div>
      
          ${generateQuestionImgHTML(poll.config.image)}
  
          <div class="row">
            <p class="col-md-12" id="description${poll.config.id}">
              ${poll.config.description}
            </p>
          </div>

          <hr class="major">
          <div class="row" id="resultsArea" hidden>
            <canvas id="resultsChart"></canvas>
          </div>
          <hr class="major" id="resultsHr" hidden>

        </header>
      
        ${generateChoicesHTML(poll, showResults)}

        <footer class="poll_footer row mb-3">
          ${generateLinkHTML('share', pollUrlData.sharing)}
          ${generateLinkHTML('results', pollUrlData.results)}
        </footer>
      </article>
    `;
    return buffer;
  }

  window.poll.createPoll = createPoll;

  const getScore = (choiceId = 0, data) => {
    const scoreData = data.filter(scoreData => scoreData.choice_id === choiceId);
    const score = scoreData[0] ? scoreData[0].scoring : 0;
    return score;
  }

  const generateQuestionImgHTML = (imageSrc) => {
    if (!imageSrc) {
      return '';
    }
    return `
    <div class="row my-3" id="img-preview-question">
      <div class="col">
        <img src="${imageSrc}" class="img-fluid img-thumbnail mx-auto d-block question img-preview" />
      </div>
    </div>
    `
  };

  const generateChoicesHTML = (poll, showResults) => {
    const imagePoll = isImagePoll(poll);
    let buffer = '';

    for (const choice in poll.choices) {
      // Make a deep copy of the choices object
      const choiceData = JSON.parse(JSON.stringify(poll.choices[choice]));
      const score = getScore(choiceData.id, poll.scores);
      choiceData.score = score;
      choiceData.showScore = showResults;

      if (!imagePoll) {
        buffer += `
        <div class="row">
          ${generateTextChoiceHTML(choiceData)}
        </div>`;
      } else {
        buffer += generateImageChoiceHTML(choiceData);
      }
    }

    if (imagePoll) {
      buffer = `
        <div class="d-flex flex-wrap align-items-stretch">
          ${buffer}
        </div>`;
    }

    return buffer;
  }

  const generateTextChoiceHTML = (data) => {
    return ` 
      <div class="col">
        <h3 id="choice${data.id}">${data.title}</h3>
        <p id="description${data.id}">${data.description}</p>
        ${data.showScore ? `<h6>Current score: ${data.score}</h6>` : ''}
      </div>
      <hr class="minor">
    `;
  }

  const generateImageChoiceHTML = (data) => {
    let imageHTML = '';
    if (!data.image) {
      imageHTML += `
        <div class="flex-grow-1 d-flex justify-content-center align-items-center">
          <i class="fa-solid fa-image fa-3x"></i>
        </div>`;
    } else {
      imageHTML += `<img src="${data.image}" class="w-100 flex-grow-1 overflow-hidden rounded" />`;
    }

    return `
      <div class="d-flex item-outer col-sm-4 col-md-3">
        <div class="item-inner d-flex flex-column mx-2 my-2 p-1 rounded bg-light text-dark text-center w-100">
          ${imageHTML}
          <h6 class="mb-0">${data.title}</h6>
        </div>
      </div>
    `;
  }

  const generateLinkHTML = (linkType, data) => {
    if (!data.enable) {
      return '';
    }
    const linkTypeCapitalized = linkType[0].toUpperCase() + linkType.substring(1).toLowerCase();
    return `
      <h6 class="poll_${linkType}_url">
        ${data.title}: &nbsp;&nbsp;<a href='${data.url}' class="${linkType}Url" title='${data.title}'>${data.url}</a>
        <button type="button" class="button button-small" id="copy${linkTypeCapitalized}Url" onclick="copyUrl('${data.url}')"><i class="fa-solid fa-copy fa-lg"></i></i></button>
      </h6>
    `;
  }

  const isImagePoll = (poll) => {
    const images = poll.choices.filter(element => element.image);
    const foundImages = images.length > 0;
    return foundImages;
  }

});
