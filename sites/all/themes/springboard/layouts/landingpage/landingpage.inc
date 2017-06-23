<?php

// Plugin definition
$plugin = array(
  'title' => t('Springboard Bootstrap Main Landing Pages'),
  'category' => t('Springboard Bootstrap'),
  'icon' => 'landingpage.png',
  'theme' => 'landingpage',
  'regions' => array(
    'pagetitle' => t('Page Title'),
	'pageintro' => t('Page Intro'),
	'linklist' => t('List of Links'),
  ),
);
