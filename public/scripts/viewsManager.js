$(() => {
  
  const $main = $('main');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $formPollNew.detach();
    $formPollRespond.detach();
    $polls.detach();
    $newPollSuccessMessage.detach();

    switch (item) {
    case 'pollNew':
      $formPollNew.appendTo($main);
      break;
    case 'polls':
      $polls.appendTo($main);
      break;
    case 'pollNewSuccess':
      pollNewSuccess.createSuccessMessage(api.data);
      $newPollSuccessMessage.appendTo($main);
      break;
    case 'pollRespond':
      pollRespond.createForm(api.data);
      $formPollRespond.appendTo($main);
      break;
    case 'error': {
      const $error = $(`<p>${arguments[1]}</p>`);
      $error.appendTo('body');
      setTimeout(() => {
        $error.remove();
        viewsManager.show('pollNew');
      }, 2000);
      
      break;
    }
    }
  };
  
});