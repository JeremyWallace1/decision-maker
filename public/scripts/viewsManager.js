$(() => {
  
  const $main = $('main');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $formPollNew.detach();

    switch (item) {
      case 'pollNew':
        $formPollNew.appendTo($main);
        break;
      case 'pollResults':
        $pollResults.appendTo($main);
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