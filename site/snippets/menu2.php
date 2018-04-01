<ul class="menu menu_element">
	<!-- link home for mobile -->

	<?php foreach(page('projects')->children()->visible() as $item): ?>
	    <li class="menu-item">
			<a href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
	    </li>
	<?php endforeach ?>
</ul>