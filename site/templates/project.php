<?php snippet('header') ?>

  <main class="main" role="main">
    


    
    <div class="project" >



      <?php if (! $page->text()->empty()): ?>
        <div class="project_text side_scroll">
          <?= $page->text()->kirbytext() ?>
        </div>
      <?php endif ?>



      <div class="images side_scroll" id="image_holder" data-page="<?= $page->url() ?>" data-limit="<?= $limit ?>">
        <!-- <div id="measure"> -->
          <?php foreach($images as $image): ?>
            <?php snippet('image', compact('image')) ?>
          <?php endforeach ?>
        <!-- </div> -->
      </div>
      
      <!-- <button class="load_more side_scroll">Load more</button> -->

    </div>


    
    <!-- <?php snippet('prevnext') ?> -->

  </main>

<?php snippet('footer') ?>