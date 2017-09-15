<?php
/**
 * @file
 * Template for homepage panel layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout.
 *
 */
?>
<div class="homepage">
<div class="homepage-hero">
<div class="container">
	<div class="row">
		<div class="col-md-9">
			<?php print $content['hero-intro']; ?>
		</div>
	</div>
	<div class="row">
        <div class="col-md-6">
            <!-- Region for Youtube Video -->
            <?php print $content['hero-video']; ?>
        </div> <!-- end column -->
		<div class="col-md-6 is-table-row">
            <div class="col-md-6">
                <?php print $content['hero-fact1']; ?>
            </div>
            <div class="col-md-6">
                <?php print $content['hero-fact2']; ?>
            </div>
            <div class="col-md-6">
                <?php print $content['hero-fact3']; ?>
            </div>
            <div class="col-md-6">
                <?php print $content['hero-fact4']; ?>
            </div>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->
</div> <!-- end homepage-hero -->
<div class="hero-image-bottom-shadow"></div>

<div class="container">
	<section class="infographic">
	<?php print $content['infographic']; ?>
	</section> <!-- end infographics -->
	<section class="decks">
	<div class="row">
		<div class="col-lg-12">
			<?php print $content['deckpreview']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
	</section> <!-- end decks preview -->
	<div class="row">
		<div class="col-lg-12">
			<hr>
		</div> <!-- end column -->
	</div> <!-- end row -->
	<section class="additional-resources">
	<div class="row">
		<div class="col-lg-12">
			<?php print $content['additional-resources-title']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
	<div class="row">
		<div class="col-md-9">
			<div class="row">
                <div class="col-xs-3 top-border-yellow"></div>
                <div class="col-xs-3 top-border-purple"></div>
                <div class="col-xs-3 top-border-blue"></div>
                <div class="col-xs-3 top-border-green"></div>
				<?php print $content['additional-resources-video2']; ?>
			</div> <!-- end row -->
			<div class="row">
				<?php print $content['additional-resources-video3']; ?>
			</div> <!-- end row -->
			<div class="row">
				<?php print $content['link-to-videos']; ?>
			</div> <!-- end row -->	
		</div> <!-- end column -->
		<div class="col-md-3">
		<?php print $content['additional-resources-poll']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
	</section> <!-- end additional-resources -->
</div> <!-- end container -->
</div> <!-- end homepage class -->