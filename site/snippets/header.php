<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?= css('assets/css/index.css') ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/barba.js/1.0.0/barba.min.js" type="text/javascript"></script>


</head>
<body>

  <header class="header wrap wide" role="banner">
    <div class="grid">

      <div class="branding column">
        <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a>
      </div>

      <?php snippet('menu2') ?>

    </div>
  </header>


  <div id="barba-wrapper">
    <div class="barba-container">
      <!-- ^this opens the barba containers -->
