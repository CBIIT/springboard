<?php

/**
 * @file
 * Customize confirmation screen after successful submission.
 *
 * This file may be renamed "webform-confirmation-[nid].tpl.php" to target a
 * specific webform e-mail on your site. Or you can leave it
 * "webform-confirmation.tpl.php" to affect all webform confirmations on your
 * site.
 *
 * Available variables:
 * - $node: The node object for this webform.
 * - $progressbar: The progress bar 100% filled (if configured). This may not
 *   print out anything if a progress bar is not enabled for this node.
 * - $confirmation_message: The confirmation message input by the webform
 *   author.
 * - $sid: The unique submission ID of this submission.
 * - $url: The URL of the form (or for in-block confirmations, the same page).
 */
?>
<?php
$submission = webform_get_submission($node->nid, $sid);
//print '<pre>';print_r($submission->data[6][0]);print '</pre>';
$overall = $submission->data[6][0];
?>
<?php print $progressbar; ?>
<div class="container">
<div class="row">
<div class="col-lg-12">

<h1>Springboard Stress Quiz Results</h1>

<div class="webform-confirmation">
  <?php if ($confirmation_message): ?>
    <?php print $confirmation_message ?>
  <?php else: ?>
    <p><?php //print t('Thank you for completed Springboard Stress Quiz.'); ?></p>
  <?php endif; ?>
</div>

<div class="webform-results">
  <div class="box">
  	<h2 class="quiz-results">Your Score is <?php print_r($overall); ?></h2>
  </div> <!-- close box -->
  <div class="row">
  <div class="col-md-9">
  <div class="results">
	  <?php switch($overall) {
		case $overall<= 4 or $overall= 0: print '<h3>This score shows your stress levels are low.</h3> <p>There may be some things that occasionally upset you or are difficult to deal with, but overall you are handling your stress.</p> <p>Everybody’s stressors are different. Certain events—even happy ones—can trigger stress. If you’re concerned about stress in your life, you might want to talk to a friend or family member about how you’re feeling or <a href="/springboard/stress-mood/practice-mindfulness">learn coping skills</a> for stressful times. </p>';
		  break;
		case $overall>= 5 && $overall<= 10: print '<h3>This score shows your stress levels are moderate.</h3> <p>The stress you’re having probably isn’t overwhelming, but it might be causing problems in your daily life. These problems may be making you feel down, anxious, or nervous. </p><p>If you’re concerned about stress in your life, you might want to talk to a friend or family member about how you’re feeling.</p> <h3>Manage Your Stress</h3> <p>It’s important to find healthy ways to reduce stress and take care of yourself. There are many ways to relax your mind and body to help you <a href="/springboard/stress-mood/practice-mindfulness">cope with stress</a>. </p>';
		  break;
		case $overall>= 11: print '<h3>This score shows your stress levels are high.</h3> <p>You’ve got a lot going on right now. Whether the problems and stressors are at home, at work, or in your social circle, you’re probably feeling overwhelmed.</p> <h3>Take Stress Seriously</h3> <p>Stress can affect your body, your thoughts, and your feelings. Long-term stress can lead to health problems. Understanding the causes of your stress is an important first step in dealing with it. If you’re feeling high levels of stress, try talking to a friend, family member, or your doctor. And find <a href="/springboard/stress-mood/practice-mindfulness">ways to reduce stress</a> and take care of yourself.</p>';
		  break;
	  }
	  ?>
  </div> <!-- close results -->
  </div> <!-- close column -->
  </div> <!-- close row -->
  <a href="<?php print $url; ?>" class="btn btn-blue btn-quiz"><?php print t('Go Back to the Quiz') ?></a>
</div>

</div> <!-- close column -->
</div> <!-- close row -->
</div> <!-- close container -->
