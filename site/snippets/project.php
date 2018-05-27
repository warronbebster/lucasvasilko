<li class="project">
  <a href="<?= $project->url() ?>" class="project-link">
    <!-- We want to get the first image of each project. We first check if it exists! -->
    <?php if($image = $project->image()): ?>
    	<img src="<?= $image->url() ?>" alt="<?= $image->alt_text()->html() ?>" />
    <?php endif ?>
    <div class="project-caption">
      <h2 class="project-title"><?= $project->title()->html() ?></h2>
    </div>
  </a>
</li>