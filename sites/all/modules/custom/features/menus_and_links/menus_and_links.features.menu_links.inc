<?php
/**
 * @file
 * menus_and_links.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function menus_and_links_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-springboard_get-support:springboard/get-support.
  $menu_links['menu-springboard_get-support:springboard/get-support'] = array(
    'menu_name' => 'menu-springboard',
    'link_path' => 'springboard/get-support',
    'router_path' => 'springboard/%',
    'link_title' => 'Get Support',
    'options' => array(
      'attributes' => array(
        'title' => 'Get Support',
      ),
      'identifier' => 'menu-springboard_get-support:springboard/get-support',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: menu-springboard_home:springboard.
  $menu_links['menu-springboard_home:springboard'] = array(
    'menu_name' => 'menu-springboard',
    'link_path' => 'springboard',
    'router_path' => 'springboard',
    'link_title' => 'Home',
    'options' => array(
      'attributes' => array(
        'title' => 'Springboard Beyond Cancer Home Page',
      ),
      'identifier' => 'menu-springboard_home:springboard',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: menu-springboard_stress--mood:springboard/stress-mood.
  $menu_links['menu-springboard_stress--mood:springboard/stress-mood'] = array(
    'menu_name' => 'menu-springboard',
    'link_path' => 'springboard/stress-mood',
    'router_path' => 'springboard/%',
    'link_title' => 'Stress & Mood',
    'options' => array(
      'attributes' => array(
        'title' => 'Stress & Mood',
      ),
      'identifier' => 'menu-springboard_stress--mood:springboard/stress-mood',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: menu-springboard_symptoms:springboard/symptoms.
  $menu_links['menu-springboard_symptoms:springboard/symptoms'] = array(
    'menu_name' => 'menu-springboard',
    'link_path' => 'springboard/symptoms',
    'router_path' => 'springboard/%',
    'link_title' => 'Symptoms',
    'options' => array(
      'attributes' => array(
        'title' => 'Common Symptoms',
      ),
      'identifier' => 'menu-springboard_symptoms:springboard/symptoms',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
  );
  // Exported menu link: menu-springboard_wellness:springboard/wellness.
  $menu_links['menu-springboard_wellness:springboard/wellness'] = array(
    'menu_name' => 'menu-springboard',
    'link_path' => 'springboard/wellness',
    'router_path' => 'springboard/%',
    'link_title' => 'Wellness',
    'options' => array(
      'attributes' => array(
        'title' => 'Wellness',
      ),
      'identifier' => 'menu-springboard_wellness:springboard/wellness',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Get Support');
  t('Home');
  t('Stress & Mood');
  t('Symptoms');
  t('Wellness');

  return $menu_links;
}
