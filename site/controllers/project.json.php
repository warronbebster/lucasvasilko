<?php

return function ($site, $pages, $page) {

  // get offset paramater from url in format /offset:n with default 0 if it's not there
  $offset = param('offset', 0);
  $limit = param('limit', 16);

  $images = $page->images()->sortBy('sort', 'asc')->offset($offset)->limit($limit);

  $count = $page->images()->count();
  $more = $count > $offset + 1; //are there more images to load?
  
  return [
      'images'   => $images,
      'more'     => $more,
      'html'     => '',
      'json'     => [],
    ];
};


