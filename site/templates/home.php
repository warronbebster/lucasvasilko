<?php snippet('header') ?>


  <main class="main" role="main">

    <div class="project" >


      <?php if (! $page->text()->empty()): ?>
        <div class="project_text side_scroll">
          <?= $page->text()->kirbytext() ?>
        </div>
      <?php endif ?>


<!--  here we're calling the "projects" json representation because the home one breaks on url requests -->
      <div class="images side_scroll" id="image_holder" data-page="<?= $page->url() ?>" data-limit="<?= $limit ?>">
          <?php foreach($images as $image): ?>
            <?php snippet('image', compact('image')) ?>
          <?php endforeach ?>

          <div class="image_container side_scroll" id="load_more" accesskey="m">
            <span>Load some more images, please</span>
          </div>

      </div>



    </div>

  </main>

<?php snippet('footer') ?>