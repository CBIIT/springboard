<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 */
?>
<header role="banner">
	<!-- SkipNav of Site -->
	<?php if (!empty($page['Springboard_SkipNav'])): ?>
    	<?php print render($page['Springboard_SkipNav']); ?>
    <?php endif; ?>

	<div class="container" id="header-row">
		<div class="row">
			<div class="col-sm-6 col-md-2">
				<?php if (!empty($page['Springboard_Logo'])): ?>
          			<?php print render($page['Springboard_Logo']); ?>
        		<?php endif; ?>
			</div> <!-- end column -->
			<div class="col-sm-12 col-md-10">
				<nav class="nav-container" role="navigation">
					<!-- Site Navigation -->
					<?php if (!empty($page['navigation'])): ?>
						<?php print render($page['navigation']); ?>
					<?php endif; ?>
					<!-- Link to Action Decks -->
					<?php if (!empty($page['Springboard_ActionDeck_Link'])): ?>
						<?php print render($page['Springboard_ActionDeck_Link']); ?>
					<?php endif; ?>
					<!-- Search Open and Close -->
					<?php if (!empty($page['Springboard_Search_Link'])): ?>
						<?php print render($page['Springboard_Search_Link']); ?>
					<?php endif; ?>
				</nav> <!-- end nav-container -->
			</div> <!-- end column -->
		</div> <!-- end row -->
	</div> <!-- end container -->
