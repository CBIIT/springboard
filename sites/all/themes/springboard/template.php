<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

//Zhao, Add placeholder for Searchbar
function springboard_form_alter(&$form, &$form_state, $form_id){
    if($form_id == "views_exposed_form" && $form['#id'] == 'views-exposed-form-springboard-search-page'){
        $form['search_api_views_fulltext']['#attributes']['placeholder'] = t('Search');
    }
    if ($form_id == "user-login"){
        print "Hello World";
    }
    //dpm($form);
    //print_r('<pre>');print_r($form);print_r('</pre>');
}

/**
 * Helper function to return Taxonomy ID By term name.
 *
 * @param string $term_name
 *    Name of the vocabulary term.
 * @param string $vocabulary
 *    Optional name of vocabulary to limit search to.
 *
 * @return string
 *    Taxonomy ID as a string; Blank string if not found.
 */
function springboard_get_taxonomy_id_by_name($term_name, $vocabulary = NULL) {
  $term_array = taxonomy_get_term_by_name($term_name, $vocabulary);
  if (empty($term_array)) {
    return '';
  }
  else {
    return array_pop($term_array)->tid;
  }
}

/**
 * Preprocess variables for node.tpl.php
 *
 * @see node.tpl.php
 */
function springboard_preprocess_node(&$variables) {
  $current_node = $variables['node'];
  if ($current_node->type == "springboard_action_deck") {
    $cards = array();
    $wrapper = entity_metadata_wrapper('node', $current_node);
    $entity_references = $wrapper->field_springboard_action_cards->value();
    foreach ($entity_references as $entity_reference) {
      $this_card = array();
      $this_card['nid'] = $entity_reference->nid;
      $this_card['title'] = $entity_reference->title;
      $this_card['action_category'] = $entity_reference->field_action_category['und'][0]['target_id'];
      $cards[] = $this_card;
    }
    $variables['wellness_cards'] = array_values(array_filter($cards, function($v){
      return (isset($v['action_category']) && $v['action_category'] == springboard_get_taxonomy_id_by_name('Wellness', 'action_categories'));
    }));
    $variables['symptom_cards'] = array_values(array_filter($cards, function($v){
      return (isset($v['action_category']) && $v['action_category'] == springboard_get_taxonomy_id_by_name('Symptoms', 'action_categories'));
    }));
    $variables['get_support_cards'] = array_values(array_filter($cards, function($v){
      return (isset($v['action_category']) && $v['action_category'] == springboard_get_taxonomy_id_by_name('Get Support', 'action_categories'));
    }));
    $variables['stress_mood_cards'] = array_values(array_filter($cards, function($v){
      return (isset($v['action_category']) && $v['action_category'] == springboard_get_taxonomy_id_by_name('Stress & Mood', 'action_categories'));
    }));
    // Get print links for deck.
    if (!empty($wrapper->field_card_image_jpg)) {
      $file_array = $wrapper->field_card_image_jpg->value();
      $variables['deck_jpg_link'] = file_create_url($file_array['uri']);
    }
    if (!empty($wrapper->field_card_image_pdf)) {
      $file_array = $wrapper->field_card_image_pdf->value();
      $variables['deck_pdf_link'] = file_create_url($file_array['uri']);
    }
    // Get share links for deck.
    if (!empty($wrapper->field_facebook_link)) {
      $link_array = $wrapper->field_facebook_link->value();
      if (!empty($link_array['url'])) {
        $variables['deck_facebook_link'] = $link_array['url'];
      }
    }
    if (!empty($wrapper->field_twitter_link)) {
      $link_array = $wrapper->field_twitter_link->value();
      if (!empty($link_array['url'])) {
        $variables['deck_twitter_link'] = $link_array['url'];
      }
    }
    $variables['file_path'] = url('node/' . $wrapper->getIdentifier(), array('absolute' => TRUE));
  }
  // Get print links for card.
  if ($current_node->type == "springboard_action_card") {
    $wrapper = entity_metadata_wrapper('node', $current_node);
    if (!empty($wrapper->field_card_image_jpg)) {
      $file_array = $wrapper->field_card_image_jpg->value();
      $variables['jpg_link'] = file_create_url($file_array['uri']);
    }
    if (!empty($wrapper->field_card_image_pdf)) {
      $file_array = $wrapper->field_card_image_pdf->value();
      $variables['pdf_link'] = file_create_url($file_array['uri']);
    }
    // Get share links for deck.
    if (!empty($wrapper->field_facebook_link)) {
      $link_array = $wrapper->field_facebook_link->value();
      if (!empty($link_array['url'])) {
        $variables['facebook_link'] = $link_array['url'];
      }
    }
    if (!empty($wrapper->field_twitter_link)) {
      $link_array = $wrapper->field_twitter_link->value();
      if (!empty($link_array['url'])) {
        $variables['twitter_link'] = $link_array['url'];
      }
    }
  }
}

