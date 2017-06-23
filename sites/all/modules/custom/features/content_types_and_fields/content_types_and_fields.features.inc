<?php
/**
 * @file
 * content_types_and_fields.features.inc
 */

/**
 * Implements hook_node_info().
 */
function content_types_and_fields_node_info() {
  $items = array(
    'advpoll' => array(
      'name' => t('Advanced Poll'),
      'base' => 'node_content',
      'description' => t('Advanced Poll adds additional poll functionality, cookie voting, write-ins and voting modes.'),
      'has_title' => '1',
      'title_label' => t('Question'),
      'help' => '',
    ),
    'article' => array(
      'name' => t('Article'),
      'base' => 'node_content',
      'description' => t('Use <em>articles</em> for time-sensitive content like news, press releases or blog posts.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'page' => array(
      'name' => t('Basic page'),
      'base' => 'node_content',
      'description' => t('Use <em>basic pages</em> for your static content, such as an \'About us\' page.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'springboard_action_card' => array(
      'name' => t('Springboard Action Card'),
      'base' => 'node_content',
      'description' => t('Springboard Action Cards'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'springboard_action_deck' => array(
      'name' => t('Springboard Action Deck'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'springboard_pages' => array(
      'name' => t('Springboard Pages'),
      'base' => 'node_content',
      'description' => t('Springboard Pages -- Symptoms, Stress & Mood, Wellness, Get Support.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'springboard_video' => array(
      'name' => t('Springboard Video'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
