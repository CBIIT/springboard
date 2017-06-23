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
		<div class="col-lg-9">
			<?php print $content['pagetitle']; ?>
			<?php print $content['pageintro']; ?>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->

<div class="list-of-links">
<div class="container">
	<div class="row">
		<?php print $content['linklist']; ?>
	</div> <!-- end row -->
</div> <!-- end container -->
</div> <!-- end list-of-links -->