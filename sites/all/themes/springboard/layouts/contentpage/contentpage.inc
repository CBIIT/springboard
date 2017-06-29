<?php

// Plugin definition
$plugin = array(
  'title' => t('Springboard Bootstrap Content Pages'),
  'category' => t('Springboard Bootstrap'),
  'icon' => 'contentpage.png',
  'theme' => 'contentpage',
  'regions' => array(
    'pagetitle' => t('Page Title'),
	'pagecontent' => t('Page Content'),
	'sidebar' => t('Sidebar Content'),
	'moreinfo' => t('More For You'),
  ),
);
