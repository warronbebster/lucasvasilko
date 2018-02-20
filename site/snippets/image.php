<div class="image_container">
	<figure>
		<img src="<?= $image->url() ?>" alt="<?= $image->caption()->html() ?>" />
		<figcaption><?= $image->caption()->html() ?></figcaption>
	</figure>
</div>
<!-- <br> -->