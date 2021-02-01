<?php

header("Access-Control-Allow-Origin: *");

foreach($images as $image) {
  $html .= snippet('image', compact('image'), true);
}

// add $html and $more to the $data array
$data['html'] = $html;
$data['more'] = $more;

// JSON encode the $data array
echo json_encode($data);