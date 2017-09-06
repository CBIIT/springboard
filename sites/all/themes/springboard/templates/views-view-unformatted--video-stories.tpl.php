<?php
/**
* @file
* Default simple view template to display the list of video playlist.
*
* @ingroup views_templates
*/
?>

<?php if(html_entity_decode($title) == 'Symptoms & Side Effects'): ?>
  <?php $category = "symptoms" ?>
<?php endif; ?>
<?php if(html_entity_decode($title)  == "Support & Self-Management"): ?>
  <?php $category = "getsupport" ?>
<?php endif; ?>
<?php if(html_entity_decode($title)  == "Relaxation Exercises"): ?>
  <?php $category = "wellness" ?>
<?php endif; ?>
<?php if(html_entity_decode($title)  == "Diagnosis & Treatment"): ?>
  <?php $category = "stressmood" ?>
<?php endif; ?>


<?php if (!empty($title)): ?>
    <h3><?php // print $title; ?></h3>
<?php endif; ?>

<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] . ' '. $category . '"';  } ?>>
    <div<?php print ' class="' . $title . '"';  ?>>
          <?php print $row; ?>
    </div>
  </div>
<?php endforeach; ?>

