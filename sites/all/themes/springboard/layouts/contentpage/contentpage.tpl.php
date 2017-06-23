<?php
/**
 * @file
 * Template for panel layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout.
 *
 */
?>

<div class="container">
	<div class="row">
		<div class="col-lg-12">
			<?php print $content['pagetitle']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->


<div class="container">
	<div class="row">
		<div class="col-md-7 col-lg-8">
			<?php print $content['pagecontent']; ?>
		</div> <!-- end column -->
		<div class="col-md-5 col-lg-4 sidebar">
			<?php print $content['sidebar']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->