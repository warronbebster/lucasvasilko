<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json; charset=utf-8');

// $html = '';

foreach($images as $image) {

  $html .= snippet('image', compact('image'), true);

}

// add $html and $more to the $data array
$json['html'] = $html;
$json['more'] = $more;

// JSON encode the $data array
echo json_encode($json);