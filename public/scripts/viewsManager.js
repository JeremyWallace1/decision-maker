$(() => {
  
  const $main = $('main');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $formPollNew.detach();
    $formPollRespond.detach();
    $polls.detach();

    switch (item) {
      case 'pollNew':
        $formPollNew.appendTo($main);
        break;
      case 'polls':
        $polls.appendTo($main);
        console.log(`case ${item} activated...`)
        // document.getElementById("#chartContainer").innerHTML = `
        //   blah
        // `;
        // $('#chartContainer').clear();
        break
      case 'pollRespond':
        poll_respond.createForm(api.data);
        $formPollRespond.appendTo($main);
        console.log(`case ${item} activated...`)
        break
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('pollNew');
        }, 2000);
        
        break;
      }
    }
  }
  
});