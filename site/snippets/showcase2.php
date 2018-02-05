<?php

$projects = page('projects')->children()->visible();

// if(isset($limit)) $projects = $projects->limit($limit);

//if the filter is set, make filterProjecs an adjusted version of projects. If not, just make it a clone.

if(isset($filter)) {
  $filterProjects = array($projects->get($filter));
} else {
  $filterProjects = $projects;
}

//CHANGE THIS TO USE filterBy

// $filterProjects = $projects->get($filter);

// $projects = $projects->get($filter);

/*

The $limit parameter can be passed to this snippet to
display only a specified amount of projects:

```
<?php snippet('showcase', ['limit' => 3]) ?>
```

Learn more about snippets and parameters at:
https://getkirby.com/docs/templates/snippets

*/

// if(!is_array($filterProjects)) $filterProjects = array($filterProjects);

// if(!is_array($projects)) $projects = array($projects);

// ^if filterProjects isn't an array and can't be iterated over, make it an array

?>







<ul class="showcase grid gutter-1">

  <?php foreach($filterProjects as $project): ?>

    <li class="showcase-item column">
        <!-- <a href="<?= $project->url() ?>"> -->

          <?php
          // Images for the "project" template are sortable. You
          // can change the display by clicking the 'edit' button
          // above the files list in the sidebar.
          foreach($project->images()->sortBy('sort', 'asc') as $image): ?>
            <?php snippet('image', compact('image')) ?>
          <?php endforeach ?>

        <!-- </a> -->
    </li>



  <?php endforeach ?>

</ul>