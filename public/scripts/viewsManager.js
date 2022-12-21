$(() => {
  
  const $main = $('main');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $newPollForm.detach();

    switch (item) {
      case 'newPoll':
        $newPollForm.appendTo($main);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('newPoll');
        }, 2000);
        
        break;
      }
    }
  }
  
});