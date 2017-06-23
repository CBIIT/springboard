 <div class="card-box">
        <div class="top-banner">
          <h2><?php $node_obj = node_load($node->nid);print $node_obj->title; ?></h2>

          <!-- Download Action Card -->
          <div class="btn-group">
            <button type="button" class="dropdown-toggle btn-dropdown-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="download-icon"></div>DOWNLOAD ACTION CARD</button>
            <ul class="dropdown-menu">
              <?php if (!empty($pdf_link)): ?>
              <li><a href="<?php print $pdf_link; ?>" target="_blank"><div class="pdf-icon"></div>PDF</a></li>
              <?php endif; ?>
              <li role="separator" class="divider"></li>
              <?php if (!empty($jpg_link)): ?>
              <li><a href="<?php print $jpg_link; ?>" target="_blank"><div class="jpg-icon"></div>JPGs</a></li>
              <?php endif; ?>
            </ul>
          </div> <!-- end download -->
          <!-- Share Action Deck -->
          <div class="btn-group">
            <button type="button" class="dropdown-toggle btn-dropdown-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="share-icon"></div>SHARE ACTION CARD</button>
            <ul class="dropdown-menu">
              <?php if (!empty($facebook_link)): ?>
              <li><a href="<?php print $facebook_link; ?>"><div class="facebook-icon"></div>Facebook</a></li>
              <?php endif; ?>
              <li role="separator" class="divider"></li>
              <?php if (!empty($twitter_link)): ?>
              <li><a href="<?php print $twitter_link; ?>"><div class="twitter-icon"></div>Twitter</a></li>
              <?php endif; ?>
            </ul>
          </div> <!-- end share -->

        </div> <!-- end top-banner -->
        <?php print render($content['body']); ?>
        <div class="row">
          <div class="col-xs-4 col-sm-6">
            <h3>Try This</h3>
          </div> <!-- end column -->
          <div class="col-xs-8 col-sm-6">
            <h4 class="helpful">Was this information helpful?</h4>
			<p class="sr-only">Let us know below if the tips under Try This was helpful.</p>
          </div> <!-- end column -->
        </div> <!-- end row -->

        <?php print render($content['field_try_this']); ?>

        <h3>Check This Out</h3>
        <?php print render($content['field_check_this_out']); ?>

      </div> <!-- end card-box -->