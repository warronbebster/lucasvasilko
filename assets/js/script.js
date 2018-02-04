$(function(){

  var element = $('.project');
  var url     = element.data('page') + '.json';
  var limit   = parseInt(element.data('limit'));
  var offset  = limit;

  $('.load-more').on('click', function(e) {
    console.log('clicked');

    $.get(url, {limit: limit, offset: offset}, function(data) {

      if(data.more === false) { //if there aren't any more images to load, delete button
        $('.load-more').hide();
      }

      element.children().last().after(data.html);

      offset += limit;

    });

  });

});