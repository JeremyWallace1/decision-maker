$(() => {
  window.poll = {};
  // TO DO: toggle whether email should show as part of the poll info
  const createPoll = (poll, showResults) => { 
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
    buffer += `
      <article class="poll" id="poll_${poll.config.id}">
      <header class="poll_heading">
        <div class="row mb-2"></div>
          <div class="row mb-3">
            <h5 id="email${poll.config.id}">${poll.config.creator_email} has asked a question...</h5>
          </div>

          <hr>
  
          <div class="row">
            <h4 class="col-md-2" id="labelQuestion${poll.config.id}">
              Question:
            </h4>
            <h4 class="col-md-10" id="question${poll.config.id}">
              ${poll.config.question}
            </h4>
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
      
        ${generateAnswersHTML(poll, showResults)}

        <footer class="poll_footer row mb-3">
          ${generatePollLinkHTML('share', pollUrlData.sharing)}
          ${generatePollLinkHTML('results', pollUrlData.results)}
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

  const generateAnswersHTML = (poll, showResults) => {
    const imagePoll = isImagePoll(poll);
    console.log('image poll? ', imagePoll);
    let buffer = '';
    let num = 0;
    for (const choice in poll.choices) {
      num++;
      const choiceId = poll.choices[choice].id;
      const score = getScore(choiceId, poll.scores)

      buffer += `
      
      <div class="row">
        <h5 class="col-md-2" id="labelAnswer${poll.choices[choice].id}">Answer #${num}:</h5>
        <h6 class="col-md-10" id="answer${poll.choices[choice].id}">${poll.choices[choice].title}</h6>
      </div>
  
      <div class="row">
        <p class="col-md-12" id="description${poll.choices[choice].id}">${poll.choices[choice].description}</p>
      </div>

      <div class="row mb-12">
        ${showResults ? 
          `<h6>Current score: ${score}</h6>` 
          : ``}
      </div>

      <hr class="minor">

      `
    }

    return buffer;
  }

  const generatePollLinkHTML = (linkType, data) => {
    if (!data.enable) {
      return '';
    }
    const linkTypeCapitalized = linkType[0].toUpperCase() + linkType.substring(1).toLowerCase();;
    return `
      <h6 class="poll_${linkType}_url">
        ${data.title}: &nbsp;&nbsp;<a href='${data.url}' class="${linkType}Url" title='${data.title}'>${data.url}</a>
        <button type="button" class="button button-small" id="copy${linkTypeCapitalized}Url" onclick="copyUrl('${data.url}')"><i class="fa-solid fa-copy"></i></i></button>
      </h6>
    `;
  }

  const isImagePoll = (poll) => {
    const images = poll.choices.filter(element => element.image);
    const foundImages = images.length > 0;
    return foundImages;
  }

  const capitalize = (string) => {
    const lowerCaseWord = string.toLowerCase();
    const upperCaseFirstLetter = string[0].toUpperCase();
    return upperCaseFirstLetter + lowerCaseWord.slice(1);
  }

});
