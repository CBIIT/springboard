<div class="container">
  <div class="row vdivide">
      <?php if($title == 'Video Stories'): ?>
         <div class="col-lg-5">
             <div class="page-title video-stories">
                 <h1 class="videostories-title"> Video Stories from Cancer Survivors.</h1>
             </div>
         </div><!-- end column : Video Stories title -->
      <?php endif; ?>

      <?php if($title == 'Get Support'): ?>
        <div class="landing-title">
            <h1 class="getsupport-title"><?php print $title; ?></h1>
        </div><!-- end column : Get Support title -->
      <?php endif; ?>

      <?php if($title == 'Video Stories'): ?>
          <div class="col-lg-7">
              <div class="landing-intro">
                  <p class="intro video-top-intro"> Watch cancer survivors share their stories about having cancer and find out how they coped with challenges.</p>
              </div>
          </div><!-- end column : Video Stories intro -->
      <?php endif; ?>

      <?php if($title == 'Get Support'): ?>
          <div class="landing-intro">
              <p class="getsupport-intro"> Cancer survivors and caregivers may need extra help during the cancer journey. Explore Springboard's support center.</p>
          </div><!-- end column : Get Support intro -->
      <?php endif; ?>
  </div> <!-- end row -->

  <div class = "list-of-links">
      <div class="containter">
          <div class="row">
              <?php if($title == 'Get Support'): ?>
                <div class="getsupport">
                  <?php print render($content);  ?>
                </div><!-- end column : Get Support intro -->
              <?php endif; ?>
              <?php if($title == 'Video Stories'): ?>
                <?php print render($content);  ?>
              <?php endif; ?>
          </div>
      </div>
  </div>
</div>



