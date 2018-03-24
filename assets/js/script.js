$(function() {

    var element = $('.images');
    var scroll_element = $('.project');
    var url_json = element.data('page') + '.json';
    var limit = parseInt(element.data('limit'));
    var offset = limit;
    var more_images = true;
    var callable = true; //can I call the ajax?
    var on_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent); 
    var small_screen = window.innerWidth < 640; 
    var about_visible = false;
    var grid_active = false;
    var lightbox_active = false;
    var in_lightbox;
    var scroll_width = 80;
    var img_in_grid = $('img');


    
    
    // variables for AJAX
    
    $(window).resize(function() {
        small_screen = window.innerWidth < 640; 
    });

    update_scroll_width(500);
    console.log('elemnt withd start'+ element.width());
    console.log('scroll width start '+ scroll_width);


    Barba.Pjax.start(); 
    Barba.Prefetch.init(); //prefetch content on link hover

    Barba.Dispatcher.on('newPageReady', function(currentStatus) { //when the new content is injected
        console.log(currentStatus);
        url_json = currentStatus.url + '.json'; //update url var to send to ajax
    });

    Barba.Dispatcher.on('transitionCompleted', function(currentStatus) { //when the Barba transition is totally done

      reload_functions();

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
      // console.log('element width ' + element.width());

      // console.log(scroll_element.scrollLeft() + (window.innerWidth*1.5));
      // console.log('scroll width ' + scroll_width);

      if (this.scrollLeft + (window.innerWidth*2) > scroll_width){
        console.log('reach call point!');
        //if you're close to the end of the scroll
        if(callable){ //if it hasn't been called for this scroll event yet
          call_images(url_json);
        }
      }
    });




    $('#name_mobile').click(function(){ //when u click "lucas vasilko" on mobile
      if(small_screen){ //if small screen
        // event.preventDefault();
        $('.header').toggleClass('header_open');
      }
    });

    $('li a').click(function(event){ //makes menu disappear on mobile when you click a project
      console.log('ssss');
      if(small_screen){ //if small screen
        $('.header').toggleClass('header_open');
        console.log('link clicked!');
      }
    });


    $('#name').mouseenter(function(){ //makes menu appear when you hover over name
        if(!about_visible && !small_screen){
          $('.header').toggleClass('header_open');
          about_visible = true;
        }
        
    });

    $('.header').mouseleave(function(){ //makes menu disappear when you leave the area
        if(about_visible && !small_screen){
          $('.header').toggleClass('header_open');
          about_visible = false;
        }
    });

    $('#night_mode').click(function(){
        $('html').toggleClass('night_mode');
        $('header').toggleClass('night_mode');
        $('figure').toggleClass('night_mode');
    });
    
    $('#grid').click(function(){
      call_images(url_json, 1500);
      grid_active = !grid_active;
      // $('#image_holder').toggleClass('flexy');
      $('#image_holder').toggleClass('grid');
      $('#grid_svg').toggleClass('displaynone');
      $('#box_svg').toggleClass('displaynone');
    });

    $('#load_more').click(function(){ //when u click the load more button
      if (more_images){
        call_images(url_json);
      }
    });


    // $('img').click(function(){
    //   console.log('image!');
    //   if(grid_active){
    //     console.log('grid!');
    //     console.log($(this.parentElement));

    //     $(this.parentElement).toggleClass('lightbox');
    //   }
    // });

    //when u click an image 
    $('#barba-wrapper').on('click', 'img', function(e, delta) {
      console.log('image!');
      if(grid_active){ //if the grid is on
        lightbox_active = !lightbox_active;
        in_lightbox = this.parentElement.parentElement;
        console.log('grid!');
        console.log($(this.parentElement.parentElement));

        $(this.parentElement).toggleClass('lightbox');
      }
    });



    //NAMED FUNCTIONS

    function call_images(jsonurl, delay = 500) {
        console.log(jsonurl);
        callable = false;
        if(more_images){//if there are more images to load
          $.get(jsonurl, { limit: limit, offset: offset }, function(data) {

              if (data.more === false) { //if there aren't any more images to load, delete button
                  // $('#load_more').hide();
                  console.log('no more!');
                  more_images = false;
                  //some code here to update #load_more
                  $('#load_more span').html("You've reached the end.");
              }

              element.children().last().before(data.html); //adds the pictures

              console.log('offset: ' + offset);
              console.log('limit ' + limit);
              offset += limit;
              console.log(delay);
              update_scroll_width(delay);

              // $('img').click(function(){
              //   console.log('image!');
              //   if(grid_active){
              //     console.log('grid!');
              //     console.log($(this.parentElement));

              //     $(this.parentElement).toggleClass('lightbox');
              //   }
              // });

          });
        }
    };

    //update-scroll-width
    function update_scroll_width(delay){
      setTimeout(function(){  //wait for a sec for the images to settle
        scroll_width = 80; //start with the padding

        // checkwidth = element.offsetWidth;
        console.log(element[0].offsetWidth);

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
          console.log('scroll_width: ' + scroll_width);
        } else {
          for (var i = 0; i < $('.image_container').length; i++) {
            scroll_width += $('.image_container')[i].offsetWidth;
          }
        }


        callable = true;
      }, delay);
    }


    //reload functions
    function reload_functions(){


      scroll_element = $('.project');
      element = $('.images'); //reset variables to new elements that have loaded
      offset = limit; //this resets the offset it grabs images from ajax
      grid_active = false;
      more_images = true;
      update_scroll_width();



      scroll_element.scroll(function() { //this is what makes it work when you switch barbas
        if (this.scrollLeft + (window.innerWidth*2) > scroll_width){
          console.log('reach call point!');
          if(callable){ //if it hasn't been called for this scroll event yet
            call_images(url_json);
          }
        }
      });

      // $('img').click(function(){
      //   console.log('image!');
      //   if(grid_active){
      //     console.log('grid!');
      //     console.log($(this.parentElement));

      //     $(this.parentElement).toggleClass('lightbox');
      //   }
      // });


    }



//end of document ready
});


