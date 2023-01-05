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
            <p class="col-12" id="description${poll.config.id}">
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
  };

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

      const titleHTML = `<h3 id="choice${choiceData.id}">${choiceData.title}</h3>`;
      const choiceDescHTML = `<p id="description${choiceData.id}">${choiceData.description}</p>`;
      const choiceScoreHTML = `${choiceData.showScore ? `<h6>Current score: ${choiceData.score}</h6>` : ''}`;
      const choiceImageHTML = `<img src="${choiceData.image}" class="choiceImage rounded" />`;

      buffer += `
        <div class="row col-12 choiceRow">
        ${choiceData.image ? 
          `
          <div class="col-sm-9 choiceTitle">
            ${titleHTML}
            <div class="d-none d-sm-block col-sm-9 choiceDescription">
              ${choiceDescHTML}
            </div> 
            ${choiceScoreHTML}
          </div>
          <div class="d-none d-sm-block col-sm-3 imageBox">
            ${choiceImageHTML}
          </div>` : 
          `
          <div class="col-sm-12 choiceTitle">
            ${titleHTML}
            <div class="d-none d-sm-block col-sm-12 choiceDescription">
              ${choiceDescHTML}
            </div> 
            ${choiceScoreHTML}
          </div>
          `}
        </div>
        <hr class="minor"></hr>
      `;
    };
    return buffer;
  };

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
  };

  const isImagePoll = (poll) => {
    const images = poll.choices.filter(element => element.image);
    const foundImages = images.length > 0;
    return foundImages;
  };

});
