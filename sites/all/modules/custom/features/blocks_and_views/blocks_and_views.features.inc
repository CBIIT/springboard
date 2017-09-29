<?php
/**
 * @file
 * blocks_and_views.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function blocks_and_views_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "boxes" && $api == "box") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function blocks_and_views_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_fe_nodequeue_export_fields().
 */
function blocks_and_views_fe_nodequeue_export_fields() {
  $nodequeues = array();

  // Exported nodequeues: get_support_caregiver
  $nodequeues['get_support_caregiver'] = array(
    'name' => 'get_support_caregiver',
    'title' => 'Get Support Caregiver',
    'subqueue_title' => '',
    'size' => 0,
    'link' => 'add',
    'link_remove' => 'remove',
    'owner' => 'nodequeue',
    'show_in_ui' => 1,
    'show_in_tab' => 1,
    'show_in_links' => 1,
    'reference' => 0,
    'reverse' => 0,
    'insert_at_front' => 0,
    'i18n' => 0,
    'subqueues' => 1,
    'types' => array(
      0 => 'springboard_pages',
    ),
    'roles' => array(),
    'count' => 0,
  );

  return $nodequeues;
}
