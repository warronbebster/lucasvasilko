$(function() {

    var element = $('.images');
    var scroll_element = $('.project');
    var url_json = element.data('page') + '.json';
    var limit = parseInt(element.data('limit'));
    var offset = limit;
    var callable = true; //can I call the ajax?
    var on_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent); 
    var small_screen = window.innerWidth < 640; 
    var about_visible = false;
    var grid_active = false;
    var scroll_width = 80;

    
    
    // variables for AJAX
    
    $(window).resize(function() {
        small_screen = window.innerWidth < 640; 
    });

    update_scroll_width(500);
    console.log('elemnt withd start'+element.width());
    console.log('scroll width start '+scroll_width);


    Barba.Pjax.start(); 
    Barba.Prefetch.init(); //prefetch content on link hover

    Barba.Dispatcher.on('newPageReady', function(currentStatus) { //when the new content is injected
        console.log(currentStatus);
        url_json = currentStatus.url + '.json'; //update url var to send to ajax
    });

    Barba.Dispatcher.on('transitionCompleted', function(currentStatus) { //when the Barba transition is totally done

      scroll_element = $('.project');
      element = $('.images'); //reset variables to new elements that have loaded
      offset = limit; //this resets the offset it grabs images from ajax
      update_scroll_width();


      scroll_element.scroll(function() { //this is what makes it work when you switch barbas
        if (this.scrollLeft + (window.innerWidth*2) > scroll_width){
          if(callable){ //if it hasn't been called for this scroll event yet
            call_images(url_json);
          }
        }
      });


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





    // $('#barba-wrapper').on('click', '.load_more', function(e) {
    //     call_images(url_json);
    // });


    if(!on_mobile){ //if it's a computer
      $('#barba-wrapper').on('mousewheel', '.project', function(e, delta) {
        if ( Math.abs(e.deltaY) > Math.abs(e.deltaX) ){ //if you're scrolling more vertically than horizontally
          // console.log("deltaY: " + e.deltaY);
          this.scrollLeft -= (e.deltaY * 1);
          e.preventDefault(); //prevent normal scroll
        }
      });
    };




    scroll_element.scroll(function() { //gotta get this to work when you switch to a new one
      // console.log(element.width());
      // console.log($('.image_container'));
      console.log(scroll_element.scrollLeft() + (window.innerWidth*2));
            console.log('element width ' + element.width());
            console.log('scroll width ' + scroll_width);

      if (this.scrollLeft + (window.innerWidth*2) > scroll_width){
        //if you're close to the end of the scroll
        if(callable){ //if it hasn't been called for this scroll event yet
          call_images(url_json);
        }
      }
    });




    

    if(small_screen){ //if small screen

    } else { //if big screen
      $('#name').mouseenter(
        function(){
          if(!about_visible){
            $('.header').toggleClass('header_open');
            about_visible = true;
          }
          
        });
      $('.header').mouseleave(
        function(){
          if(about_visible){
            $('.header').toggleClass('header_open');
            about_visible = false;
          }
        });
    }

    $('#night_mode').click(function(){
        $('html').toggleClass('night_mode');
        $('header').toggleClass('night_mode');
    });
    
    $('#grid').click(function(){
      call_images(url_json, 1500);
      grid_active = !grid_active;
      $('#image_holder').toggleClass('grid');
    });



    //NAMED FUNCTIONS

    function call_images(jsonurl, delay = 500) {
        console.log(jsonurl);
        callable = false;

        $.get(jsonurl, { limit: limit, offset: offset }, function(data) {

            if (data.more === false) { //if there aren't any more images to load, delete button
                // load_element.hide();
            }

            element.children().last().after(data.html); //adds the pictures

            console.log('offset: ' + offset);
            console.log('limit ' + limit);
            offset += limit;
            console.log(delay);
            update_scroll_width(delay);
            
        });
    };

    function update_scroll_width(delay){
      setTimeout(function(){  //wait for a sec for the images to settle
        scroll_width = 80; //start with the padding

        if(grid_active){
          //every 4 images
          var test = 0;
          for (var i = 0; i < $('.image_container').length; i++) {
            var test_this_width = $('.image_container')[i].offsetWidth;

            if ( test_this_width > test){
              test = test_this_width;
            }

            if(i%4 == 0){
              console.log(test);
              scroll_width += test;
              test = 0;
            }
            
          }
        }else{
          for (var i = 0; i < $('.image_container').length; i++) {
            scroll_width += $('.image_container')[i].offsetWidth;
          }
        }
        callable = true;
      }, delay);
    }



//end of document ready
});


