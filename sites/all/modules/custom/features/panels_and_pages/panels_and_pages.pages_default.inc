<?php
/**
 * @file
 * panels_and_pages.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panels_and_pages_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_240da979-f928-4301-bf09-812397ae1122';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 5;
  $handler->conf = array(
    'title' => 'Springboard Vision Board Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'springboard_pages' => 'springboard_pages',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'springboard/get-support/vision-board',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '11878c5a-4536-44a8-8956-747ae90e4a12';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_240da979-f928-4301-bf09-812397ae1122';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $pane->panel = 'pagecontent';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $display->content['new-c5a17ade-b066-4213-b37c-88c73cb6fe45'] = $pane;
  $display->panels['pagecontent'][0] = 'new-c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $pane = new stdClass();
  $pane->pid = 'new-505d0cc6-6c2a-4697-acae-36f3f13180df';
  $pane->panel = 'pagetitle';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '505d0cc6-6c2a-4697-acae-36f3f13180df';
  $display->content['new-505d0cc6-6c2a-4697-acae-36f3f13180df'] = $pane;
  $display->panels['pagetitle'][0] = 'new-505d0cc6-6c2a-4697-acae-36f3f13180df';
  $pane = new stdClass();
  $pane->pid = 'new-1591fe54-33d5-4565-ac3e-e758a41dcebc';
  $pane->panel = 'sidebar';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Additional Resources',
    'title' => '',
    'body' => '<div class="box">
	<h2>Additional Resources</h2>
	<a class="btn" href="/springboard/create-action-deck">
			<div class="border-to-arrow"></div>
			<div class="btn-title">Create an Action Deck</div>
		</a>
	<a class="btn" href="/springboard/video-stories.html">
			<div class="border-to-arrow"></div>
			<div class="btn-title">Video Stories from Cancer Survivors</div>
		</a>
</div>',
    'format' => 'raw_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '1591fe54-33d5-4565-ac3e-e758a41dcebc';
  $display->content['new-1591fe54-33d5-4565-ac3e-e758a41dcebc'] = $pane;
  $display->panels['sidebar'][0] = 'new-1591fe54-33d5-4565-ac3e-e758a41dcebc';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_240da979-f928-4301-bf09-812397ae1122'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_249c746c-0cf9-451d-a801-db006a78ee50';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 2;
  $handler->conf = array(
    'title' => 'Springboard Card Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'springboard_action_card' => 'springboard_action_card',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array(
    'items' => array(
      'canvas' => array(
        'type' => 'row',
        'contains' => 'column',
        'children' => array(
          0 => 'main',
        ),
        'parent' => NULL,
      ),
      'main' => array(
        'type' => 'column',
        'width' => 100,
        'width_type' => '%',
        'children' => array(
          0 => 'main-row',
        ),
        'parent' => 'canvas',
      ),
      'main-row' => array(
        'type' => 'row',
        'contains' => 'region',
        'children' => array(
          0 => 'testnew',
          1 => 'center',
        ),
        'parent' => 'main',
      ),
      'center' => array(
        'type' => 'region',
        'title' => 'Center',
        'width' => 50,
        'width_type' => '%',
        'parent' => 'main-row',
      ),
      'testnew' => array(
        'type' => 'region',
        'title' => 'testnew',
        'width' => 50,
        'width_type' => '%',
        'parent' => 'main-row',
        'class' => '',
        'hide_empty' => 0,
      ),
    ),
  );
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'testnew' => NULL,
      'intro' => NULL,
      'linklist' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
      'pagetitle' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '82b934b7-51e1-436f-8bb6-1f6dd688a461';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_249c746c-0cf9-451d-a801-db006a78ee50';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-06bb3624-87b8-4293-9cd9-1a24679ada26';
  $pane->panel = 'pagecontent';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 0,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '06bb3624-87b8-4293-9cd9-1a24679ada26';
  $display->content['new-06bb3624-87b8-4293-9cd9-1a24679ada26'] = $pane;
  $display->panels['pagecontent'][0] = 'new-06bb3624-87b8-4293-9cd9-1a24679ada26';
  $pane = new stdClass();
  $pane->pid = 'new-e6455f2c-9762-4f34-a371-21c4001b63fb';
  $pane->panel = 'pagecontent';
  $pane->type = 'block';
  $pane->subtype = 'views-card_page_link-block';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '<none>',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'e6455f2c-9762-4f34-a371-21c4001b63fb';
  $display->content['new-e6455f2c-9762-4f34-a371-21c4001b63fb'] = $pane;
  $display->panels['pagecontent'][1] = 'new-e6455f2c-9762-4f34-a371-21c4001b63fb';
  $pane = new stdClass();
  $pane->pid = 'new-324d96ba-265c-4034-ba85-00d556d66d68';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Title and Intro',
    'title' => '',
    'body' => '<h1>Action Cards: %node:title</h1>
<p>Use these card decks to help manage your symptoms from cancer treatment.</p>
<p>&nbsp;</p>',
    'format' => 'full_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '324d96ba-265c-4034-ba85-00d556d66d68';
  $display->content['new-324d96ba-265c-4034-ba85-00d556d66d68'] = $pane;
  $display->panels['pagetitle'][0] = 'new-324d96ba-265c-4034-ba85-00d556d66d68';
  $pane = new stdClass();
  $pane->pid = 'new-756d5cdd-6b4d-47e8-9e33-e809caff3694';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-8a33dbe9fe2b2b8800ab901a47e584f7';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '<none>',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '756d5cdd-6b4d-47e8-9e33-e809caff3694';
  $display->content['new-756d5cdd-6b4d-47e8-9e33-e809caff3694'] = $pane;
  $display->panels['sidebar'][0] = 'new-756d5cdd-6b4d-47e8-9e33-e809caff3694';
  $pane = new stdClass();
  $pane->pid = 'new-db5360b7-74ce-4043-bae8-b7d28afa4c56';
  $pane->panel = 'sidebar';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Additional Cards',
    'title' => '',
    'body' => '<h2>
	Additional Cards</h2>',
    'format' => 'full_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'db5360b7-74ce-4043-bae8-b7d28afa4c56';
  $display->content['new-db5360b7-74ce-4043-bae8-b7d28afa4c56'] = $pane;
  $display->panels['sidebar'][1] = 'new-db5360b7-74ce-4043-bae8-b7d28afa4c56';
  $pane = new stdClass();
  $pane->pid = 'new-91bdd737-111f-45a8-aea3-2b03944ec191';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_5';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'box symptoms',
  );
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '91bdd737-111f-45a8-aea3-2b03944ec191';
  $display->content['new-91bdd737-111f-45a8-aea3-2b03944ec191'] = $pane;
  $display->panels['sidebar'][2] = 'new-91bdd737-111f-45a8-aea3-2b03944ec191';
  $pane = new stdClass();
  $pane->pid = 'new-717677a7-ee19-47aa-826d-4088c324277d';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_6';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'box stressmood',
  );
  $pane->extras = array();
  $pane->position = 3;
  $pane->locks = array();
  $pane->uuid = '717677a7-ee19-47aa-826d-4088c324277d';
  $display->content['new-717677a7-ee19-47aa-826d-4088c324277d'] = $pane;
  $display->panels['sidebar'][3] = 'new-717677a7-ee19-47aa-826d-4088c324277d';
  $pane = new stdClass();
  $pane->pid = 'new-44ab9eb4-6083-4a02-82af-d21c3953caec';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_7';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'box wellness',
  );
  $pane->extras = array();
  $pane->position = 4;
  $pane->locks = array();
  $pane->uuid = '44ab9eb4-6083-4a02-82af-d21c3953caec';
  $display->content['new-44ab9eb4-6083-4a02-82af-d21c3953caec'] = $pane;
  $display->panels['sidebar'][4] = 'new-44ab9eb4-6083-4a02-82af-d21c3953caec';
  $pane = new stdClass();
  $pane->pid = 'new-e56d5730-19c0-4660-9620-a0a8962ff220';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_8';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'box getsupport',
  );
  $pane->extras = array();
  $pane->position = 5;
  $pane->locks = array();
  $pane->uuid = 'e56d5730-19c0-4660-9620-a0a8962ff220';
  $display->content['new-e56d5730-19c0-4660-9620-a0a8962ff220'] = $pane;
  $display->panels['sidebar'][5] = 'new-e56d5730-19c0-4660-9620-a0a8962ff220';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_249c746c-0cf9-451d-a801-db006a78ee50'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_445dbb0b-3149-4b7b-b3da-761297b880a9';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 3;
  $handler->conf = array(
    'title' => 'Springbord Self-Management Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'springboard_pages' => 'springboard_pages',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'springboard/wellness/self-management',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '11878c5a-4536-44a8-8956-747ae90e4a12';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_445dbb0b-3149-4b7b-b3da-761297b880a9';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-24f3ae8e-cef1-41a7-a0c4-0b0771fb41f1';
  $pane->panel = 'pagecontent';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '24f3ae8e-cef1-41a7-a0c4-0b0771fb41f1';
  $display->content['new-24f3ae8e-cef1-41a7-a0c4-0b0771fb41f1'] = $pane;
  $display->panels['pagecontent'][0] = 'new-24f3ae8e-cef1-41a7-a0c4-0b0771fb41f1';
  $pane = new stdClass();
  $pane->pid = 'new-504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $pane->panel = 'pagetitle';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $display->content['new-504ef64b-e439-4a25-b0af-5d9364d6a4a7'] = $pane;
  $display->panels['pagetitle'][0] = 'new-504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $pane = new stdClass();
  $pane->pid = 'new-43d35337-f491-42d9-859e-23360ea2d14c';
  $pane->panel = 'sidebar';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Additional Resources',
    'title' => '',
    'body' => '<div class="box">
	<h2>Additional Resources</h2>
	<a class="btn" href="/springboard/create-action-deck">
			<div class="border-to-arrow"></div>
			<div class="btn-title">Create an Action Deck</div>
		</a>
	<a class="btn" href="/springboard/video-stories.html">
			<div class="border-to-arrow"></div>
			<div class="btn-title">Video Stories from Cancer Survivors</div>
		</a>
</div>',
    'format' => 'raw_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '43d35337-f491-42d9-859e-23360ea2d14c';
  $display->content['new-43d35337-f491-42d9-859e-23360ea2d14c'] = $pane;
  $display->panels['sidebar'][0] = 'new-43d35337-f491-42d9-859e-23360ea2d14c';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_445dbb0b-3149-4b7b-b3da-761297b880a9'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_6f4b1a38-1b20-4d79-92ea-44301e1c2853';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 4;
  $handler->conf = array(
    'title' => 'Springboard Quiz Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'webform' => 'webform',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'springboard/springboard-stress-quiz',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'landingpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
      'pageintro' => NULL,
      'linklist' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '11878c5a-4536-44a8-8956-747ae90e4a12';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_6f4b1a38-1b20-4d79-92ea-44301e1c2853';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-90157497-306b-4e27-af73-e910d6192f9f';
  $pane->panel = 'linklist';
  $pane->type = 'entity_field_extra';
  $pane->subtype = 'node:webform';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'view_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'col-lg-12',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '90157497-306b-4e27-af73-e910d6192f9f';
  $display->content['new-90157497-306b-4e27-af73-e910d6192f9f'] = $pane;
  $display->panels['linklist'][0] = 'new-90157497-306b-4e27-af73-e910d6192f9f';
  $pane = new stdClass();
  $pane->pid = 'new-504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $pane->panel = 'pagetitle';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $display->content['new-504ef64b-e439-4a25-b0af-5d9364d6a4a7'] = $pane;
  $display->panels['pagetitle'][0] = 'new-504ef64b-e439-4a25-b0af-5d9364d6a4a7';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_6f4b1a38-1b20-4d79-92ea-44301e1c2853'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_95b8c1c5-464e-4a31-86d8-571ef82adffc';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 1;
  $handler->conf = array(
    'title' => 'Springboard About Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'springboard_pages' => 'springboard_pages',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'springboard/about',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '11878c5a-4536-44a8-8956-747ae90e4a12';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_95b8c1c5-464e-4a31-86d8-571ef82adffc';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $pane->panel = 'pagecontent';
  $pane->type = 'node_body';
  $pane->subtype = 'node_body';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $display->content['new-c5a17ade-b066-4213-b37c-88c73cb6fe45'] = $pane;
  $display->panels['pagecontent'][0] = 'new-c5a17ade-b066-4213-b37c-88c73cb6fe45';
  $pane = new stdClass();
  $pane->pid = 'new-e0922c2f-4a73-4568-b801-2baae0d169d9';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'About Title',
    'title' => '',
    'body' => '<h1>About Springboard Beyond Cancer</h1>',
    'format' => 'full_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'e0922c2f-4a73-4568-b801-2baae0d169d9';
  $display->content['new-e0922c2f-4a73-4568-b801-2baae0d169d9'] = $pane;
  $display->panels['pagetitle'][0] = 'new-e0922c2f-4a73-4568-b801-2baae0d169d9';
  $pane = new stdClass();
  $pane->pid = 'new-acfd2896-d033-4034-8f0c-b8b6a560f82c';
  $pane->panel = 'sidebar';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Acknowledgements',
    'title' => '',
    'body' => '<div class="box">
	<p><b>Springboard Beyond Cancer</b> would like to acknowledge the contributions of:</p>
	<p><b>Michael A. Diefenbach, Ph.D.</b><br />
		<i class="small">Director of Behavioral Research, Department of Medicine and Urology, Northwell Health</i></p>
	<p><b>Shawna Hudson, Ph.D.</b><br />
		<i class="small">Associate Professor and Research Division Chief, Department of Family Medicine and Community Health, Rutgers Robert Wood Johnson Medical School</i></p>
</div>
',
    'format' => 'full_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'acfd2896-d033-4034-8f0c-b8b6a560f82c';
  $display->content['new-acfd2896-d033-4034-8f0c-b8b6a560f82c'] = $pane;
  $display->panels['sidebar'][0] = 'new-acfd2896-d033-4034-8f0c-b8b6a560f82c';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-e0922c2f-4a73-4568-b801-2baae0d169d9';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_95b8c1c5-464e-4a31-86d8-571ef82adffc'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__panel_context_c2c854c2-67b3-48f2-abc3-0fd058db9623';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Springboard Content Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'springboard_pages' => 'springboard_pages',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '0',
            'paths' => 'springboard/about
springboard/wellness/self-management
springboard/get-support/vision-board',
          ),
          'context' => 'empty',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array(
    'items' => array(
      'canvas' => array(
        'type' => 'row',
        'contains' => 'column',
        'children' => array(
          0 => 'main',
        ),
        'parent' => NULL,
      ),
      'main' => array(
        'type' => 'column',
        'width' => 100,
        'width_type' => '%',
        'children' => array(
          0 => 'main-row',
        ),
        'parent' => 'canvas',
      ),
      'main-row' => array(
        'type' => 'row',
        'contains' => 'region',
        'children' => array(
          0 => 'testnew',
          1 => 'center',
        ),
        'parent' => 'main',
      ),
      'center' => array(
        'type' => 'region',
        'title' => 'Center',
        'width' => 50,
        'width_type' => '%',
        'parent' => 'main-row',
      ),
      'testnew' => array(
        'type' => 'region',
        'title' => 'testnew',
        'width' => 50,
        'width_type' => '%',
        'parent' => 'main-row',
        'class' => '',
        'hide_empty' => 0,
      ),
    ),
  );
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'testnew' => NULL,
      'intro' => NULL,
      'linklist' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
      'pagetitle' => NULL,
      'moreinfo' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '82b934b7-51e1-436f-8bb6-1f6dd688a461';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view__panel_context_c2c854c2-67b3-48f2-abc3-0fd058db9623';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-4d3ed837-bbe9-43b9-9277-941271f1db7f';
  $pane->panel = 'moreinfo';
  $pane->type = 'block';
  $pane->subtype = 'views-more_for_you-block';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'more-related-links-view',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '4d3ed837-bbe9-43b9-9277-941271f1db7f';
  $display->content['new-4d3ed837-bbe9-43b9-9277-941271f1db7f'] = $pane;
  $display->panels['moreinfo'][0] = 'new-4d3ed837-bbe9-43b9-9277-941271f1db7f';
  $pane = new stdClass();
  $pane->pid = 'new-06bb3624-87b8-4293-9cd9-1a24679ada26';
  $pane->panel = 'pagecontent';
  $pane->type = 'node_content';
  $pane->subtype = 'node_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'links' => 0,
    'no_extras' => 0,
    'override_title' => 1,
    'override_title_text' => '',
    'identifier' => '',
    'link' => 0,
    'leave_node_title' => 0,
    'build_mode' => 'full',
    'context' => 'argument_entity_id:node_1',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '06bb3624-87b8-4293-9cd9-1a24679ada26';
  $display->content['new-06bb3624-87b8-4293-9cd9-1a24679ada26'] = $pane;
  $display->panels['pagecontent'][0] = 'new-06bb3624-87b8-4293-9cd9-1a24679ada26';
  $pane = new stdClass();
  $pane->pid = 'new-6152f76b-9e77-4b0b-acc5-c62b34e50e3b';
  $pane->panel = 'pagecontent';
  $pane->type = 'block';
  $pane->subtype = 'views-card_page_link-block_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '<none>',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = '6152f76b-9e77-4b0b-acc5-c62b34e50e3b';
  $display->content['new-6152f76b-9e77-4b0b-acc5-c62b34e50e3b'] = $pane;
  $display->panels['pagecontent'][1] = 'new-6152f76b-9e77-4b0b-acc5-c62b34e50e3b';
  $pane = new stdClass();
  $pane->pid = 'new-e03def2f-dd30-42e5-8e55-1fddb53010ca';
  $pane->panel = 'pagetitle';
  $pane->type = 'node_title';
  $pane->subtype = 'node_title';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'link' => 0,
    'markup' => 'h1',
    'id' => '',
    'class' => '',
    'context' => 'argument_entity_id:node_1',
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'e03def2f-dd30-42e5-8e55-1fddb53010ca';
  $display->content['new-e03def2f-dd30-42e5-8e55-1fddb53010ca'] = $pane;
  $display->panels['pagetitle'][0] = 'new-e03def2f-dd30-42e5-8e55-1fddb53010ca';
  $pane = new stdClass();
  $pane->pid = 'new-5ffc2e6d-15e5-41b9-9f58-3b3964bb7d1c';
  $pane->panel = 'sidebar';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'What Are Decks?',
    'title' => '',
    'body' => '<div class="box">
	<h2>
		What Are Decks?</h2>
	<p><b>Action Decks are collections of cards.</b> Each card represents a specific topic relevant to cancer and treatment. The cards connect you to helpful tips, resources, and information.</p>
</div>
<!-- end box -->',
    'format' => 'full_html',
    'substitute' => 1,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '5ffc2e6d-15e5-41b9-9f58-3b3964bb7d1c';
  $display->content['new-5ffc2e6d-15e5-41b9-9f58-3b3964bb7d1c'] = $pane;
  $display->panels['sidebar'][0] = 'new-5ffc2e6d-15e5-41b9-9f58-3b3964bb7d1c';
  $pane = new stdClass();
  $pane->pid = 'new-aa7dccf7-8296-43c4-aa1b-6aee7282291e';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-a24b8ecd9f6a590d28290b6e3fb21e9f';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '<none>',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $pane->locks = array();
  $pane->uuid = 'aa7dccf7-8296-43c4-aa1b-6aee7282291e';
  $display->content['new-aa7dccf7-8296-43c4-aa1b-6aee7282291e'] = $pane;
  $display->panels['sidebar'][1] = 'new-aa7dccf7-8296-43c4-aa1b-6aee7282291e';
  $pane = new stdClass();
  $pane->pid = 'new-9adf4cca-e3aa-4988-b302-f3694061c8ba';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'views-28054728912714b48283b6267f80c28a';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '<none>',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 2;
  $pane->locks = array();
  $pane->uuid = '9adf4cca-e3aa-4988-b302-f3694061c8ba';
  $display->content['new-9adf4cca-e3aa-4988-b302-f3694061c8ba'] = $pane;
  $display->panels['sidebar'][2] = 'new-9adf4cca-e3aa-4988-b302-f3694061c8ba';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view__panel_context_c2c854c2-67b3-48f2-abc3-0fd058db9623'] = $handler;

  return $export;
}

/**
 * Implements hook_default_page_manager_pages().
 */
