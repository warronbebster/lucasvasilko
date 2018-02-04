<?php snippet('header') ?>

  <main class="main" role="main">
    

    
    <?= $page->text()->kirbytext() ?>
    
    <div class="project" data-page="<?= $page->url() ?>" data-limit="<?= $limit ?>" >
      

      <?php foreach($images as $image): ?>
        <?php snippet('image', compact('image')) ?>
      <?php endforeach ?>
      
    </div>

    <button class="load-more">Load more</button>
    
    <!-- <?php snippet('prevnext') ?> -->

  </main>

<?php snippet('footer') ?>