function springboard_preprocess_block(&$variables) {
  //print_r($variables['block']);
}

function springboard_preprocess_page(&$vars) {
//  $path = drupal_get_path_alias();
//  if (drupal_match_path($path, 'travel')) {
//
//  }
}

function springboard_preprocess_html(&$variables) {
  drupal_add_js(drupal_get_path('theme', 'springboard') . '/js/jquery.cookie.js', 'file');
}

/**
 * Replacement for theme_form_element().
 *
 * Removes orphaned control label in original, and turns each component into a
 * fieldset, with the description as legend- DEG.
 */
function springboard_webform_element($variables) {
  $element = $variables['element'];

  $output = '<div ' . drupal_attributes($element['#wrapper_attributes']) . '>' . "\n";
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . webform_filter_xss($element['#field_prefix']) . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . webform_filter_xss($element['#field_suffix']) . '</span>' : '';

  // Generate description for above or below the field.
  $above = !empty($element['#webform_component']['extra']['description_above']);
  $description = array(
    FALSE => '',
    TRUE => !empty($element['#description']) ? ' <div class="description">' . $element['#description'] . "</div>\n" : '',
  );
  if ($element['#type'] == 'radios') {
    $description = array(
      FALSE => '',
      TRUE => !empty($element['#description']) ? ' <div class="description"><legend>' . $element['#description'] . "</legend></div>\n" : '',
    );
  }

  switch ($element['#title_display']) {
    case 'inline':
      $output .= $description[$above];
      $description[$above] = '';
    // FALL THRU.
    case 'before':
    case 'invisible':
      if (!empty($description[$above]) && $element['#type'] == 'radios') {
        $output .= ' ' . $prefix . '<fieldset>' . $description[$above] . $element['#children'] . '</fieldset>' . $suffix . "\n";
      }
      else {
        $output .= ' ' . theme('form_element_label', $variables);
        $output .= ' ' . $prefix . $description[$above] . $element['#children'] . $suffix . "\n";
      }
      break;

    case 'after':
      if (!empty($description[$above]) && $element['#type'] == 'radios') {
        $output .= ' ' . $prefix . '<fieldset>' . $description[$above] . $element['#children'] . '</fieldset>' . $suffix;
        $output .= "\n";
      }
      else {
        $output .= ' ' . $prefix . $description[$above] . $element['#children'] . $suffix;
        $output .= ' ' . theme('form_element_label', $variables) . "\n";
      }
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      if (!empty($description[$above]) && $element['#type'] == 'radios') {
        $output .= ' ' . $prefix . '<fieldset>' . $description[$above] . $element['#children'] . '</fieldset>' . $suffix . "\n";
      }
      else {
        $output .= ' ' . $prefix . $description[$above] . $element['#children'] . $suffix . "\n";
      }
      break;
  }

  $output .= $description[!$above];
  $output .= "</div>\n";

  return $output;
}

function springboard_theme() {
  $items = array();
	
  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'springboard') . '/templates',
    'template' => 'user-login',
    'preprocess functions' => array(
       'springboard_preprocess_user_login'
    ),
  );

  return $items;
}
