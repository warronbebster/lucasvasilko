<?php snippet('header') ?>

  <main class="main" role="main">
    


    
    <div class="project" >

      <div class="project_text side_scroll">
        <?= $page->text()->kirbytext() ?>
      </div>

      <div class="images side_scroll" data-page="<?= $page->url() ?>" data-limit="<?= $limit ?>">
        <?php foreach($images as $image): ?>
          <?php snippet('image', compact('image')) ?>
        <?php endforeach ?>
      </div>
      
      <button class="load_more side_scroll">Load more</button>

    </div>


    
    <!-- <?php snippet('prevnext') ?> -->

  </main>

<?php snippet('footer') ?>