<div class="container">
  <div class="row vdivide">
      <?php if($title == 'Video Stories'): ?>
         <div class="col-lg-5">
             <div class="page-title video-stories">
                 <h1> Video Stories from Cancer Survivors.</h1>
             </div>
         </div><!-- end column : Video Stories title -->
      <?php endif; ?>

      <?php if($title == 'Get Support'): ?>
          <div class="col-lg-4">
              <div class="page-title">
                  <h1><?php print $title; ?></h1>
              </div>
          </div><!-- end column : Get Support title -->
      <?php endif; ?>

      <?php if($title == 'Video Stories'): ?>
          <div class="col-lg-7">
              <div class="intro">
                  <p> Watch cancer survivors share their stories about having cancer and find out how they coped with challenges.</p>
              </div>
          </div><!-- end column : Video Stories intro -->
      <?php endif; ?>

      <?php if($title == 'Get Support'): ?>
          <div class="col-lg-8">
              <div class="intro">
                  <p> Cancer survivors and caregivers may need extra help during the cancer journey. Explore Springboard's support center.</p>
              </div>
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



