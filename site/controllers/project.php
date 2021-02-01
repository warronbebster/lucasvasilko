<?php

return function($site, $pages, $page) {
  $limit = 16;
  $images = $page->images()->sortBy('sort', 'asc')->limit($limit);
  //the above line is what needs to grab all the children images
  
  return [
    'limit'       => $limit,
    'images'      => $images,  
  ];
};