</header>

	<!-- Search Dropdown for Site -->
	<div id="search">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
        <?php
          $search_block = module_invoke('views', 'block_view', '-exp-springboard_search-page');
          print render($search_block['content']);
        ?>
			</div>
		</div>
		<div class="row search-extras">
			<div class="col-md-6">
				<?php if (!empty($page['Common_Symptoms'])): ?>
          			<?php print render($page['Common_Symptoms']); ?>
        		<?php endif; ?>
			</div> <!-- end column -->
			<div class="col-md-6">
				<?php if (!empty($page['Helpful_Tips'])): ?>
					<?php print render($page['Helpful_Tips']); ?>
				<?php endif; ?>
				<?php $block = module_invoke('boxes', 'block_view', 'random_helptips');
				if (!empty($block['content'])): ?>
					<style>
						.search-extras .col-md-6 > .boxes-box > .boxes-box-controls > ul.links {display: none;}
						.search-extras .col-md-6 > .boxes-box > .boxes-box-content > h3 {color:#fff !important;}
					</style>
				<?php print render($block['content']); ?>
				<?php endif; ?>
			</div> <!-- end column -->
		</div> <!-- end row -->
		<div class="row">
			<div class="col-lg-12 text-center">
				<button class="sr-only" id="close-search" aria-expanded="false">Close Search Overlay</button>
			</div> <!-- end column -->
		</div> <!-- end row -->
	</div> <!-- end container -->
	</div>
	<!-- End Search -->


<main id="main-content" role="main" tabindex="-1">
<?php print render($page['content']); ?>
</main>

<?php if (!empty($page['Springboard_Quiz_Banner'])): ?>
	<?php print render($page['Springboard_Quiz_Banner']); ?>
<?php endif; ?>

<footer role="contentinfo">
	<div class="container">
		<div class="row">
			<div class="col-md-5">
				<div class="sbc-logo-tagline">
					<a href="/"><img src="/sites/all/themes/springboard/images/SBC-logo-footer.png" alt="Springboard Beyond Cancer logo" id="sbc-footer-logo" class="border-right"></a>
					<p class="tagline">Manage Cancer — Your Way</p>
				</div>
				<div class="row">
					<div class="col-md-6">
						<?php if (!empty($page['Footer_Springboard_Links'])): ?>
          					<?php print render($page['Footer_Springboard_Links']); ?>
        				<?php endif; ?>
					</div> <!-- end col-md-6 -->
					<div class="col-md-6">
						<?php if (!empty($page['Footer_NCI_Links'])): ?>
          					<?php print render($page['Footer_NCI_Links']); ?>
        				<?php endif; ?>
					</div> <!-- end col-md-6 -->
				</div> <!-- end row -->
			</div> <!-- end col-md-5 -->
			<div class="col-md-1 visible-md-block visible-lg-block">
				<div class="divider-line"></div>
			</div> <!-- end col-md-1 -->
			<div class="col-md-6">
				<hr class="visible-xs-block visible-sm-block">
				<div class="joint-venture">
					<?php if (!empty($page['Footer_Joint_Venture'])): ?>
          				<?php print render($page['Footer_Joint_Venture']); ?>
        			<?php endif; ?>
				</div>
				<div class="row">
					<div class="col-sm-7">
						<?php if (!empty($page['Footer_HHS_Links'])): ?>
          					<?php print render($page['Footer_HHS_Links']); ?>
        				<?php endif; ?>
					</div> <!-- end col-md-7 -->
					<div class="col-sm-5">
						<?php if (!empty($page['Footer_ACS_Links'])): ?>
          					<?php print render($page['Footer_ACS_Links']); ?>
        				<?php endif; ?>
					</div> <!-- end col-md-5 -->
				</div> <!-- end row -->
			</div> <!-- end col-md-6 -->
		</div> <!-- end row -->
	</div> <!-- end container -->
	<div class="copyright-banner">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 copyright">
				<?php if (!empty($page['Footer_Copyright'])): ?>
          			<?php print render($page['Footer_Copyright']); ?>
        		<?php endif; ?>
			</div>
		</div> <!-- end row -->
	</div> <!-- end container -->
	</div> <!-- end copyright-banner -->
</footer>

<!-- begin back to top button -->
<?php if (!empty($page['Springboard_BTT'])): ?>
    <?php print render($page['Springboard_BTT']); ?>
<?php endif; ?>
<!-- end back to top button -->

<?php
	drupal_add_js("sites/all/themes/springboard/js/bootstrap-accessible.min.js",
	array(
	'type' => 'file',
	'scope' => 'footer',
	'weight' => 3));
	drupal_add_js("sites/all/themes/springboard/js/scripts.js",
	array(
	'type' => 'file',
	'scope' => 'footer',
	'weight' => 4));
    drupal_add_js("sites/all/themes/springboard/js/jquery.matchHeight-min.js",
    array(
        'type' => 'file',
        'scope' => 'footer',
        'weight' => 5));
?>


    <div class="tips" id="randomize-tips"><script>

            (function() {
                var tips = [
                    {
                        title: "Feeling Alone?",
                        content:  '<strong>Join a peer group.</strong> It may be helpful to talk with others who have had the same experiences.',
                    },
                    {
                        title: "Lost Your Appetite?",
                        content:  '<strong>Eat bland foods.</strong> Avoid foods with strong smells and flavors.',
                    },
                    {
                        title: "Feeling Distressed?",
                        content:  "<strong>Don't overwhelm yourself. </strong>Focus on one thing, one day at a time. Take small steps.",
                    },
                    {
                        title: "Starting a new exercise routine?",
                        content:  '<strong>Begin with warm-up exercises.</strong> Start slowly and warm up for at least 2 to 3 minutes.',
                    },
                    {
                        title: "Feeling Fatigued?",
                        content:  '<strong>Set Priorities.</strong> Identify the most important tasks each day, and then focus your energy on those tasks.',
                    },
                    {
                        title: "Having Memory Problems?",
                        content:  '<strong>Leave notes for yourself.</strong> Post reminder notes where you’ll see them, or set alerts on your phone.',
                    },
                    {
                        title: "Has Your Hair Fallen Out?",
                        content:  '<strong>Protect your skin.</strong> Use sunscreen or wear a head cover to avoid sun exposure.',
                    },
                    {
                        title: "Having Trouble Sleeping?",
                        content:  '<strong>Keep a schedule.</strong> Wake up, go to bed, and rest at the same times each day.',
                    },
                    {
                        title: "Having Mouth or Throat Problems?",
                        content:  '<strong>Eat soft foods.</strong> Choose foods that are soft, wet, and easy to swallow.',
                    },
                    {
                        title: "Nauseated After Treatment?",
                        content:  "<strong>Fast before and after treatment.</strong> Don't eat for one hour before and after treatment.",
                    },
                    {
                        title: "Numb in Your Hands or Feet?",
                        content:  '<strong>Be careful at night.</strong> Avoid injuries by using a night light or flashlight.',
                    },
                    {
                        title: "Feeling Anxious?",
                        content:  '<strong>Relax. </strong>Set aside time each day to do relaxation exercises.',
                    },
                    {
                        title: "Need Help from Loved Ones?",
                        content:  '<strong>Ask for help.</strong> Your loved ones want to support you. Be specific about the kinds of help you need.',
                    },


                ];
                var tip = symptoms[Math.floor(Math.random() * symptoms.length)];
                document.getElementById("randomize-symptoms").innerHTML =
                    '<h3>' + symptom.title + '</h3>' +
                    '<p>' + symptom.content + '</p>';
            })();
        </script></div>
    <!-- end fact-box --></div>

