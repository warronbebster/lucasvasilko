$(function(){

  var element = $('.images');
  var load_element = $('.load_more');
  var url_json     = element.data('page') + '.json';
  var limit   = parseInt(element.data('limit'));
  var offset  = limit;
  // variables for AJAX

  Barba.Pjax.start();
  Barba.Prefetch.init(); //prefetch content on link hover

  Barba.Dispatcher.on('newPageReady', function(currentStatus) { //when the new content is injected
    console.log(currentStatus);
    url_json = currentStatus.url + '.json'; //update url var to send to ajax
  });

  Barba.Dispatcher.on('transitionCompleted', function(currentStatus) { //when the Barba transition is totally done

    element = $('.images');
    load_element = $('.load_more');
    console.log(load_element);
    offset = limit;


  });

  var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
          /**
           * This function is automatically called as soon the Transition starts
           * this.newContainerLoading is a Promise for the loading of the new container
           * (Barba.js also comes with an handy Promise polyfill!)
           */

          // As soon the loading is finished and the old page is faded out, let's fade the new page
          Promise
              .all([this.newContainerLoading, this.fadeOut()])
              .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
          /**
           * this.oldContainer is the HTMLElement of the old Container
           */

          return $(this.oldContainer).animate({ opacity: 0 }, 200).promise();
      },

      fadeIn: function() {
          /**
           * this.newContainer is the HTMLElement of the new Container
           * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
           * Please note, newContainer is available just after newContainerLoading is resolved!
           */

          var _this = this;
          var $el = $(this.newContainer);

          $(this.oldContainer).hide();

          $el.css({
              visibility: 'visible',
              opacity: 0
          });

          $el.animate({ opacity: 1 }, 200, function() {
              /**
               * Do not forget to call .done() as soon your transition is finished!
               * .done() will automatically remove from the DOM the old Container
               */

              _this.done();
          });
      }
  });

  Barba.Pjax.getTransition = function() {
      /**
      * Next step, you have to tell Barba to use the new Transition
      */

      /**
      * Here you can use your own logic!
      * For example you can use different Transition based on the current page or link...
      */

      return FadeTransition;
  };





  $('#barba-wrapper').on('click', '.load_more',  function(e) {
    console.log(url_json);

    $.get(url_json, {limit: limit, offset: offset}, function(data) {

      if(data.more === false) { //if there aren't any more images to load, delete button
        load_element.hide();
      }

      element.children().last().after(data.html); //adds the pictures

      console.log('offset: ' + offset);
      console.log('limit ' + limit);
      offset += limit;

    });

  });


// something in this bit above isn't, like, resetting, when the ajax gets called
// I think it's something about the offset and limit and the controller




});