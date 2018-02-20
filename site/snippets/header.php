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

  <header class="header" role="banner">

      <div class="menu_element" id="name">
        <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a>
      </div>

      <?php snippet('menu2') ?>

      <div class="menu_element" id="grid">
        <!-- <a> -->
        <svg id="grid_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 45"><path d="M17.59,6.06v6.06H7.76V6.06h9.83m2-2H5.76V14.12H19.59V4.06Z"/><path d="M17.59,19.47v6.06H7.76V19.47h9.83m2-2H5.76V27.53H19.59V17.47Z"/><path d="M17.59,32.88v6.06H7.76V32.88h9.83m2-2H5.76V40.94H19.59V30.88Z"/><path d="M34.91,6.06v6.06H25.09V6.06h9.83m2-2H23.09V14.12H36.91V4.06Z"/><path d="M34.91,19.47v6.06H25.09V19.47h9.83m2-2H23.09V27.53H36.91V17.47Z"/><path d="M34.91,32.88v6.06H25.09V32.88h9.83m2-2H23.09V40.94H36.91V30.88Z"/><path d="M52.24,6.06v6.06H42.41V6.06h9.83m2-2H40.41V14.12H54.24V4.06Z"/><path d="M52.24,19.47v6.06H42.41V19.47h9.83m2-2H40.41V27.53H54.24V17.47Z"/><path d="M52.24,32.88v6.06H42.41V32.88h9.83m2-2H40.41V40.94H54.24V30.88Z"/></svg>
        
        <svg id="box_svg" class="displaynone" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 45"><title>Artboard 23</title><path d="M28,5.93V39.07H7.76V5.93H28m2-2H5.76V41.07H30V3.93Z"/><path d="M52.24,5.93V39.07H36.38V5.93H52.24m2-2H34.38V41.07H54.24V3.93Z"/></svg>
        <!-- </a> -->
      </div>
      <div class="menu_element cf" id="night_mode">
        <svg id="light_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.25 45"><path d="M26,5.93V39.07H5.83V5.93H26m2-2H3.83V41.07H28V3.93Z"/><path d="M11.44,23.5A1,1,0,0,1,10.57,22l5.52-10a1,1,0,0,1,.88-.52h9A1,1,0,0,1,26.8,13L21.28,23a1,1,0,0,1-1.75-1l4.71-8.53H17.56L12.32,23A1,1,0,0,1,11.44,23.5Z"/><path d="M25.93,13.48H17a1,1,0,0,1-.91-.58L14.37,9.25a1,1,0,0,1,.91-1.42h9a1,1,0,0,1,.91.58l1.69,3.65a1,1,0,0,1-.91,1.42Zm-8.32-2h6.76L23.6,9.83H16.84Z"/><path d="M11.44,23.5a1,1,0,0,1-.25,0,1,1,0,0,1-.75-1V15.78a1,1,0,0,1,.12-.48L14.4,8.35a1,1,0,0,1,.91-.52,1,1,0,0,1,.87.58l1.69,3.65a1,1,0,0,1,0,.9L12.32,23A1,1,0,0,1,11.44,23.5Zm1-7.47v2.58l3.4-6.17L15.2,11Z"/><path d="M20.4,23.5h-9a1,1,0,0,1,0-2h9a1,1,0,0,1,0,2Z"/><path d="M19.4,22.5v9h-7v-18h.62v-2H11.44a1,1,0,0,0-1,1v20a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1v-10Z"/></svg>
      </div>

      <div id="about"><?= $site->description()->kirbytext() ?></div>

  </header>


  <div id="barba-wrapper">
    <div class="barba-container">
      <!-- ^this opens the barba containers -->
