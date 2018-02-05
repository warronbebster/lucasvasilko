<?php snippet('header') ?>


  <main class="main" role="main">
    

    <div class="text wrap">
      <?= $page->text()->kirbytext() ?>
    </div>
  
    <section class="projects-section">
      
      <div>
        <h2>Latest Projects</h2>

        <?php snippet('showcase2', array('filter' => 'projects/places')) ?>

        <!-- <p class="projects-section-more"><a href="<?= page('projects')->url() ?>" class="btn">show all projects &hellip;</a></p> -->
      </div>
      
    </section>

  </main>

<?php snippet('footer') ?>