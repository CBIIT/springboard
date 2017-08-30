<?php
/**
 * @file
 * blocks_and_views.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function blocks_and_views_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'card_page_link';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Card Page Link';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Card Page Link';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['id'] = 'field_springboard_page_target_id';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['table'] = 'field_data_field_springboard_page';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['field'] = 'field_springboard_page_target_id';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'field_springboard_page_target_id';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['relationship'] = 'field_springboard_page_target_id';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '      <a href="[path]" class="btn"><div class="border-to-arrow"></div><div class="btn-title">Go To [title] Page</div></a>
';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');

  /* Display: RSS Link */
  $handler = $view->new_display('block', 'RSS Link', 'block_1');
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="/springboard/symptoms/[title]/feed" class="btn sbc-rss-btn">
<div class="border-to-arrow"></div>
<div class="btn-title"><div class="rss-icon"></div>Subscribe to RSS</div>
</a>';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $export['card_page_link'] = $view;

  $view = new view();
  $view->name = 'more_for_you';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'More for You';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'MORE FOR YOU';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_more_related_links_node']['id'] = 'reverse_field_more_related_links_node';
  $handler->display->display_options['relationships']['reverse_field_more_related_links_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_more_related_links_node']['field'] = 'reverse_field_more_related_links_node';
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  /* Field: Content: Action Category */
  $handler->display->display_options['fields']['field_action_category']['id'] = 'field_action_category';
  $handler->display->display_options['fields']['field_action_category']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['fields']['field_action_category']['field'] = 'field_action_category';
  $handler->display->display_options['fields']['field_action_category']['label'] = '';
  $handler->display->display_options['fields']['field_action_category']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_action_category']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['field_action_category']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['field_action_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_action_category']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_action_category']['settings'] = array(
    'link' => 0,
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div class="col-sm-6 col-md-4 col-lg-3">
<div><span><a href="[path]" class="subpage-link"><span class="subpage-link-box [field_action_category]"><span class="subpage-link-title">[title]</span>[body]</span></a>
</span></div></div>';
  $handler->display->display_options['fields']['nothing']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_more_related_links_node';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['more_for_you'] = $view;

  $view = new view();
  $view->name = 'springboard';
  $view->description = 'Springboard';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Springboard';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Wellness';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-6 col-md-4 col-lg-3';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No Content found.';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['text'] = '[title]<br />[body]';
  $handler->display->display_options['fields']['body']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['body']['alter']['preserve_tags'] = '<p><br>';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<a href="[path]" class="subpage-link"><span class="subpage-link-box"><span class="subpage-link-title">[title]</span>[body]</span></a>';
  $handler->display->display_options['fields']['nothing']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );

  /* Display: Symptoms Block */
  $handler = $view->new_display('block', 'Symptoms Block', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Symptoms';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['text'] = '[title]<br />[body]';
  $handler->display->display_options['fields']['body']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['body']['alter']['preserve_tags'] = '<p><br>';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<a href="[path]" class="subpage-link"><span class="subpage-link-box"><span class="subpage-link-title">[title]</span>[body]</span></a>';
  $handler->display->display_options['fields']['nothing']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['relationship'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    3 => '3',
  );

  /* Display: Stress & Mood Block */
  $handler = $view->new_display('block', 'Stress & Mood Block', 'block_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Stress & Mood';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['relationship'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    2 => '2',
  );
  $handler->display->display_options['filters']['field_action_category_target_id']['group'] = 1;

  /* Display: Wellness Block */
  $handler = $view->new_display('block', 'Wellness Block', 'block_3');
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title_1']['id'] = 'title_1';
  $handler->display->display_options['sorts']['title_1']['table'] = 'node';
  $handler->display->display_options['sorts']['title_1']['field'] = 'title';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['relationship'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'AND',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['relationship'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    4 => '4',
  );
  $handler->display->display_options['filters']['field_action_category_target_id']['group'] = 1;
  /* Filter criterion: Content: Title */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['value'] = 'Self-Management';
  $handler->display->display_options['filters']['title']['group'] = 2;

  /* Display: Get Support Block */
  $handler = $view->new_display('block', 'Get Support Block', 'block_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Get Support';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'AND',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['relationship'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['field_action_category_target_id']['group'] = 1;
  /* Filter criterion: Content: Title */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = 'contains';
  $handler->display->display_options['filters']['title']['value'] = 'Create Your Own Vision Board';
  $handler->display->display_options['filters']['title']['group'] = 2;

  /* Display: Symptoms - Cards Links */
  $handler = $view->new_display('block', 'Symptoms - Cards Links', 'block_5');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Symptoms';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['class'] = 'list-group list-unstyled card-lists';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h3>Symptoms</h3>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['label'] = 'Content referencing Content from field_springboard_card';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    3 => '3',
  );

  /* Display: Stress & Mood - Cards Links */
  $handler = $view->new_display('block', 'Stress & Mood - Cards Links', 'block_6');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Stress & Mood';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['class'] = 'list-group list-unstyled card-lists';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h3>Stress & Mood</h3>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['label'] = 'Content referencing Content from field_springboard_card';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    2 => '2',
  );

  /* Display: Wellness - Cards Links */
  $handler = $view->new_display('block', 'Wellness - Cards Links', 'block_7');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Wellness';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['class'] = 'list-group list-unstyled card-lists';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h3>Wellness</h3>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['label'] = 'Content referencing Content from field_springboard_card';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    4 => '4',
  );

  /* Display: Get Support - Cards Links */
  $handler = $view->new_display('block', 'Get Support - Cards Links', 'block_8');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Get Support';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['class'] = 'list-group list-unstyled card-lists';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h3>Get Support</h3>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['label'] = 'Content referencing Content from field_springboard_card';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    1 => '1',
  );

  /* Display: RSS Feed */
  $handler = $view->new_display('feed', 'RSS Feed', 'feed_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'rss_fields';
  $handler->display->display_options['row_options']['title_field'] = 'title';
  $handler->display->display_options['row_options']['link_field'] = 'path';
  $handler->display->display_options['row_options']['description_field'] = 'body';
  $handler->display->display_options['row_options']['creator_field'] = 'name';
  $handler->display->display_options['row_options']['date_field'] = 'changed';
  $handler->display->display_options['row_options']['guid_field_options'] = array(
    'guid_field' => 'nid',
    'guid_field_is_permalink' => 0,
  );
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['id'] = 'reverse_field_springboard_page_node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_springboard_page_node']['field'] = 'reverse_field_springboard_page_node';
  /* Relationship: Content: Author */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Intro */
  $handler->display->display_options['fields']['field_intro']['id'] = 'field_intro';
  $handler->display->display_options['fields']['field_intro']['table'] = 'field_data_field_intro';
  $handler->display->display_options['fields']['field_intro']['field'] = 'field_intro';
  $handler->display->display_options['fields']['field_intro']['label'] = '';
  $handler->display->display_options['fields']['field_intro']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_intro']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_intro']['settings'] = array(
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
    'linked_field' => array(
      'linked' => 0,
      'destination' => '',
      'advanced' => array(
        'title' => '',
        'target' => '',
        'class' => '',
        'rel' => '',
        'text' => '',
      ),
    ),
  );
  /* Field: Content: Updated date */
  $handler->display->display_options['fields']['changed']['id'] = 'changed';
  $handler->display->display_options['fields']['changed']['table'] = 'node';
  $handler->display->display_options['fields']['changed']['field'] = 'changed';
  $handler->display->display_options['fields']['changed']['label'] = '';
  $handler->display->display_options['fields']['changed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['changed']['date_format'] = 'long';
  $handler->display->display_options['fields']['changed']['second_date_format'] = 'long';
  /* Field: User: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'users';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['relationship'] = 'uid';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['name']['link_to_user'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Title */
  $handler->display->display_options['arguments']['title']['id'] = 'title';
  $handler->display->display_options['arguments']['title']['table'] = 'node';
  $handler->display->display_options['arguments']['title']['field'] = 'title';
  $handler->display->display_options['arguments']['title']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['title']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['title']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['title']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['title']['limit'] = '0';
  $handler->display->display_options['path'] = 'springboard/symptoms/%/feed';
  $handler->display->display_options['sitename_title'] = 0;

  /* Display: Get Support Paragraphs Survivors */
  $handler = $view->new_display('block', 'Get Support Paragraphs Survivors', 'block_9');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-12 col-md-8 col-lg-6';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Unfiltered text */
  $handler->display->display_options['header']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['header']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['content'] = '<div class="survivor-icon"></div><div class="col-sm-12 get-support-survivors-intro"><h2>Support for Cancer Survivors</h2><p>Strong communication and the support of others can be extremely important when dealing with cancer. Find out how to get the support you need.</p></div>';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Published */
  $handler->display->display_options['sorts']['status']['id'] = 'status';
  $handler->display->display_options['sorts']['status']['table'] = 'node';
  $handler->display->display_options['sorts']['status']['field'] = 'status';
  $handler->display->display_options['sorts']['status']['order'] = 'DESC';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'AND',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['field_action_category_target_id']['group'] = 1;
  /* Filter criterion: Content: Support for (field_support_for) */
  $handler->display->display_options['filters']['field_support_for_value']['id'] = 'field_support_for_value';
  $handler->display->display_options['filters']['field_support_for_value']['table'] = 'field_data_field_support_for';
  $handler->display->display_options['filters']['field_support_for_value']['field'] = 'field_support_for_value';
  $handler->display->display_options['filters']['field_support_for_value']['operator'] = 'and';
  $handler->display->display_options['filters']['field_support_for_value']['value'] = array(
    'survivors' => 'survivors',
  );

  /* Display: Create Your Own Vision Board */
  $handler = $view->new_display('block', 'Create Your Own Vision Board', 'block_10');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-12 col-md-12 col-lg-12 create-vision-board';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Title */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = 'contains';
  $handler->display->display_options['filters']['title']['value'] = 'Create Your Own Vision Board';
  $handler->display->display_options['filters']['title']['group'] = 1;

  /* Display: Get Support Paragraphs Caregivers */
  $handler = $view->new_display('block', 'Get Support Paragraphs Caregivers', 'block_11');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-12 col-md-8 col-lg-6';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Unfiltered text */
  $handler->display->display_options['header']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['header']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['content'] = '<div class="caregiver-icon"></div><div class="col-sm-12 get-support-caregivers-intro"><h2>Support for Caregivers</h2><p>People who provide care and support sometimes need some help too. Find out what is means to be a cancer caregiver and get information on how to take care of yourself and the cancer patient in your life. </p></div>';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Published */
  $handler->display->display_options['sorts']['status']['id'] = 'status';
  $handler->display->display_options['sorts']['status']['table'] = 'node';
  $handler->display->display_options['sorts']['status']['field'] = 'status';
  $handler->display->display_options['sorts']['status']['order'] = 'DESC';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'AND',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Action Category (field_action_category) */
  $handler->display->display_options['filters']['field_action_category_target_id']['id'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['table'] = 'field_data_field_action_category';
  $handler->display->display_options['filters']['field_action_category_target_id']['field'] = 'field_action_category_target_id';
  $handler->display->display_options['filters']['field_action_category_target_id']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['field_action_category_target_id']['group'] = 1;
  /* Filter criterion: Content: Support for (field_support_for) */
  $handler->display->display_options['filters']['field_support_for_value']['id'] = 'field_support_for_value';
  $handler->display->display_options['filters']['field_support_for_value']['table'] = 'field_data_field_support_for';
  $handler->display->display_options['filters']['field_support_for_value']['field'] = 'field_support_for_value';
  $handler->display->display_options['filters']['field_support_for_value']['operator'] = 'and';
  $handler->display->display_options['filters']['field_support_for_value']['value'] = array(
    'caregivers' => 'caregivers',
  );

  /* Display: Create Your Own Vision Board - Home */
  $handler = $view->new_display('block', 'Create Your Own Vision Board - Home', 'block_12');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-12 col-md-12 col-lg-12 create-vision-board';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['text'] = '[title]<br />[body]';
  $handler->display->display_options['fields']['body']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['body']['alter']['preserve_tags'] = '<p><br>';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<a href="[path]" class="subpage-link"><span class="subpage-link-box"><div class="col-xs-5" style="margin-top: 10%;"><img class="img-responsive" alt="take our quiz" src="/sites/all/themes/springboard/images/visionboard_2x.png"></div>
<div class="col-xs-7"><span class="subpage-link-title">[title]</span>[body]</div></span></a>';
  $handler->display->display_options['fields']['nothing']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['operator'] = 'OR';
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Title */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = 'contains';
  $handler->display->display_options['filters']['title']['value'] = 'Create Your Own Vision Board';
  $handler->display->display_options['filters']['title']['group'] = 1;
  $export['springboard'] = $view;

  $view = new view();
  $view->name = 'springboard_homepage_deck';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Springboard Homepage Deck';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'title',
      'rendered' => 0,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'title' => 'title',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Card Image PDF */
  $handler->display->display_options['fields']['field_card_image_pdf']['id'] = 'field_card_image_pdf';
  $handler->display->display_options['fields']['field_card_image_pdf']['table'] = 'field_data_field_card_image_pdf';
  $handler->display->display_options['fields']['field_card_image_pdf']['field'] = 'field_card_image_pdf';
  $handler->display->display_options['fields']['field_card_image_pdf']['label'] = '';
  $handler->display->display_options['fields']['field_card_image_pdf']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_card_image_pdf']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_card_image_pdf']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_card_image_pdf']['click_sort_column'] = 'fid';
  /* Field: Content: Card Image JPG */
  $handler->display->display_options['fields']['field_card_image_jpg']['id'] = 'field_card_image_jpg';
  $handler->display->display_options['fields']['field_card_image_jpg']['table'] = 'field_data_field_card_image_jpg';
  $handler->display->display_options['fields']['field_card_image_jpg']['field'] = 'field_card_image_jpg';
  $handler->display->display_options['fields']['field_card_image_jpg']['label'] = '';
  $handler->display->display_options['fields']['field_card_image_jpg']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_card_image_jpg']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_card_image_jpg']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_card_image_jpg']['click_sort_column'] = 'fid';
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['element_default_classes'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  /* Field: Field: Springboard Action Cards */
  $handler->display->display_options['fields']['field_springboard_action_cards']['id'] = 'field_springboard_action_cards';
  $handler->display->display_options['fields']['field_springboard_action_cards']['table'] = 'field_data_field_springboard_action_cards';
  $handler->display->display_options['fields']['field_springboard_action_cards']['field'] = 'field_springboard_action_cards';
  $handler->display->display_options['fields']['field_springboard_action_cards']['label'] = '';
  $handler->display->display_options['fields']['field_springboard_action_cards']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_springboard_action_cards']['alter']['text'] = '<div class="col-md-6"><div class="symptoms-box"><h3>Symptoms</h3>[field_springboard_action_cards]</div></div>';
  $handler->display->display_options['fields']['field_springboard_action_cards']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_springboard_action_cards']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_springboard_action_cards']['settings'] = array(
    'link' => 1,
  );
  $handler->display->display_options['fields']['field_springboard_action_cards']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_springboard_action_cards']['multi_type'] = 'ul';
  $handler->display->display_options['fields']['field_springboard_action_cards']['separator'] = '<br>';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<li> <a class="btn visible-xs-block visible-sm-block" href="[path]">
					<div class="border-to-arrow"></div>
					<div class="btn-title">[title]</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#[title]-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">[title]</div>
					</a>
					<div class="deck-previews">
						<div id="[title]-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>[title]</h2>
									<p>[body]</p>
									<a class="btn" href="[path]">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the [title] Deck</div>
									</a>
									<div class="row">
										[field_springboard_action_cards]
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="[field_card_image_pdf]">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="[field_card_image_jpg]">
													<div class="jpg-icon"></div>
													JPGs</a></li>
											</ul>
										</div>
										<!-- end download --> 
										<!-- Share Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="share-icon"></div>
											SHARE ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov[path]" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Chemo%20kills%20cancer%20cells%20but%20it%20gets%20healthy%20ones%20too.%20Use%20this%20action%20deck%20to%20get%20info%20on%20chemo%20side%20effects.%0Ahttp%3A//survivorship.cancer.gov[path]" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Chemotherapy%20Action%20Deck&amp;body=Check%20out%20the%20Chemotherapy%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov[path].%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_deck' => 'springboard_action_deck',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['springboard_homepage_deck'] = $view;

  $view = new view();
  $view->name = 'springboard_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_springboard_index';
  $view->human_name = 'Springboard Search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Springboard Search';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'SUBMIT';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Indexed Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_entity'] = 1;
  /* Field: The main body text: Text (indexed) */
  $handler->display->display_options['fields']['body_value']['id'] = 'body_value';
  $handler->display->display_options['fields']['body_value']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['fields']['body_value']['field'] = 'body_value';
  $handler->display->display_options['fields']['body_value']['label'] = '';
  $handler->display->display_options['fields']['body_value']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body_value']['alter']['max_length'] = '300';
  $handler->display->display_options['fields']['body_value']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['body_value']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['body_value']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['body_value']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body_value']['link_to_entity'] = 0;
  /* Field: The main body text: Summary (indexed) */
  $handler->display->display_options['fields']['body_summary']['id'] = 'body_summary';
  $handler->display->display_options['fields']['body_summary']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['fields']['body_summary']['field'] = 'body_summary';
  $handler->display->display_options['fields']['body_summary']['label'] = '';
  $handler->display->display_options['fields']['body_summary']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body_summary']['link_to_entity'] = 0;
  /* Sort criterion: Search: Relevance */
  $handler->display->display_options['sorts']['search_api_relevance']['id'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['sorts']['search_api_relevance']['field'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['order'] = 'DESC';
  /* Filter criterion: Indexed Content: Content type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_pages' => 'springboard_pages',
  );
  /* Filter criterion: Indexed Content: Status */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = array(
    1 => '1',
  );
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_springboard_index';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'springboard/search';
  $export['springboard_search'] = $view;

  $view = new view();
  $view->name = 'springboard_sidebar_card_link';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Springboard Sidebar Card Link';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Springboard Sidebar Card Link';
  $handler->display->display_options['css_class'] = 'box';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Footer: Global: Block area */
  $handler->display->display_options['footer']['block']['id'] = 'block';
  $handler->display->display_options['footer']['block']['table'] = 'views';
  $handler->display->display_options['footer']['block']['field'] = 'block';
  $handler->display->display_options['footer']['block']['block_to_insert'] = 'springboard_actiondeck:user_directions';
  $handler->display->display_options['footer']['block']['title'] = '<none>';
  /* Footer: Global: Unfiltered text */
  $handler->display->display_options['footer']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['footer']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['footer']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['footer']['area_text_custom']['content'] = 'The <a href="[path]">[title]</a> has been added to <a href="/springboard/create-action-deck">your action deck</a>. You can review <a href="/springboard/create-action-deck">your action deck</a> by clicking on the link at the top or below. 
<a href="/springboard/create-action-deck" class="btn btn-create btn-success form-submit">View Your Action Deck</a>';
  $handler->display->display_options['footer']['area_text_custom']['tokenize'] = TRUE;
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['id'] = 'field_springboard_page_target_id';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['table'] = 'field_data_field_springboard_page';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['field'] = 'field_springboard_page_target_id';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<h2>The [title] Card </h2>
<a href="[path]" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title"><div class="card-icon"></div>View this Card</div>
</a>
<a role="button" tabindex="0" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<h2>The [title] Card </h2>
<a href="[path]" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title"><div class="card-icon"></div>View this Card</div>
</a>
<a role="button" tabindex="0" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'field_springboard_page_target_id';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_card' => 'springboard_action_card',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'sidebar_cards');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<h2>The [title] Card </h2>
<a href="[path]" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title"><div class="card-icon"></div>View this Card</div>
</a>
<a role="button" tabindex="0" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<h2>The [title] Card </h2>
<a href="[path]" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title"><div class="card-icon"></div>View this Card</div>
</a>
<a role="button" tabindex="0" class="btn add-to-deck">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;

  /* Display: Add this card to deck */
  $handler = $view->new_display('block', 'Add this card to deck', 'block_1');
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<h2>The [title] Card </h2>
<a role="button" tabindex="0" class="btn">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<h2>The [title] Card </h2>
<a role="button" tabindex="0" class="btn add-to-deck">
   <div class="border-to-arrow"></div>
   <div class="btn-title add-card-link btn-[nid]"><div class="plus-icon"></div>Add to Your Action Deck</div>
</a>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $export['springboard_sidebar_card_link'] = $view;

  $view = new view();
  $view->name = 'springboard_sidebar_related_decks';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Springboard Sidebar Related Decks';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Springboard Sidebar Related Decks';
  $handler->display->display_options['css_class'] = 'box';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h2>The [title_1] Card is also Included in the Following Action Decks</h2>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['header']['area']['tokenize'] = TRUE;
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_springboard_action_cards_target_id']['id'] = 'field_springboard_action_cards_target_id';
  $handler->display->display_options['relationships']['field_springboard_action_cards_target_id']['table'] = 'field_data_field_springboard_action_cards';
  $handler->display->display_options['relationships']['field_springboard_action_cards_target_id']['field'] = 'field_springboard_action_cards_target_id';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['id'] = 'field_springboard_page_target_id';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['table'] = 'field_data_field_springboard_page';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['field'] = 'field_springboard_page_target_id';
  $handler->display->display_options['relationships']['field_springboard_page_target_id']['relationship'] = 'field_springboard_action_cards_target_id';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title_1']['id'] = 'title_1';
  $handler->display->display_options['fields']['title_1']['table'] = 'node';
  $handler->display->display_options['fields']['title_1']['field'] = 'title';
  $handler->display->display_options['fields']['title_1']['relationship'] = 'field_springboard_action_cards_target_id';
  $handler->display->display_options['fields']['title_1']['label'] = '';
  $handler->display->display_options['fields']['title_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title_1']['link_to_node'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['text'] = '<a href="[path]" class="btn">
	<div class="border-to-arrow"></div>
	<div class="btn-title">[title]</div>
</a>';
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'field_springboard_page_target_id';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_action_deck' => 'springboard_action_deck',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['springboard_sidebar_related_decks'] = $view;

  $view = new view();
  $view->name = 'springboard_video_stories';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Springboard Video Stories';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Springboard Video Stories';
  $handler->display->display_options['css_class'] = 'container';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '6';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<div class="container">
	<div class="row">
		<div class="col-lg-12">
			<h1>Video Stories from Cancer Survivors</h1>
			<p class="intro">Watch cancer survivors share their stories about having cancer and find out how they coped with challenges.</p>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Springboard Video Link */
  $handler->display->display_options['fields']['field_springboard_video_link']['id'] = 'field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['table'] = 'field_data_field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['field'] = 'field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['label'] = '';
  $handler->display->display_options['fields']['field_springboard_video_link']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_springboard_video_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_springboard_video_link']['click_sort_column'] = 'video_url';
  $handler->display->display_options['fields']['field_springboard_video_link']['settings'] = array(
    'video_style' => 'normal',
  );
  /* Field: Content: Springboard Video Description */
  $handler->display->display_options['fields']['field_springboard_video_descript']['id'] = 'field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['table'] = 'field_data_field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['field'] = 'field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['label'] = '';
  $handler->display->display_options['fields']['field_springboard_video_descript']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_springboard_video_descript']['alter']['text'] = '<div class="container">
   <div class="row">
		<div class="col-md-12"><h2>[title]</h2></div>
		<div class="col-md-8">
			<div class="embed-responsive embed-responsive-16by9">
  				[field_springboard_video_link]
			</div> <!-- end youtube embed -->
		</div>
		<div class="col-md-4">[field_springboard_video_descript]</div>
		<div class="col-md-12"><hr class="deck-divider"></div>
	</div> <!-- end row -->
</div> <!-- end container -->';
  $handler->display->display_options['fields']['field_springboard_video_descript']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_video' => 'springboard_video',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'springboard/video-stories.html';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'title' => 'title',
    'field_springboard_video_link' => 'field_springboard_video_link',
    'field_springboard_video_descript' => 'field_springboard_video_descript',
  );
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<div class="container">
	<div class="row">
		<div class="col-lg-12">
			<h1>%1</h1>
		</div> <!-- end column -->
	</div> <!-- end row -->
</div> <!-- end container -->';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['header']['area']['tokenize'] = TRUE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Springboard Video Link */
  $handler->display->display_options['fields']['field_springboard_video_link']['id'] = 'field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['table'] = 'field_data_field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['field'] = 'field_springboard_video_link';
  $handler->display->display_options['fields']['field_springboard_video_link']['label'] = '';
  $handler->display->display_options['fields']['field_springboard_video_link']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_springboard_video_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_springboard_video_link']['click_sort_column'] = 'video_url';
  $handler->display->display_options['fields']['field_springboard_video_link']['settings'] = array(
    'video_style' => 'normal',
  );
  /* Field: Content: Springboard Video Description */
  $handler->display->display_options['fields']['field_springboard_video_descript']['id'] = 'field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['table'] = 'field_data_field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['field'] = 'field_springboard_video_descript';
  $handler->display->display_options['fields']['field_springboard_video_descript']['label'] = '';
  $handler->display->display_options['fields']['field_springboard_video_descript']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_springboard_video_descript']['alter']['text'] = '<div class="col-md-6"><div class="col-md-12"><div class="embed-responsive embed-responsive-16by9">
  				[field_springboard_video_link]
			</div> <!-- end youtube embed --></div><div class="col-md-12"><h2>[title]</h2></div><div class="col-md-12">[field_springboard_video_descript]</div></div>';
  $handler->display->display_options['fields']['field_springboard_video_descript']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Video Playlist (field_video_playlist) */
  $handler->display->display_options['arguments']['field_video_playlist_tid']['id'] = 'field_video_playlist_tid';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['table'] = 'field_data_field_video_playlist';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['field'] = 'field_video_playlist_tid';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['title_enable'] = TRUE;
  $handler->display->display_options['arguments']['field_video_playlist_tid']['title'] = '%1';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['default_argument_options']['index'] = '0';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_video_playlist_tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['validate_options']['vocabularies'] = array(
    'video_playlists' => 'video_playlists',
  );
  $handler->display->display_options['arguments']['field_video_playlist_tid']['validate_options']['type'] = 'convert';
  $handler->display->display_options['arguments']['field_video_playlist_tid']['validate_options']['transform'] = TRUE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'springboard_video' => 'springboard_video',
  );
  $handler->display->display_options['path'] = 'springboard/video-stories-playlist/%';
  $export['springboard_video_stories'] = $view;

  $view = new view();
  $view->name = 'video_stories';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Video Stories';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Video Stories';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-sm-6';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Taxonomy term: Content using Video Playlist */
  $handler->display->display_options['relationships']['reverse_field_video_playlist_node']['id'] = 'reverse_field_video_playlist_node';
  $handler->display->display_options['relationships']['reverse_field_video_playlist_node']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_video_playlist_node']['field'] = 'reverse_field_video_playlist_node';
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  /* Field: Taxonomy term: Term description */
  $handler->display->display_options['fields']['description']['id'] = 'description';
  $handler->display->display_options['fields']['description']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['description']['field'] = 'description';
  $handler->display->display_options['fields']['description']['label'] = '';
  $handler->display->display_options['fields']['description']['exclude'] = TRUE;
  $handler->display->display_options['fields']['description']['element_label_colon'] = FALSE;
  /* Field: COUNT(Content: Nid) */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'reverse_field_video_playlist_node';
  $handler->display->display_options['fields']['nid']['group_type'] = 'count';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name_1']['id'] = 'name_1';
  $handler->display->display_options['fields']['name_1']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name_1']['field'] = 'name';
  $handler->display->display_options['fields']['name_1']['label'] = '';
  $handler->display->display_options['fields']['name_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['name_1']['alter']['text'] = '[name_1]';
  $handler->display->display_options['fields']['name_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['name_1']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['name_1']['convert_spaces'] = TRUE;
  /* Field: Res */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['ui_name'] = 'Res';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<a href="/video-stories-playlist/[name_1]" class="subpage-link" style="opacity: 1; top: 0px;"><span class="subpage-link-box"><span class="subpage-link-title">[name]</span><p>[description]</p><div class="subpage-videos-count">[nid]</div></span></a>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Published */
  $handler->display->display_options['sorts']['status']['id'] = 'status';
  $handler->display->display_options['sorts']['status']['table'] = 'node';
  $handler->display->display_options['sorts']['status']['field'] = 'status';
  $handler->display->display_options['sorts']['status']['relationship'] = 'reverse_field_video_playlist_node';
  $handler->display->display_options['sorts']['status']['order'] = 'DESC';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['relationship'] = 'reverse_field_video_playlist_node';
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'video_playlists' => 'video_playlists',
  );

  /* Display: Video Stories Block */
  $handler = $view->new_display('block', 'Video Stories Block', 'block');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Video Playlists';
  $handler->display->display_options['defaults']['footer'] = FALSE;
  /* Footer: Global: Unfiltered text */
  $handler->display->display_options['footer']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['footer']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['footer']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['footer']['area_text_custom']['content'] = '<a class="btn" href="/springboard/video-stories.html"><div class="border-to-arrow"></div><div class="btn-title">View All Videos</div></a>';
  $export['video_stories'] = $view;

  return $export;
}
