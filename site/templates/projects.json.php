<!-- /site/templates/projects.json.php -->
<?php

$html = '';

foreach($projects as $project) {

  // reuse the project snippet to create the HTML for each project
  // we need to set the third parameter to true, to return the
  // snippet content instead of echoing it
  $html .= snippet('project', compact('project'), true);

}

// add $html and $more to the $data array
$data['html'] = $html;
$data['more'] = $more;

// JSON encode the $data array
echo json_encode($data);