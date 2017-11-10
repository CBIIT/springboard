<?php
/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 */
?><!doctype html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces;?>>
<head profile="<?php print $grddl_profile; ?>">

	<?php if ($_SERVER['HTTP_HOST'] == "survivorship.cancer.gov" || $_SERVER['HTTP_HOST'] == "www.survivorship.cancer.gov") : ?>
		<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-TV2CRTZ');</script>
		<!-- End Google Tag Manager -->
	<?php else: ?>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KXVH2MS');</script>
        <!-- End Google Tag Manager -->
	<?php endif; ?>

  	<meta charset="UTF-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<?php print $head; ?>
  	<title><?php print $head_title; ?></title>
	
  	<!-- Disable tap highlight on IE -->
	<meta name="msapplication-tap-highlight" content="no">
	
	<!-- Default Favicons -->
	<link rel="icon" type="image/x-icon" href="/sites/all/themes/springboard/favicon.ico">
	<link rel="icon" type="image/png" href="/sites/all/themes/springboard/favicon.png">
	
	<!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Springboard Beyond Cancer">
    <link rel="icon" sizes="192x192" href="/sites/all/themes/springboard/images/touch/chrome-touch-icon-192x192.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Springboard Beyond Cancer">
    <link rel="apple-touch-icon" href="/sites/all/themes/springboard/images/touch/apple-touch-icon.png">
  
  	<!-- Google Fonts Roboto Condensed & Cormorant Garamond -->
	<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:300|Roboto+Condensed:300,300i,400,400i,700,700i" rel="stylesheet">
  
  <?php print $styles; ?>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
  <?php print $scripts; ?>
  
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
	<?php if ($_SERVER['HTTP_HOST'] == "survivorship.cancer.gov" || $_SERVER['HTTP_HOST'] == "www.survivorship.cancer.gov") : ?>
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TV2CRTZ"
											height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
	<?php else: ?>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KXVH2MS"
                          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
	<?php endif; ?>
	<script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=GTM-MKWX85" type="text/javascript"></script>

  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
	<?php if ($_SERVER['HTTP_HOST'] == "survivorship.cancer.gov" || $_SERVER['HTTP_HOST'] == "www.survivorship.cancer.gov") : ?>
		<!-- Omniture Analytics -->
		<script src="https://static.cancer.gov/webanalytics/WA_DCCPS_PageLoad.js"></script>
		<!-- End Omniture Analytics -->
	<?php endif; ?>
</body>
</html>
