<?php

return function($site, $pages, $page) {

  // $projects = $page->children()->visible();
  // $count    = $projects->count();

  $images = $site->homePage()->images();


  //the above line is what needs to grab all the children images
  // or, just put images that go on the home page in the "home" page folder...

  $count = $images->count();

  // check if the request is an Ajax request and if the limit and offset keys are set
  if(r::ajax() && get('offset') && get('limit')) {

    // convert limit and offset values to integer
    $offset = intval(get('offset'));
    $limit  = intval(get('limit'));

    // limit images using offset and limit values
    $images = $images->offset($offset)->limit($limit);

    // check if there are more images left
    $more = $count > $offset + 1;

  // otherwise set the number of images initially displayed
  } else {

    $offset   = 0;
    $limit    = 16;
    $images = $images->limit($limit);

  }

  return compact('offset', 'limit', 'images', 'more');

};