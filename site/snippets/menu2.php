<nav class="navigation column" role="navigation">
  <ul class="menu">
    <?php foreach(page('projects')->children()->visible() as $item): ?>
	    <li class="menu-item">
	      <a href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
	    </li>
    <?php endforeach ?>
  </ul>
</nav>