function panels_and_pages_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'action_decks';
  $page->task = 'page';
  $page->admin_title = 'Action Decks';
  $page->admin_description = '';
  $page->path = 'springboard/action-decks';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_action_decks__panel_context_4a12ee74-bea8-4657-83e0-20d2383ab03a';
  $handler->task = 'page';
  $handler->subtask = 'action_decks';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Action Decks';
  $display->uuid = 'cdfb203b-8f6b-4b56-a25b-5eb3156006da';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_action_decks__panel_context_4a12ee74-bea8-4657-83e0-20d2383ab03a';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-76f8b056-8813-4255-86ad-1ffe4aebbd26';
  $pane->panel = 'center';
  $pane->type = 'block';
  $pane->subtype = 'boxes-springboard_action_decks';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'Action Decks',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '76f8b056-8813-4255-86ad-1ffe4aebbd26';
  $display->content['new-76f8b056-8813-4255-86ad-1ffe4aebbd26'] = $pane;
  $display->panels['center'][0] = 'new-76f8b056-8813-4255-86ad-1ffe4aebbd26';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['action_decks'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'create_an_action_deck';
  $page->task = 'page';
  $page->admin_title = 'Create An Action Deck';
  $page->admin_description = '';
  $page->path = 'springboard/create-an-action-deck';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_create_an_action_deck__panel_context_ecea0742-894a-4cfa-be91-e936386c86a4';
  $handler->task = 'page';
  $handler->subtask = 'create_an_action_deck';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'contentpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagecontent' => NULL,
      'sidebar' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'c9c83da4-c9e0-4dde-a356-3cc9f43d7e0f';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_create_an_action_deck__panel_context_ecea0742-894a-4cfa-be91-e936386c86a4';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-cbcc0eac-ffda-4cb9-8121-6d54bd89d1e8';
  $pane->panel = 'pagecontent';
  $pane->type = 'block';
  $pane->subtype = 'icfi_springboard-create_an_action_deck';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'cbcc0eac-ffda-4cb9-8121-6d54bd89d1e8';
  $display->content['new-cbcc0eac-ffda-4cb9-8121-6d54bd89d1e8'] = $pane;
  $display->panels['pagecontent'][0] = 'new-cbcc0eac-ffda-4cb9-8121-6d54bd89d1e8';
  $pane = new stdClass();
  $pane->pid = 'new-5cd3d34f-4f38-45aa-8772-51caf8b71a78';
  $pane->panel = 'sidebar';
  $pane->type = 'block';
  $pane->subtype = 'icfi_springboard-cards_in_your_action_deck';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '5cd3d34f-4f38-45aa-8772-51caf8b71a78';
  $display->content['new-5cd3d34f-4f38-45aa-8772-51caf8b71a78'] = $pane;
  $display->panels['sidebar'][0] = 'new-5cd3d34f-4f38-45aa-8772-51caf8b71a78';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-cbcc0eac-ffda-4cb9-8121-6d54bd89d1e8';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['create_an_action_deck'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'springboard_home_page';
  $page->task = 'page';
  $page->admin_title = 'Springboard Home Page';
  $page->admin_description = '';
  $page->path = 'springboard';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_springboard_home_page__panel_context_ecbe1883-625d-4700-87d4-6c125fc483ca';
  $handler->task = 'page';
  $handler->subtask = 'springboard_home_page';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'homepage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'hero' => NULL,
      'infographic' => NULL,
      'deckpreview' => NULL,
      'additional' => NULL,
      'hero-intro' => NULL,
      'hero-fact1' => NULL,
      'hero-fact2' => NULL,
      'hero-fact3' => NULL,
      'hero-video' => NULL,
      'additional-resources-title' => NULL,
      'additional-resources-video2' => NULL,
      'additional-resources-video3' => NULL,
      'additional-resources-poll' => NULL,
      'link-to-videos' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '9d028cb4-d77a-4c13-9311-1900ee2c63aa';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_springboard_home_page__panel_context_ecbe1883-625d-4700-87d4-6c125fc483ca';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-ac298d0f-2bfa-48e3-a16a-2c799b0622c8';
  $pane->panel = 'additional-resources-poll';
  $pane->type = 'block';
  $pane->subtype = 'advpoll-advpoll_block_180';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => 'TAKE OUR POLL',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => 'homepage-poll',
    'css_class' => 'box',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'ac298d0f-2bfa-48e3-a16a-2c799b0622c8';
  $display->content['new-ac298d0f-2bfa-48e3-a16a-2c799b0622c8'] = $pane;
  $display->panels['additional-resources-poll'][0] = 'new-ac298d0f-2bfa-48e3-a16a-2c799b0622c8';
  $pane = new stdClass();
  $pane->pid = 'new-73f92cdd-216a-4b2e-a47c-c794169aae0e';
  $pane->panel = 'additional-resources-title';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Additional Resource Title',
    'title' => '',
    'body' => '<h2>Additional Resources</h2>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '73f92cdd-216a-4b2e-a47c-c794169aae0e';
  $display->content['new-73f92cdd-216a-4b2e-a47c-c794169aae0e'] = $pane;
  $display->panels['additional-resources-title'][0] = 'new-73f92cdd-216a-4b2e-a47c-c794169aae0e';
  $pane = new stdClass();
  $pane->pid = 'new-d7ba0e8c-1758-4402-8874-23a85fff1cbc';
  $pane->panel = 'additional-resources-video2';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_video2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'd7ba0e8c-1758-4402-8874-23a85fff1cbc';
  $display->content['new-d7ba0e8c-1758-4402-8874-23a85fff1cbc'] = $pane;
  $display->panels['additional-resources-video2'][0] = 'new-d7ba0e8c-1758-4402-8874-23a85fff1cbc';
  $pane = new stdClass();
  $pane->pid = 'new-c4188045-4aef-4260-8d7a-52e5693ca7ca';
  $pane->panel = 'additional-resources-video3';
  $pane->type = 'block';
  $pane->subtype = 'boxes-take_our_quiz_box';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'col-sm-6',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c4188045-4aef-4260-8d7a-52e5693ca7ca';
  $display->content['new-c4188045-4aef-4260-8d7a-52e5693ca7ca'] = $pane;
  $display->panels['additional-resources-video3'][0] = 'new-c4188045-4aef-4260-8d7a-52e5693ca7ca';
  $pane = new stdClass();
  $pane->pid = 'new-65d064eb-84a0-410c-aed0-a021fd889715';
  $pane->panel = 'deckpreview';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_deck_preview';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '65d064eb-84a0-410c-aed0-a021fd889715';
  $display->content['new-65d064eb-84a0-410c-aed0-a021fd889715'] = $pane;
  $display->panels['deckpreview'][0] = 'new-65d064eb-84a0-410c-aed0-a021fd889715';
  $pane = new stdClass();
  $pane->pid = 'new-2f75ad3f-487b-4fcb-a27e-25c30a9150a0';
  $pane->panel = 'hero-fact1';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_hero_factbox1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '2f75ad3f-487b-4fcb-a27e-25c30a9150a0';
  $display->content['new-2f75ad3f-487b-4fcb-a27e-25c30a9150a0'] = $pane;
  $display->panels['hero-fact1'][0] = 'new-2f75ad3f-487b-4fcb-a27e-25c30a9150a0';
  $pane = new stdClass();
  $pane->pid = 'new-780d74de-35f7-455c-9f42-aa5ed619884e';
  $pane->panel = 'hero-fact2';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_random_block_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '780d74de-35f7-455c-9f42-aa5ed619884e';
  $display->content['new-780d74de-35f7-455c-9f42-aa5ed619884e'] = $pane;
  $display->panels['hero-fact2'][0] = 'new-780d74de-35f7-455c-9f42-aa5ed619884e';
  $pane = new stdClass();
  $pane->pid = 'new-f0d2ef9c-0b04-4a35-9513-c72b33d5c408';
  $pane->panel = 'hero-fact3';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_random_block_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f0d2ef9c-0b04-4a35-9513-c72b33d5c408';
  $display->content['new-f0d2ef9c-0b04-4a35-9513-c72b33d5c408'] = $pane;
  $display->panels['hero-fact3'][0] = 'new-f0d2ef9c-0b04-4a35-9513-c72b33d5c408';
  $pane = new stdClass();
  $pane->pid = 'new-fb5b3c9d-ef6b-43b2-a968-495fb7fa8e3d';
  $pane->panel = 'hero-intro';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_hero_intro';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'fb5b3c9d-ef6b-43b2-a968-495fb7fa8e3d';
  $display->content['new-fb5b3c9d-ef6b-43b2-a968-495fb7fa8e3d'] = $pane;
  $display->panels['hero-intro'][0] = 'new-fb5b3c9d-ef6b-43b2-a968-495fb7fa8e3d';
  $pane = new stdClass();
  $pane->pid = 'new-c4eddd47-d2eb-448d-829e-d4bf1ee33bdb';
  $pane->panel = 'hero-video';
  $pane->type = 'block';
  $pane->subtype = 'boxes-homepage_hero_video';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c4eddd47-d2eb-448d-829e-d4bf1ee33bdb';
  $display->content['new-c4eddd47-d2eb-448d-829e-d4bf1ee33bdb'] = $pane;
  $display->panels['hero-video'][0] = 'new-c4eddd47-d2eb-448d-829e-d4bf1ee33bdb';
  $pane = new stdClass();
  $pane->pid = 'new-1faaf79f-b4ad-4f0d-894e-4e03cedfec09';
  $pane->panel = 'infographic';
  $pane->type = 'block';
  $pane->subtype = 'boxes-sb_home_placeholder2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
    'override_title_heading' => 'h2',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '1faaf79f-b4ad-4f0d-894e-4e03cedfec09';
  $display->content['new-1faaf79f-b4ad-4f0d-894e-4e03cedfec09'] = $pane;
  $display->panels['infographic'][0] = 'new-1faaf79f-b4ad-4f0d-894e-4e03cedfec09';
  $pane = new stdClass();
  $pane->pid = 'new-2ec08eee-7bde-4664-b199-9fca0eeca4ea';
  $pane->panel = 'link-to-videos';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Link to Video Page',
    'title' => '',
    'body' => '<div class="col-lg-12">
	<div class="box spacing">
		<div class="row">
			<div class="col-md-6">
				<p>Watch cancer survivors share their stories about having cancer and find out how they coped with challenges.</p>
			</div>
			<div class="col-md-6">
				<a class="btn" href="/springboard/video-stories.html"><div class="border-to-arrow"></div><div class="btn-title">Video Stories from Cancer Survivors</div></a>
			</div>
		</div>
	</div>
	</div> ',
    'format' => 'raw_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '2ec08eee-7bde-4664-b199-9fca0eeca4ea';
  $display->content['new-2ec08eee-7bde-4664-b199-9fca0eeca4ea'] = $pane;
  $display->panels['link-to-videos'][0] = 'new-2ec08eee-7bde-4664-b199-9fca0eeca4ea';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['springboard_home_page'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'springboard_landing_pages';
  $page->task = 'page';
  $page->admin_title = 'Springboard Landing Pages';
  $page->admin_description = '';
  $page->path = 'springboard/%name';
  $page->access = array(
    'plugins' => array(),
    'logic' => 'and',
  );
  $page->menu = array();
  $page->arguments = array(
    'name' => array(
      'id' => 1,
      'identifier' => 'String',
      'name' => 'string',
      'settings' => array(
        'use_tail' => 0,
      ),
      'keyword' => 'name',
    ),
  );
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_springboard_landing_pages__panel_context_e6d47f29-1157-4f86-bf88-af0d73608bef';
  $handler->task = 'page';
  $handler->subtask = 'springboard_landing_pages';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Symptoms Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'string_equal',
          'settings' => array(
            'operator' => '=',
            'value' => 'symptoms',
            'case' => 0,
          ),
          'context' => 'argument_string_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'landingpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pageintro' => NULL,
      'linklist' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%name:uppercase_words_html_safe';
  $display->uuid = '3a74b155-248c-430d-bbec-7804e29637e8';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_springboard_landing_pages__panel_context_e6d47f29-1157-4f86-bf88-af0d73608bef';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-f5302adc-0c87-4dc7-804e-79638a6404f4';
  $pane->panel = 'linklist';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'symptoms',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'f5302adc-0c87-4dc7-804e-79638a6404f4';
  $display->content['new-f5302adc-0c87-4dc7-804e-79638a6404f4'] = $pane;
  $display->panels['linklist'][0] = 'new-f5302adc-0c87-4dc7-804e-79638a6404f4';
  $pane = new stdClass();
  $pane->pid = 'new-bb385bf8-d2b5-4e60-90be-9adc5087dfea';
  $pane->panel = 'pageintro';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Symptoms Intro',
    'title' => '',
    'body' => '<p class="intro">Cancer treatments can have a range of side effects. Learn more about common treatment symptoms and what you can do to manage them.</p>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'bb385bf8-d2b5-4e60-90be-9adc5087dfea';
  $display->content['new-bb385bf8-d2b5-4e60-90be-9adc5087dfea'] = $pane;
  $display->panels['pageintro'][0] = 'new-bb385bf8-d2b5-4e60-90be-9adc5087dfea';
  $pane = new stdClass();
  $pane->pid = 'new-0277fe22-86c3-4505-a847-989389e8ef0c';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Symptoms Title',
    'title' => '',
    'body' => '<h1>Symptoms</h1>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '0277fe22-86c3-4505-a847-989389e8ef0c';
  $display->content['new-0277fe22-86c3-4505-a847-989389e8ef0c'] = $pane;
  $display->panels['pagetitle'][0] = 'new-0277fe22-86c3-4505-a847-989389e8ef0c';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_springboard_landing_pages__panel_context_5bd9d1fd-7b38-4970-bda1-409484b85ae2';
  $handler->task = 'page';
  $handler->subtask = 'springboard_landing_pages';
  $handler->handler = 'panel_context';
  $handler->weight = 1;
  $handler->conf = array(
    'title' => 'Stress & Mood Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'string_equal',
          'settings' => array(
            'operator' => '=',
            'value' => 'stress-mood',
            'case' => 0,
          ),
          'context' => 'argument_string_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'landingpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pageintro' => NULL,
      'linklist' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%name:uppercase_words_html_safe';
  $display->uuid = 'bfd9d09a-f1d4-45ec-8082-c9487d2797d2';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_springboard_landing_pages__panel_context_5bd9d1fd-7b38-4970-bda1-409484b85ae2';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-2c105e58-f8e5-4116-8cad-33d9ff80ddd6';
  $pane->panel = 'linklist';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_2';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'stressmood',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '2c105e58-f8e5-4116-8cad-33d9ff80ddd6';
  $display->content['new-2c105e58-f8e5-4116-8cad-33d9ff80ddd6'] = $pane;
  $display->panels['linklist'][0] = 'new-2c105e58-f8e5-4116-8cad-33d9ff80ddd6';
  $pane = new stdClass();
  $pane->pid = 'new-aac1002e-3031-455c-85bb-25de7df70c3a';
  $pane->panel = 'pageintro';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Stress & Mood Intro',
    'title' => '',
    'body' => '<p class="intro">People with cancer may face emotional challenges. This section covers some of the common feelings people have and gives you ways to cope.</p>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'aac1002e-3031-455c-85bb-25de7df70c3a';
  $display->content['new-aac1002e-3031-455c-85bb-25de7df70c3a'] = $pane;
  $display->panels['pageintro'][0] = 'new-aac1002e-3031-455c-85bb-25de7df70c3a';
  $pane = new stdClass();
  $pane->pid = 'new-5b1ac64f-ad52-4b05-8627-5049e4419da4';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Stress & Mood Title',
    'title' => '',
    'body' => '<h1>
	Stress &amp; Mood</h1>
',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '5b1ac64f-ad52-4b05-8627-5049e4419da4';
  $display->content['new-5b1ac64f-ad52-4b05-8627-5049e4419da4'] = $pane;
  $display->panels['pagetitle'][0] = 'new-5b1ac64f-ad52-4b05-8627-5049e4419da4';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-5b1ac64f-ad52-4b05-8627-5049e4419da4';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_springboard_landing_pages__panel_context_4a25ce55-df82-4d1e-ba17-754e17c2361b';
  $handler->task = 'page';
  $handler->subtask = 'springboard_landing_pages';
  $handler->handler = 'panel_context';
  $handler->weight = 2;
  $handler->conf = array(
    'title' => 'Wellness Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'string_equal',
          'settings' => array(
            'operator' => '=',
            'value' => 'wellness',
            'case' => 0,
          ),
          'context' => 'argument_string_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'landingpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pageintro' => NULL,
      'linklist' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%name:uppercase_words_html_safe';
  $display->uuid = 'b2094452-8d96-4ed3-9f31-19235d63014f';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_springboard_landing_pages__panel_context_4a25ce55-df82-4d1e-ba17-754e17c2361b';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-a5eeb834-deb5-43ba-a85d-90faad5ea3bb';
  $pane->panel = 'linklist';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_3';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'wellness',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'a5eeb834-deb5-43ba-a85d-90faad5ea3bb';
  $display->content['new-a5eeb834-deb5-43ba-a85d-90faad5ea3bb'] = $pane;
  $display->panels['linklist'][0] = 'new-a5eeb834-deb5-43ba-a85d-90faad5ea3bb';
  $pane = new stdClass();
  $pane->pid = 'new-a6e0fbe1-f0ea-4359-9491-6efd9ccc19ad';
  $pane->panel = 'pageintro';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Wellness Intro',
    'title' => '',
    'body' => '<p class="intro">A healthy lifestyle has many benefits. Find information about important health topics—like nutrition, exercise, and quitting tobacco—that you can use to take care of your health.</p>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'a6e0fbe1-f0ea-4359-9491-6efd9ccc19ad';
  $display->content['new-a6e0fbe1-f0ea-4359-9491-6efd9ccc19ad'] = $pane;
  $display->panels['pageintro'][0] = 'new-a6e0fbe1-f0ea-4359-9491-6efd9ccc19ad';
  $pane = new stdClass();
  $pane->pid = 'new-c131f3a0-9bef-41e4-b0a2-4a2bf8028964';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Wellness Landing Page',
    'title' => '',
    'body' => '<h1>Wellness</h1>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'c131f3a0-9bef-41e4-b0a2-4a2bf8028964';
  $display->content['new-c131f3a0-9bef-41e4-b0a2-4a2bf8028964'] = $pane;
  $display->panels['pagetitle'][0] = 'new-c131f3a0-9bef-41e4-b0a2-4a2bf8028964';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-c131f3a0-9bef-41e4-b0a2-4a2bf8028964';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_springboard_landing_pages__panel_context_a598b376-e10b-4cdf-ba09-78313e67a9d4';
  $handler->task = 'page';
  $handler->subtask = 'springboard_landing_pages';
  $handler->handler = 'panel_context';
  $handler->weight = 3;
  $handler->conf = array(
    'title' => 'Get Support Landing Page',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'string_equal',
          'settings' => array(
            'operator' => '=',
            'value' => 'get-support',
            'case' => 0,
          ),
          'context' => 'argument_string_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'landingpage';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'pagetitle' => NULL,
      'pageintro' => NULL,
      'linklist' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%name:uppercase_words_html_safe';
  $display->uuid = 'ed38e17b-7dbf-4c8a-960a-32e25ea7702f';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'page_springboard_landing_pages__panel_context_a598b376-e10b-4cdf-ba09-78313e67a9d4';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-81d727cf-a539-4aed-944d-ae9a94bb4cca';
  $pane->panel = 'linklist';
  $pane->type = 'block';
  $pane->subtype = 'views-springboard-block_4';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 1,
    'override_title_text' => '',
    'override_title_heading' => 'span',
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array(
    'css_id' => '',
    'css_class' => 'getsupport',
  );
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '81d727cf-a539-4aed-944d-ae9a94bb4cca';
  $display->content['new-81d727cf-a539-4aed-944d-ae9a94bb4cca'] = $pane;
  $display->panels['linklist'][0] = 'new-81d727cf-a539-4aed-944d-ae9a94bb4cca';
  $pane = new stdClass();
  $pane->pid = 'new-e75fa2ce-73a1-4e17-82d2-0896b77d85c5';
  $pane->panel = 'pageintro';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Get Support Intro',
    'title' => '',
    'body' => '<p class="intro">Strong communication and the support of others can be extremely important when dealing with cancer. Find out how to get the support you need.</p>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'e75fa2ce-73a1-4e17-82d2-0896b77d85c5';
  $display->content['new-e75fa2ce-73a1-4e17-82d2-0896b77d85c5'] = $pane;
  $display->panels['pageintro'][0] = 'new-e75fa2ce-73a1-4e17-82d2-0896b77d85c5';
  $pane = new stdClass();
  $pane->pid = 'new-abb01e9c-2824-46c6-95db-73c4c3a04190';
  $pane->panel = 'pagetitle';
  $pane->type = 'custom';
  $pane->subtype = 'custom';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'admin_title' => 'Get Support Title',
    'title' => '',
    'body' => '<h1>Get Support</h1>',
    'format' => 'full_html',
    'substitute' => TRUE,
  );
  $pane->cache = array();
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = 'abb01e9c-2824-46c6-95db-73c4c3a04190';
  $display->content['new-abb01e9c-2824-46c6-95db-73c4c3a04190'] = $pane;
  $display->panels['pagetitle'][0] = 'new-abb01e9c-2824-46c6-95db-73c4c3a04190';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-abb01e9c-2824-46c6-95db-73c4c3a04190';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['springboard_landing_pages'] = $page;

  return $pages;

}
