$(() => {

  const $formPollRespond = $(`
  <form action="/polls" method="POST" id="create-poll">
    <h1>Respond to a poll</h1>
    <h2>View TBC</h2>
  </form>
  `);

  window.$formPollRespond = $formPollRespond;

  $formPollRespond.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

  });
});