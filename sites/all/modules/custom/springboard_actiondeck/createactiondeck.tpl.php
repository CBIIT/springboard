<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1>Action Decks: Create Your Own</h1>
    </div> <!-- end column -->
  </div> <!-- end row -->
  <div class="row">
    <div class="col-md-9">
      <p class="intro">Use the action decks to get information, tips, and resources that address what you are going through. These decks will help you build skills, tackle challenges, and move forward along your cancer journey.</p>
    </div> <!-- end column -->
  </div> <!-- end row -->

  <div class="row"><div class="col-lg-12"><hr class="deck-divider"></div></div>

  <div class="row">
    <div class="col-md-7 col-lg-8" id="tabs">
      <h2 class="first">Select a Topic Area</h2>
	  <p class="sr-only">Use the tabs below to move through the 4 topic areas; Symptoms, Stress & Mood, Wellness, and Get Support. Select cards in each topic area to add to your custom deck. You can also select one of the pre-made action decks at the bottom of the page.</p>
      
	  <div id="tabpanel1" class="tabpanel">
			<ul class="nav nav-tabs nav-justified add-cards" role="tablist">
				<li id="tab1" class="tab selected" aria-controls="symptoms" aria-selected="true" role="tab" tabindex="0">Symptoms</li>
				<li id="tab2" class="tab" aria-controls="stressmood" role="tab" aria-selected="false" tabindex="-1">Stress & Mood</li>
				<li id="tab3" class="tab" aria-controls="wellness" role="tab" aria-selected="false" tabindex="-1">Wellness</li>
				<li id="tab4" class="tab" aria-controls="getsupport" role="tab" aria-selected="false" tabindex="-1">Get Support</li>
			</ul>
      	
			<div class="panel" id="symptoms" role="tabpanel" aria-labelledby="tab1">
			  <h3>Select Symptom Cards to Add to Your Deck</h3>
			  <div class="row">
				<?php foreach($symptom_cards as $card_nid => $card_title): ?>
				  <div class="col-md-6"><a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?>"><div class="plus-icon"></div><?php print $card_title; ?></a></div>
				<?php endforeach; ?>
			  </div> <!-- close row -->
			</div> <!-- close symptoms-tab -->
	
			<div class="panel" id="stressmood" role="tabpanel" aria-labelledby="tab2">
			  <h3>Select Stress & Mood Cards to Add to Your Deck</h3>
			  <div class="row">
				<?php foreach($stress_mood_cards as $card_nid => $card_title): ?>
				  <div class="col-md-6"><a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?>"><div class="plus-icon"></div><?php print $card_title; ?></a></div>
				<?php endforeach; ?>
			  </div> <!-- end row -->
			</div> <!-- close stress-mood-tab -->
	
			<div class="panel" id="wellness" role="tabpanel" aria-labelledby="tab3">
			  <h3>Select Wellness Cards to Add to Your Deck</h3>
			  <div class="row">
				<?php foreach($wellness_cards as $card_nid => $card_title): ?>
				  <div class="col-md-6"><a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?>"><div class="plus-icon"></div><?php print $card_title; ?></a></div>
				<?php endforeach; ?>
			  </div> <!-- end row -->
			</div> <!-- close wellness-tab -->
	
			<div class="panel" id="getsupport" role="tabpanel" aria-labelledby="tab4">
			  <h3>Select Get Support Cards to Add to Your Deck</h3>
			  <div class="row">
				<?php foreach($get_support_cards as $card_nid => $card_title): ?>
				  <div class="col-md-6"><a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?>"><div class="plus-icon"></div><?php print $card_title; ?></a></div>
				<?php endforeach; ?>
			  </div> <!-- end row -->
			</div> <!-- close get-support-tab -->
	
	  </div> <!-- close tabpanel1 -->
    </div> <!-- end column -->
    <div class="col-md-5 col-lg-4 sidebar">
      <?php print render($form['cards'])?>
      <div class="create-deck-box">
        <div class="header">
          <div class="row">
            <div class="col-xs-4">
              <div class="circle-graphic">
                <div class="symptoms-border"></div>
                <div class="stress-mood-border"></div>
                <div class="wellness-border"></div>
                <div class="get-support-border"></div>
                <div class="white-circle"></div>
                <span class="card-number">0</span>
				<span class="sr-only">Cards have been added to your Action Deck.</span>
              </div>
            </div> <!-- close column -->
            <div class="col-xs-8">
              <h2>Cards in Your Action Deck</h2>
            </div> <!-- close column -->
          </div> <!-- close row -->
        </div> <!-- close header -->
        <div class="content">
          <?php print render($form['submit_button']); ?>
          <h3>Symptoms Cards</h3>
          <div class="cards-added">
            <?php foreach($symptom_cards as $card_nid => $card_title): ?>
              <a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?> hidden"><div class="check-icon"></div><?php print $card_title; ?></a>
            <?php endforeach; ?>
          </div> <!-- end symptoms-card-added -->
          <hr>
          <h3>Stress & Mood Cards</h3>
          <div class="cards-added">
            <?php foreach($stress_mood_cards as $card_nid => $card_title): ?>
              <a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?> hidden"><div class="check-icon"></div><?php print $card_title; ?></a>
            <?php endforeach; ?>
          </div> <!-- end stress-mood-card-added -->
          <hr>
          <h3>Wellness Cards</h3>
          <div class="cards-added">
            <?php foreach($wellness_cards as $card_nid => $card_title): ?>
              <a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?> hidden"><div class="check-icon"></div><?php print $card_title; ?></a>
            <?php endforeach; ?>
          </div> <!-- end wellness-card-added -->
          <hr>
          <h3>Get Support Cards</h3>
          <div class="cards-added">
            <?php foreach($get_support_cards as $card_nid => $card_title): ?>
              <a role="button" tabindex="0" class="btn btn-<?php print $card_nid; ?> hidden"><div class="check-icon"></div><?php print $card_title; ?></a>
            <?php endforeach; ?>
          </div> <!-- end get-support-card-added -->
          <hr>
          <?php print render($form['submit_button']); ?>
        </div> <!-- close -->
      </div> <!-- close create-deck-box -->

    </div> <!-- end column -->
  </div> <!-- end row -->

  <div class="row"><div class="col-lg-12"><hr class="deck-divider"></div></div>

</div> <!-- end container -->
<!-- Render any remaining elements, such as hidden inputs (token, form_id, etc). -->
<?php print drupal_render_children($form); ?>