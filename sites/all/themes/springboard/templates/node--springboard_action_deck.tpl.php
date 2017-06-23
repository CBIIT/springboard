<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1><?php print $title; ?></h1>
    </div> <!-- end column -->
  </div> <!-- end row -->
  <div class="row">
    <div class="col-md-9">
      <?php print render($content['body']) ?>
    </div> <!-- end column -->
    <div class="col-md-3">
      <div class="deck-share">
        <!-- Download Action Card -->
        <div class="btn-group">
          <button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="download-icon"></div>DOWNLOAD ACTION DECK</button>
          <ul class="dropdown-menu">
            <?php if (!empty($deck_pdf_link)): ?>
              <li><a href="<?php print $deck_pdf_link; ?>" target="_blank"><div class="pdf-icon"></div>PDF</a></li>
            <?php endif; ?>
            <li role="separator" class="divider"></li>
            <?php if (!empty($deck_jpg_link)): ?>
              <li><a href="<?php print $deck_jpg_link; ?>" target="_blank"><div class="jpg-icon"></div>JPGs</a></li>
            <?php endif; ?>
          </ul>
        </div> <!-- end download -->
        <!-- Share Action Deck -->
        <div class="btn-group">
          <button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="share-icon"></div>SHARE ACTION DECK</button>
          <ul class="dropdown-menu">
            <?php if (!empty($deck_facebook_link)): ?>
            <li><a href="<?php print $deck_facebook_link; ?>"><div class="facebook-icon"></div>Facebook</a></li>
            <?php endif; ?>
            <li role="separator" class="divider"></li>
            <?php if (!empty($deck_twitter_link)): ?>
            <li><a href="<?php print $deck_twitter_link; ?>"><div class="twitter-icon"></div>Twitter</a></li>
            <?php endif; ?>
          </ul>
        </div> <!-- end share -->
        <a href="mailto:?subject=Springboard%20Beyond%20Cancer%20<?php print $title; ?>%20Action%20Deck&body=Check%20out%20the%20<?php print $title; ?>%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20<?php print $file_path; ?>.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a>
      </div> <!-- end deck-share -->
    </div> <!-- end column -->
  </div> <!-- end row -->
  <div class="row"><div class="col-lg-12"><hr class="deck-divider"></div></div>
</div> <!-- end container -->

<div class="container">

  <div class="row">
    <div class="col-lg-12 sidebar card_select" id="accordion">
      <h2>Action Cards</h2>
      
	  <!-- Symptoms Cards -->
	  <?php if (!empty($symptom_cards)): ?>
        <h3>Symptoms</h3>
        <?php foreach($symptom_cards as $card) : ?>
          	<a class="btn symptoms" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  
	  <!-- Stress and Mood Cards -->
      <?php if (!empty($stress_mood_cards)): ?>
        <h3>Stress & Mood</h3>
        <?php foreach($stress_mood_cards as $card) : ?>
          	<a class="btn stressmood" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  
	  <!-- Wellness Cards -->
      <?php if (!empty($wellness_cards)): ?>
        <h3>Wellness</h3>
        <?php foreach($wellness_cards as $card) : ?>
          	<a class="btn wellness" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  <!-- Get Support Cards -->
      <?php if (!empty($get_support_cards)): ?>
        <h3>Get Support</h3>
        <?php foreach($get_support_cards as $card) : ?>
          	<a class="btn getsupport" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div> <!-- end column -->
  </div> <!-- end row -->
</div> <!-- end container -->
<div class="container">
	<div class="row"><div class="col-lg-12"><hr class="deck-divider"></div></div>
</div> <!-- end container -->
