<div class="image_container">
	<figure>
		<img src="<?= $image->url() ?>" alt="<?= $image->caption()->html() ?>" />
		<!-- Only show caption if the caption field isn't empty -->
		<?php if($image->caption()->isNotEmpty()): ?>
			<figcaption><?= $image->caption()->html() ?></figcaption>
		<?php endif ?>
	</figure>
</div>
<!-- <br> -->