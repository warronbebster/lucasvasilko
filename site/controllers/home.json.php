<?php

return function ($page) {

  $limit      = 16;
  $images = $site->homePage()->images()->sortBy('sort', 'asc');;
  //the above line is what needs to grab all the children images
  $count = $images->count();
  $more = $count > $offset + 1; //idk does this help?


  return [
      'images' => $projects,
      'more'     => $more,
      'html'     => '',
      'json'     => [],
    ];
};


