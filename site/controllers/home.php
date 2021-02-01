<?php

return function($site) {


  $images = $site->homePage()->images()->sortBy('sort', 'asc');;
  //the above line is what needs to grab all the children images
  $count = $images->count();


    $offset   = 0;
    $limit    = 16;
    $images = $images->limit($limit);
    $more = $count > $offset + 1; //idk does this help?
  
    return [
      'limit'       => $limit,
      'images'      => $images,  
      'offset'     => $offset,  
      'more'        => $more,  
    ];
};