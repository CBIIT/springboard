<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1><?php // print "Your Custom Action Deck: " . $title; ?></h1>
      <?php $deck_name =  ($name != 'name' ? $name : $title) ?>
      <h1><?php print "Your Custom Action Deck: <b>" . $deck_name ."</b>"; ?></h1>
	  <p class="sr-only">The number above represents your custom action deck. You can reference this action deck again by bookmarking this URL.</p>
    </div> <!-- end column -->
  </div> <!-- end row -->
  <div class="row">
    <div class="col-md-12">
      <p class="intro">
          <!-- Here is the Action Deck you built. Each card in the deck has helpful tips and links to more information on a specific topic. Save the deck the way that works best for you. You can download or email it, or bookmark the URL and come back to it later: -->
          <b>Congratulations on building your Action Deck!</b> Each card in the deck has helpful tips and links to more information on a specific topic. Save the deck the way that works best for you. You can download or email it, or bookmark the URL and come back to it later:
      <?php
        print l(url('/springboard/actiondeck/' . $eid, array('absolute' => TRUE)), url('/springboard/actiondeck/' . $eid, array('absolute' => TRUE)));
      ?></p>
    </div> <!-- end column -->
  </div><!-- end row -->

  <div class="row">
    <div class="col-sm-5 box">
        <p><b>Please Note: </b> You can download your desk three ways: As a PDF, JPGs in a zip file, or text only in a .txt file for accessibility</p>
    </div> <!-- end column -->

    <div class="col-md-7">
      <div class="deck-share">
        <!-- Download Action Card -->
        <div class="btn-group">
          <button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="download-icon"></div>DOWNLOAD ACTION DECK</button>
          <ul class="dropdown-menu">
            <li><a href="/springboard/print-action-deck-pdf/<?php print $eid; ?>"><div class="pdf-icon"></div>PDF</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="/springboard/print-action-deck-jpg/<?php print $eid; ?>"><div class="jpg-icon"></div>JPGs</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="/springboard/print-action-deck-txt/<?php print $eid; ?> "><div class="txt-icon"></div>Text Only</a></li>
          </ul>
        </div> <!-- end download -->
        <!-- Share Action Deck -->
        <div class="btn-group">
          <button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="share-icon"></div>SHARE ACTION DECK</button>
          <ul class="dropdown-menu">
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php print(urlencode(url('/springboard/actiondeck/' . $eid, array('absolute' => TRUE)))); ?>"><div class="facebook-icon"></div>Facebook</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="https://twitter.com/home?status=<?php print urlencode('Check out my customized Action Deck from Springboard Beyond Cancer at ' . url('/springboard/actiondeck/' . $eid, array('absolute' => TRUE))); ?>"><div class="twitter-icon"></div>Twitter</a></li>
          </ul>
        </div> <!-- end share -->
        <a href="/springboard/print-action-deck-pdf/<?php print $eid; ?>" target="_top" class="btn-blue"><div class="print-icon"></div>PRINT</a>
        <a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Customized%20Action%20Deck&body=Check%20out%20your%20customized%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20<?php print url('springboard/actiondeck/' . $eid, array('absolute' => TRUE)); ?>.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer."
             target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a>
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
          	<a class="btn symptoms" role="tree" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" role="treeitem" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  
	  <!-- Stress and Mood Cards -->
      <?php if (!empty($stress_mood_cards)): ?>
        <h3>Stress & Mood</h3>
        <?php foreach($stress_mood_cards as $card) : ?>
          	<a class="btn stressmood" role="tree" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" role="treeitem" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  
	  <!-- Wellness Cards -->
      <?php if (!empty($wellness_cards)): ?>
        <h3>Wellness</h3>
        <?php foreach($wellness_cards as $card) : ?>
          	<a class="btn wellness" role="tree" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" role="treeitem" class="collapse card-box-container">
            	<?php print render(node_view(node_load($card['nid'])))?>
          	</div>
        <?php endforeach; ?>
      <?php endif; ?>
	  <!-- Get Support Cards -->
      <?php if (!empty($get_support_cards)): ?>
        <h3>Get Support</h3>
        <?php foreach($get_support_cards as $card) : ?>
          	<a class="btn getsupport" role="tree" data-toggle="collapse" data-parent="#accordion" href="#<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" aria-expanded="false" aria-controls="collapse"><div class="border-to-arrow"></div><div class="btn-title"><?php print $card['title']; ?></div></a>
        	<div id="<?php print preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $card['title'])); ?>-card" role="treeitem" class="collapse card-box-container">
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
</main>
