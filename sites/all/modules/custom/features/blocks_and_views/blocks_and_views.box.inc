<?php
/**
 * @file
 * blocks_and_views.box.inc
 */

/**
 * Implements hook_default_box().
 */
function blocks_and_views_default_box() {
  $export = array();

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'ask_help';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Ask for help.';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Need Help from Loved Ones?</h3>

<p><strong>Ask for help.</strong> Your loved ones want to support you. Be specific about the kinds of help you need.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['ask_help'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'buildrelationship';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Appetite';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Lost Your Appetite?</h3>

<p><strong>Eat bland foods.</strong> Avoid foods with strong smells and flavors.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['buildrelationship'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'exercise_routine';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'exercise routine';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Starting a new exercise routine?</h3>

<p><strong>Begin with warm-up exercises.</strong> Start slowly and warm up for at least 2 to 3 minutes.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['exercise_routine'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'feeling_fatigued';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Feeling Fatigued?';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Feeling Fatigued?</h3>

<p><strong>Set Priorities.</strong> Identify the most important tasks each day, and then focus your energy on those tasks.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['feeling_fatigued'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'forget_things';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'forget things';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Having Memory Problems?</h3>

<p><strong>Leave notes for yourself.</strong> Post reminder notes where you’ll see them, or set alerts on your phone.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['forget_things'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_deck_preview';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Deck Preview';
  $box->options = array(
    'body' => array(
      'value' => '<div class="box">
	<div class="row">
		<div class="col-sm-9 col-md-7">
			<h2>Create your own action deck or choose an action deck we’ve made for you.</h2>
		</div>
		<!-- end column --> 
	</div>
	<!-- end row -->
	<div class="row">
		<div class="col-md-4 col-lg-3">
			<ul class="list-unstyled premade-deck-links" id="accordion">
				<li><a href="/springboard/create-action-deck" class="btn-create">
					<div class="plus-icon-large"></div>
					<div class="btn-create-title">Create an Action Deck</div>
					Create an Action Deck with the topics that are most important to you. </a> </li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/new-diagnosis">
					<div class="border-to-arrow"></div>
					<div class="btn-title">New Diagnosis</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#newdiagnosis-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">New Diagnosis</div>
					</a>
					<div class="deck-previews">
						<div id="newdiagnosis-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>New Diagnosis</h2>
									<p>Build knowledge and expectations about cancer treatment, communicating with others, and coping with the stresses of having cancer.</p>
									<a class="btn" href="/springboard/new-diagnosis">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the New Diagnosis Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="stressmood-box">
												<h3>Stress &amp; Mood</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/stress-mood/coping-with-cancer-card">Coping with Cancer in Everyday Life</a></li>
													<li><a href="/springboard/stress-mood/distress-card">Distress</a></li>
													<li><a href="/springboard/stress-mood/practice-mindfulness-card">Practice Mindfulness and Relaxation</a></li>
												</ul>
											</div>
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/be-active-card">Be Active</a></li>
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/family-friends-caregivers-card">Family, Friends, and Caregivers</a></li>
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>										
													<li><a href="/springboard/get-support/in-the-workplace-card">In the Workplace</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_New_Diagnosis_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_New_Diagnosis.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/new-diagnosis" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=You%20may%20not%20know%20where%20to%20start%20when%20diagnosed%20with%20cancer.%20Use%20this%20action%20deck%20to%20get%20tips%20on%20coping.%0Ahttp%3A//survivorship.cancer.gov/springboard/new-diagnosis" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20New Diagnosis%20Action%20Deck&amp;body=Check%20out%20the%20New%20Diagnosis%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/new-diagnosis.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/surgery">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Surgery</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#surgery-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Surgery</div>
					</a>
					<div class="deck-previews">
						<div id="surgery-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Surgery</h2>
									<p>Get information about the most common symptoms and challenges from surgery and learn how to manage them.</p>
									<a class="btn" href="/springboard/surgery">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Surgery Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="symptoms-box">
												<h3>Symptoms</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/symptoms/lymphedema-card">Lymphedema</a></li>
													<li><a href="/springboard/symptoms/pain-card">Pain</a></li>
													<li><a href="/springboard/symptoms/swelling-card">Swelling</a></li>
												</ul>
											</div>
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/be-active-card">Be Active</a></li>
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Surgery_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Surgery.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/surgery" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Surgery%20is%20a%20common%20treatment%20for%20a%20cancer%20tumor.%20Use%20this%20action%20deck%20to%20get%20information%20after%20surgery.%0Ahttp%3A//survivorship.cancer.gov/springboard/surgery" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Surgery%20Action%20Deck&amp;body=Check%20out%20the%20Surgery%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/surgery.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/chemotherapy">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Chemotherapy</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#chemotherapy-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Chemotherapy</div>
					</a>
					<div class="deck-previews">
						<div id="chemotherapy-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Chemotherapy</h2>
									<p>Get information about the most common symptoms and challenges from chemotherapy and learn how to manage them.</p>
									<a class="btn" href="/springboard/chemotherapy">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Chemotherapy Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="symptoms-box">
												<h3>Symptoms</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/symptoms/appetite-changes-card">Appetite Changes</a></li>
													<li><a href="/springboard/symptoms/chemo-brain-card">Chemo-Brain</a></li>
													<li><a href="/springboard/symptoms/fatigue-card">Fatigue</a></li>
													<li><a href="/springboard/symptoms/hairloss-card">Hair Loss</a></li>
													<li><a href="/springboard/symptoms/infections-card">Infections</a></li>
													<li><a href="/springboard/symptoms/mouth-gum-throat-problems-card">Mouth and Gum Problems</a></li>
													<li><a href="/springboard/symptoms/nausea-card">Nausea</a></li>
													<li>Sexual Problems for <a href="/springboard/symptoms/sexual-problems-for-men-card">Men</a> and <a href="/springboard/symptoms/sexual-problems-for-women-card">Women</a></li>
													<li><a href="/springboard/symptoms/tingling-burning-numbness-card">Tingling, Burning, and Numbness (Neuropathy)</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
												</ul>
											</div>
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Chemotherapy_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Chemotherapy.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/chemotherapy" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Chemo%20kills%20cancer%20cells%20but%20it%20gets%20healthy%20ones%20too.%20Use%20this%20action%20deck%20to%20get%20info%20on%20chemo%20side%20effects.%0Ahttp%3A//survivorship.cancer.gov/springboard/chemotherapy" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Chemotherapy%20Action%20Deck&amp;body=Check%20out%20the%20Chemotherapy%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/chemotherapy.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/radiation">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Radiation</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#radiation-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Radiation</div>
					</a>
					<div class="deck-previews">
						<div id="radiation-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Radiation</h2>
									<p>Get information about the most common symptoms and challenges from radiation therapy and learn how to manage them.</p>
									<a class="btn" href="/springboard/radiation">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Radiation Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="symptoms-box">
												<h3>Symptoms</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/symptoms/fatigue-card">Fatigue</a></li>
													<li><a href="/springboard/symptoms/infections-card">Infections</a></li>
													<li><a href="/springboard/symptoms/skin-and-nail-changes-card">Skin and Nail Changes</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/be-active-card">Be Active</a></li>
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
												</ul>
											</div>
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Radiation_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Radiation.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/radiation" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=About%201/2%20of%20all%20cancer%20patients%20get%20radiation.%20Use%20this%20action%20deck%20to%20get%20information%20on%20symptoms%20of%20radiation.%0Ahttp%3A//survivorship.cancer.gov/springboard/radiation" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Radiation%20Action%20Deck&amp;body=Check%20out%20the%20Radiation%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/radiation.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->	
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/coping-cancer">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Coping with Cancer</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#copingwithcancer-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Coping with Cancer</div>
					</a>
					<div class="deck-previews">
						<div id="copingwithcancer-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Coping with Cancer</h2>
									<p>Understand the emotional challenges that may come with having cancer and build skills to cope with them.</p>
									<a class="btn" href="/springboard/coping-cancer">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Coping with Cancer Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="stressmood-box">
												<h3>Stress &amp; Mood</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/stress-mood/anxiety-card">Anxiety</a></li>
													<li><a href="/springboard/stress-mood/coping-with-cancer-card">Coping with Cancer in Everyday Life</a></li>
													<li><a href="/springboard/stress-mood/depression-card">Depression</a></li>
													<li><a href="/springboard/stress-mood/distress-card">Distress</a></li>
													<li><a href="/springboard/stress-mood/fear-of-recurrence-card">Fear of Recurrence</a></li>
													<li><a href="/springboard/stress-mood/practice-mindfulness-card">Practice Mindfulness and Relaxation</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/family-friends-caregivers-card">Family, Friends, and Caregivers</a></li>
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
													<li><a href="/springboard/get-support/peer-to-peersupport-card">Peer-to-Peer Support</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Coping_With_Cancer_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Coping_With_Cancer.zip">
													<div class="jpg-icon"></div>
													JPGs</a></li>
											</ul>
										</div>
										<!-- end download --> 
										<!-- Share Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="share-icon"></div>
											SHARE ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/coping-cancer" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Cancer%20can%20bring%20up%20a%20wide%20range%20of%20emotions.%20Use%20this%20action%20deck%20to%20get%20information%20on%20stress%20and%20mood%20issues.%0Ahttp%3A//survivorship.cancer.gov/springboard/coping-cancer" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Coping%20with%20Cancer%20Action%20Deck&amp;body=Check%20out%20the%20Coping%20with%20Cancer%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/coping-cancer.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/social-support">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Social Support</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#socialsupport-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Social Support</div>
					</a>
					<div class="deck-previews">
						<div id="socialsupport-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Social Support</h2>
									<p>Get social support resources and build communication skills to use with your health care team, loved ones, and more.</p>
									<a class="btn" href="/springboard/social-support">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Social Support Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="stressmood-box">
												<h3>Stress &amp; Mood</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/stress-mood/coping-with-cancer-card">Coping with Cancer in Everyday Life</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/family-friends-caregivers-card">Family, Friends, and Caregivers</a></li>
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
													
													<li><a href="/springboard/get-support/in-the-workplace-card">In the Workplace</a></li>
													<li><a href="/springboard/get-support/peer-to-peersupport-card">Peer-to-Peer Support</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Social_Support_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Social_Support.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/social-support" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Strong%20social%20support%20can%20help%20during%20your%20cancer%20care.%20Use%20this%20action%20deck%20to%20make%20the%20most%20of%20this%20help.%20http%3A//survivorship.cancer.gov/springboard/social-support" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Social Support%20Action%20Deck&amp;body=Check%20out%20the%20Social%20Support%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/social-support.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
				<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/living-well">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Living Well</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#livingwell-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Living Well</div>
					</a>
					<div class="deck-previews">
						<div id="livingwell-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Living Well</h2>
									<p>A healthy lifestyle can benefit you before, during, and after cancer treatment. Find out how to live healthier and feel better.</p>
									<a class="btn" href="/springboard/living-well">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Living Well Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="stressmood-box">
												<h3>Stress &amp; Mood</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/stress-mood/fear-of-recurrence-card">Fear of Recurrence</a></li>
													<li><a href="/springboard/stress-mood/practice-mindfulness-card">Practice Mindfulness and Relaxation</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/be-active-card">Be Active</a></li>
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
													<li><a href="/springboard/wellness/quit-smoking-card">Quit Smoking</a></li>
													<li><a href="/springboard/wellness/sun-safety-card">Sun Safety</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Living_Well_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Living_Well.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/living-well" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=A%20healthy%20lifestyle%20benefits%20you%20during%20and%20after%20cancer%20treatment.%20This%20action%20deck%20focuses%20on%20healthy%20living.%0Ahttp%3A//survivorship.cancer.gov/springboard/living-well" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Living Well%20Action%20Deck&amp;body=Check%20out%20the%20Living%20Well%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/living-well.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/post-treatment">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Post-Treatment</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#post-treatment-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Post-Treatment</div>
					</a>
					<div class="deck-previews">
						<div id="post-treatment-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Post-Treatment</h2>
									<p>Some of the challenges of cancer continue after you finish treatment. Find out what you can expect when treatment ends</p>
									<a class="btn" href="/springboard/post-treatment">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Post-Treatment Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="stressmood-box">
												<h3>Stress &amp; Mood</h3>
												<ul class="list-unstyled">
												    <li><a href="/springboard/stress-mood/practice-mindfulness-card">Practice Mindfulness and Relaxation</a></li>
													<li><a href="/springboard/stress-mood/fear-of-recurrence-card">Fear of Recurrence</a></li>
													<li><a href="/springboard/stress-mood/distress-card">Distress</a></li>
												</ul>
											</div>
										</div>
										<div class="col-md-6">
											<div class="symptoms-box">
												<h3>Symptoms</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/symptoms/fatigue-card">Fatigue</a></li>
													<li><a href="/springboard/symptoms/chemo-brain-card">Chemo-Brain &amp; Memory Problems</a></li>
													<li>Sexual Problems for <a href="/springboard/symptoms/sexual-problems-for-men-card">Men</a> and <a href="/springboard/symptoms/sexual-problems-for-women-card">Women</a></li>
													<li><a href="/springboard/symptoms/hot-flashes-card">Hot Flashes &amp; Night Sweats</a></li>
												</ul>
											</div>
										</div>
										<!-- end column -->
										<div class="col-md-6">
											<div class="wellness-box">
												<h3>Wellness</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/wellness/healthy-eating-card">Healthy Eating</a></li>
													<li><a href="/springboard/wellness/be-active-card">Be Active</a></li>
												</ul>
											</div>
										</div>
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/in-the-workplace-card">In the Workplace</a></li>
													<li><a href="/springboard/get-support/health-care-team-card">Health Care Team</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Post_Treatment_Deck.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Post_Treatment.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/post-treatment" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Finishing%20treatment%20starts%20a%20new%20chapter%20in%20your%20#CancerJourney.%20Find%20out%20what%20to%20expect:%20http%3A//survivorship.cancer.gov/springboard/post-treatment" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Post Treatment%20Action%20Deck&amp;body=Check%20out%20the%20Post%20Treatment%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/post-treatment.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
<li> <a class="btn visible-xs-block visible-sm-block" href="/springboard/support-for-caregivers">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Support for Caregivers</div>
					</a> <a class="btn hidden-xs hidden-sm" data-toggle="collapse" data-parent="#accordion" href="#caregivers-preview" aria-expanded="false" aria-controls="collapse">
					<div class="border-to-arrow"></div>
					<div class="btn-title">Support for Caregivers</div>
					</a>
					<div class="deck-previews">
						<div id="caregivers-preview" class="collapse">
							<div class="row">
								<div class="col-lg-9">
									<h2>Support for Caregivers</h2>
									<p>As a caregiver, you need to know how to take care of yourself and the cancer patient in your life.</p>
									<a class="btn" href="/springboard/support-for-caregivers">
									<div class="border-to-arrow"></div>
									<div class="btn-title">View the Support for Caregivers Deck</div>
									</a>
									<div class="row">
										<div class="col-md-6">
											<div class="getsupport-box">
												<h3>Get Support</h3>
												<ul class="list-unstyled">
													<li><a href="/springboard/get-support/being-a-caregiver">Being a Caregiver</a></li>
													<li><a href="/springboard/get-support/care-for-your-mind">Care for Your Body</a></li>
													<li><a href="/springboard/get-support/care-for-your-body">Care for Your Mind</a></li>
													<li><a href="/springboard/get-support/finding-meaning-purpose">Finding Meaning & Purpose</a></li>
													<li><a href="/springboard/get-support/after-treatment-ends">After Treatment Ends</a></li>
												</ul>
											</div>
										</div>
										<!-- end column --> 
									</div>
									<!-- end row -->
									<div class="bottom-links"> 
										<!-- Download Action Deck -->
										<div class="btn-group">
											<button type="button" class="dropdown-toggle btn-dropdown-blue " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<div class="download-icon"></div>
											DOWNLOAD ACTION DECK</button>
											<ul class="dropdown-menu">
												<li><a href="/sites/all/themes/springboard/cards/pdf/SBC_Support_Caregivers.pdf">
													<div class="pdf-icon"></div>
													PDF</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="/sites/all/themes/springboard/cards/jpg/SBC_Support_Caregivers.zip">
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
												<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//survivorship.cancer.gov/springboard/support-for-caregivers" title="Share on Facebook">
													<div class="facebook-icon"></div>
													Facebook</a></li>
												<li role="separator" class="divider"></li>
												<li><a href="https://twitter.com/home?status=Build%20self-management%20skills%20for%20yourself%20to%20help%20you%20be%20an%20effective%20cancer%20caregiver:%20http%3A//survivorship.cancer.gov/springboard/support-for-caregivers" title="Share on Twitter">
													<div class="twitter-icon"></div>
													Twitter</a></li>
											</ul>
										</div>
										<!-- end share --> 
										<a href="mailto:?subject=Springboard%20Beyond%20Cancer%20Support for Caregivers%20Action%20Deck&amp;body=Check%20out%20the%20Support%20Caregivers%20Action%20Deck%20from%20Springboard%20Beyond%20Cancer%20at%20https://survivorship.cancer.gov/springboard/support-for-caregivers.%20It%20has%20helpful%20actions%20and%20resources%20for%20dealing%20with%20the%20challenges%20and%20experiences%20of%20cancer." target="_top" class="btn-blue"><div class="email-icon"></div>EMAIL</a> </div>
									<!-- end bottom-links --> 
								</div>
								<!-- end column --> 
							</div>
							<!-- end row --> 
						</div> <!-- end collapse -->
					</div> <!-- end deck-previews -->
				</li>
			</ul>
		</div>
		<!-- end column --> 
		<div class="col-md-8 col-lg-9">
			<p class="deck-summary">Your experience with cancer is unique. You can build an action deck with topics that are important to you. Or select an action deck that gives you tips and tools on a specific topic about cancer or treatment.</p>
		</div>
		<!-- end column -->
	</div>
	<!-- end row --> 
</div>
<!-- end box -->',
      'format' => 'raw_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_deck_preview'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_hero_factbox1';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Fact Box 1';
  $box->options = array(
    'body' => array(
      'value' => '<div class="wellness">
<div class="fact-box">
<h3>Want to take control of your health?</h3>

<p>Learn about <a href="/springboard/wellness/self-management">Self-Management</a> and the steps you can take to actively manage your health.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_hero_factbox1'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_hero_factbox2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Fact Box 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you struggling with side effects?</h3>

<p>Explore the <a href="/springboard/symptoms/">Symptoms</a> section for information on <a href="/springboard/symptoms/fatigue">Fatigue</a>, <a href="/springboard/symptoms/nausea">Nausea</a>, and more.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_hero_factbox2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_hero_factbox3';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Fact Box 3';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Need help from doctors and loved ones?</h3>

<p>Learn to make the most of your support system in the <a href="/springboard/get-support/">Get Support</a> section.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_hero_factbox3'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_hero_intro';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Hero Area Intro';
  $box->options = array(
    'body' => array(
      'value' => '<h1>Manage Cancer—Your Way</h1>

<p class="intro">Cancer can bring many challenges. Springboard Beyond Cancer gives you information and resources to help you cope and be in control.</p>

<h2>Springboard Beyond Cancer Can Help</h2>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_hero_intro'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_hero_video';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Hero Area Video';
  $box->options = array(
    'body' => array(
      'value' => '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/iHFJ2vznMtA?rel=0"></iframe></div>
<!-- end youtube embed -->',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_hero_video'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_random_block_1';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Homepage Random Fact Box 1';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box" id="randomize-symptoms"><script>

(function() {
    var symptoms = [
        {
            title: "Are you struggling with side effects?",
            content:  \'Explore the <a href=\\"/springboard/symptoms\\">Symptoms</a> section for information on <a href=\\"/springboard/symptoms/fatigue\\">fatigue</a>, <a href=\\"/springboard/symptoms/nausea\\">nausea</a>, and more physical side-effects of cancer.\',
        },
        {
            title: "Is your cancer treatment causing your hair to fall out?",
            content:  \'Explore information on <a href=\\"/springboard/symptoms/hairloss\\">hair loss</a>.\',
        },
        {
            title: "Do you have trouble eating?",
            content:  \'Explore information on <a href="/springboard/symptoms/appetite-changes">appetite changes</a> and <a href="/springboard/symptoms/nausea">nausea</a>.\',
        },
        {
            title: "Do you often feel tired?",
            content:  \'Explore information on the causes of and treatment for <a href="/springboard/symptoms/fatigue">fatigue</a>.\',
        },
        {
            title: "Do you have trouble thinking and remembering?",
            content:  \'Explore information on <a href="/springboard/symptoms/chemo-brain">chemo-brain and memory problems</a>.\',
        },
        {
            title: "Are you dealing with bowel issues?",
            content:  \'Explore information on <a href="/springboard/symptoms/constipation">constipation</a> and <a href="/springboard/symptoms/diarrhea">diarrhea</a>.\',
        },
        {
            title: "Is your cancer treatment causing your hair to fall out?",
            content:  \'Explore information on <a href=\\"/springboard/symptoms/hairloss\\">hair loss</a>.\',
        },
        {
            title: "Are you worried about having sex during treatment?",
            content:  \'Explore how to decrease sexual problems due to cancer for <a href="/springboard/symptoms/sexual-problems-for-men">men</a> and <a href="/springboard/symptoms/sexual-problems-for-women">women</a>.\',
        },{
            title: "Does pain affect your daily activities?",
            content:  \'Explore information about <a href="/springboard/symptoms/pain">pain</a> and how to manage it.\',
        },


    ];
    var symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
    document.getElementById("randomize-symptoms").innerHTML =
        \'<h3>\' + symptom.title + \'</h3>\' +
        \'<p>\' + symptom.content + \'</p>\';
})();
  </script></div>
<!-- end fact-box --></div>
',
      'format' => 'raw_html',
    ),
  );
  $export['homepage_random_block_1'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_random_block_2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Homepage Random Fact Box 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box" id="randomize-facts">
<script>
(function() {
    var facts = [
        {
            title: "Want to improve the support you receive from doctors and loved ones?",
            content:  \'Learn to make the most of your support system in the <a href="/springboard/get-support">Get Support</a> section.\',
        },
        {
            title: "Want help talking to your doctor about your needs?",
            content:  \'Learn how to <a href="/springboard/get-support/health-care-team">communicate with your health care team</a>.\',
        },
        {
            title: "Not sure what to ask your doctors?",
            content:  \'Find out what questions you should be <a href="/springboard/get-support/health-care-team">asking your health care team</a>.\',
        },
        {
            title: "Want to talk to loved ones about your cancer diagnosis but not sure where to start?",
            content:  \'Find out how to start the conversation with <a href="/springboard/get-support/family-friends-caregivers">family, friends, and loved ones</a>.\',
        },
        {
            title: "Need help getting the support you need from your caregiver(s)?",
            content:  \'Learn how to have your needs met from <a href="/springboard/get-support/family-friends-caregivers">family, friends, and loved ones</a>.\',
        },
        {
            title: "Worried about the security of your job while in treatment?",
            content:  \'Understand your <a href="/springboard/get-support/in-the-workplace">rights in the workplace</a>.\',
        },
        {
            title: "Need to talk to your employer about your diagnosis?",
            content:  \'Learn how to <a href="/springboard/get-support/in-the-workplace">communicate with people in the workplace</a>.\',
        },
        {
            title: "Looking to talk to people who share your experiences?",
            content:  \'Find out about <a href="/springboard/get-support/peer-to-peersupport">peer-to-peer support groups</a>.\',
        },
        {
            title: "Feeling like no one understands what you’re going through?",
            content:  \'Find a <a href="/springboard/get-support/peer-to-peersupport">peer-to-peer support group</a>.\',
        },
        {
            title: "Is your diagnosis keeping you from enjoying your life?",
            content:  \'Learn how to <a href="/springboard/stress-mood/coping-with-cancer">cope with cancer in everyday life</a>.\',
        },
        {
            title: "Are you feeling sad and hopeless?",
            content:  \'Find out if you are <a href="/springboard/stress-mood/depression">depressed</a> and what you can do to improve your mood.\',
        },
        {
            title: "Do you have trouble controlling anxious thoughts?",
            content:  \'Learn how to cope with <a href="/springboard/stress-mood/anxiety">anxiety</a>.\',
        },
        {
            title: "Have you had panic attacks?",
            content:  \'Learn to recognize the signs of panic attacks and learn how to cope with <a href="/springboard/stress-mood/anxiety">anxiety</a>.\',
        },
        {
            title: "Want to cope with stress and your emotions?",
            content:  \'Try some <a href="/springboard/stress-mood/practice-mindfulness">mindfulness and relaxation</a> exercises.\',
        },
        {
            title: "Are you feeling weighed down by your emotions?",
            content:  \'Learn about <a href="/springboard/stress-mood/distress">distress</a> and how to cope with it.\',
        },
        {
            title: "Feeling stressed or overwhelmed?",
            content:  \'Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.\',
        },
        {
            title: "Feeling upset or worried?",
            content:  \'Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.\',
        },
        {
            title: "Feeling sad or anxious?",
            content:  \'Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.\',
        },
        {
            title: "Are you worried about cancer coming back?",
            content:  \'Learn how to cope with <a href="/springboard/stress-mood/fear-of-recurrence">fear of recurrence</a>.\',
        },


    ];
    var fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("randomize-facts").innerHTML =
        \'<h3>\' + fact.title + \'</h3>\' +
        \'<p>\' + fact.content + \'</p>\';
})();
</script>
</div>
<!-- end fact-box --></div>
',
      'format' => 'raw_html',
    ),
  );
  $export['homepage_random_block_2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_video2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Video 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="col-md-8">
<h3>Angie\'s Experience With Breast Cancer - Fatigue</h3>

<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/ipM_QF9sbpE?rel=0"></iframe></div>
<!-- end youtube embed --></div>
<!-- end column -->

<div class="col-md-4">
<p class="video-summary">Angie, a breast cancer survivor, talks about her cancer diagnosis and treatment, as well as her fatigue symptoms during chemotherapy and radiation. By walking between treatments and playing tennis, Angie was able to boost her energy levels and battle fatigue. Angie recommends finding a physical activity you enjoy and pursuing it in a modified way until you\'re able to return to a fully active lifestyle. Visit the <a href="/springboard/symptoms/fatigue">Fatigue</a> page for more information.</p>
</div>
<!-- end column -->',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_video2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'homepage_video3';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Video 3';
  $box->options = array(
    'body' => array(
      'value' => '<div class="col-md-8">
<h3>Montessa\'s Experience With Lung Cancer</h3>

<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/XLunWdjZhGY?rel=0"></iframe></div>
<!-- end youtube embed --></div>
<!-- end column -->

<div class="col-md-4">
<p class="video-summary">Montessa, a lung cancer survivor, talks about her diagnosis and the treatment symptom she struggled with most - fatigue. She discusses the importance of working with your healthcare team and relying on your support networks for help. She also emphasizes the importance of striving to live rather than just survive. Visit the <a href="/springboard/symptoms/fatigue">Fatigue</a> page for more information.</p>
</div>
<!-- end column -->',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['homepage_video3'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'insomnia';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'insomnia';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Having Trouble Sleeping?</h3>

<p><strong>Keep a schedule.</strong> Wake up, go to bed, and rest at the same times each day.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['insomnia'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'random_helptips';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Displays Random Helptips';
  $box->options = array(
    'body' => array(
      'value' => '<div class="tips" id="randomize-tips"><script>

(function() {
  var tips = [
                    {
                      title: "Feeling Alone?",
                        content:  \'<strong>Join a peer group.</strong> It may be helpful to talk with others who have had the same experiences.\',
                    },
                    {
                      title: "Lost Your Appetite?",
                        content:  \'<strong>Eat bland foods.</strong> Avoid foods with strong smells and flavors.\',
                    },
                    {
                      title: "Feeling Distressed?",
                        content:  "<strong>Don\'t overwhelm yourself. </strong>Focus on one thing, one day at a time. Take small steps.",
                    },
                    {
                      title: "Starting a new exercise routine?",
                        content:  \'<strong>Begin with warm-up exercises.</strong> Start slowly and warm up for at least 2 to 3 minutes.\',
                    },
                    {
                      title: "Feeling Fatigued?",
                        content:  \'<strong>Set Priorities.</strong> Identify the most important tasks each day, and then focus your energy on those tasks.\',
                    },
                    {
                      title: "Having Memory Problems?",
                        content:  \'<strong>Leave notes for yourself.</strong> Post reminder notes where you’ll see them, or set alerts on your phone.\',
                    },
                    {
                      title: "Has Your Hair Fallen Out?",
                        content:  \'<strong>Protect your skin.</strong> Use sunscreen or wear a head cover to avoid sun exposure.\',
                    },
                    {
                      title: "Having Trouble Sleeping?",
                        content:  \'<strong>Keep a schedule.</strong> Wake up, go to bed, and rest at the same times each day.\',
                    },
                    {
                      title: "Having Mouth or Throat Problems?",
                        content:  \'<strong>Eat soft foods.</strong> Choose foods that are soft, wet, and easy to swallow.\',
                    },
                    {
                      title: "Nauseated After Treatment?",
                        content:  "<strong>Fast before and after treatment.</strong> Don\'t eat for one hour before and after treatment.",
                    },
                    {
                      title: "Numb in Your Hands or Feet?",
                        content:  \'<strong>Be careful at night.</strong> Avoid injuries by using a night light or flashlight.\',
                    },
                    {
                      title: "Feeling Anxious?",
                        content:  \'<strong>Relax. </strong>Set aside time each day to do relaxation exercises.\',
                    },
                    {
                      title: "Need Help from Loved Ones?",
                        content:  \'<strong>Ask for help.</strong> Your loved ones want to support you. Be specific about the kinds of help you need.\',
                    },


                ];
                var tip = tips[Math.floor(Math.random() * tips.length)];
                document.getElementById("randomize-tips").innerHTML =
                  \'<h3>\' + tip.title + \'</h3>\' +
                  \'<p>\' + tip.content + \'</p>\';
            })();
        </script></div>',
      'format' => 'raw_html',
    ),
    'additional_classes' => '',
  );
  $export['random_helptips'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sb_home_placeholder2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Homepage Infographics';
  $box->options = array(
    'body' => array(
      'value' => '<div class="row">
	<div class="col-lg-12">
		<h2>What Are Action Decks?</h2>
	</div>
	<!-- end column --></div>
<!-- end row -->
<div class="row">
	<div class="col-lg-12">
		<div class="box">
			<p class="infographic-summary">Action Decks are collections of information related to a cancer topic or treatment.</p>
		</div>
		<div id="infographic-container">
			<div id="infographic-slider">
				<a href="/springboard/create-action-deck" class="infographic1">
					<div class="graphic">
						<img alt="Creating an Action Deck on their computer" src="/sites/all/themes/springboard/images/infographic-1.png"></div>
					<div class="step">
						<p class="sr-only">Number 1</p>
						<p><span class="infographic-title">CREATE</span>or choose an<br>action deck</p>
					</div>
				</a>
				<a href="/springboard/create-action-deck" class="infographic2">
					<div class="graphic">
						<img alt="Downloading and printing out their action deck" src="/sites/all/themes/springboard/images/infographic-2.png"></div>
					<div class="step">
						<p class="sr-only">Number 2</p>
						<p><span class="infographic-title">DOWNLOAD</span>and print your<br>action deck.</p>
					</div>
				</a>
				<a href="/springboard/create-action-deck" class="infographic3">
					<div class="graphic">
						<img alt="Using their action deck for manage symptoms" src="/sites/all/themes/springboard/images/infographic-3.png"></div>
					<div class="step">
						<p class="sr-only">Number 3</p>
						<p><span class="infographic-title">USE THE ACTION DECK</span>to help manage<br>your symptoms.</p>
					</div>
				</a>
				<a href="/springboard/create-action-deck" class="infographic4">
					<div class="graphic">
						<img alt="Revisiting Springboard Beyond Cancer for additional help as needed" src="/sites/all/themes/springboard/images/infographic-4.png"></div>
					<div class="step">
						<p class="sr-only">Number 4</p>
						<p><span class="infographic-title">COME BACK</span>for more help when<br>you need it.</p>
					</div>
				</a>
			</div>
			<!-- end infographic-slider --></div>
		<!-- end infographic-container --></div>
	<!-- end column --></div>
<!-- end row -->',
      'format' => 'raw_html',
    ),
    'additional_classes' => '',
  );
  $export['sb_home_placeholder2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptom_4';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 4';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Do you have trouble eating?</h3>

<p>Explore information on <a href="/springboard/symptoms/appetite-changes">appetite changes</a> and <a href="/springboard/symptoms/nausea">nausea</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptom_4'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_10';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 10';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Is your cancer treatment causing your hair to fall out?</h3>

<p>Explore information on <a href="/springboard/symptoms/hairloss">hair loss</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_10'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_3';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 3';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you struggling with side effects?</h3>

<p>Explore the <a href="/springboard/symptoms">Symptoms</a> section for information on <a href="/springboard/symptoms/hot-flashes">hot flashes</a>, <a href="/springboard/symptoms/skin-and-nail-changes">skin problems</a>, and more physical side-effects of cancer.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_3'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_5';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 5';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Do you often feel tired?</h3>

<p>Explore information on the causes of and treatment for <a href="/springboard/symptoms/fatigue">fatigue</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_5'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_6';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 6';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Do you have trouble thinking and remembering?</h3>

<p>Explore information on <a href="/springboard/symptoms/chemo-brain">chemo-brain and memory problems</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_6'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_7';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 7';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you dealing with bowel issues?</h3>

<p>Explore information on <a href="/springboard/symptoms/constipation">constipation</a> and <a href="/springboard/symptoms/diarrhea">diarrhea</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_7'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_8';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 8';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you worried about having sex during treatment?</h3>

<p>Explore how to decrease sexual problems due to cancer for <a href="/springboard/symptoms/sexual-problems-for-men">men</a> and <a href="/springboard/symptoms/sexual-problems-for-women">women</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_8'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptoms_9';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 9';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Does pain affect your daily activities?</h3>

<p>Explore information about <a href="/springboard/symptoms/pain">pain</a> and how to manage it.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptoms_9'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptons_1';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 1';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you struggling with side effects?</h3>

<p>Explore the <a href="/springboard/symptoms">Symptoms</a> section for information on <a href="/springboard/symptoms/fatigue">fatigue</a>, <a href="/springboard/symptoms/nausea">nausea</a>, and more physical side-effects of cancer.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptons_1'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_box_symptons_2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Symptoms 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="symptoms">
<div class="fact-box">
<h3>Are you struggling with side effects?</h3>

<p>Explore the <a href="/springboard/symptoms">Symptoms</a> section for information on <a href="/springboard/symptoms/pain">pain</a>, <a href="/springboard/symptoms/swelling">swelling</a>, and more physical side-effects of cancer.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_box_symptons_2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_1';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 1';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Want to improve the support you receive from doctors and loved ones?</h3>

<p>Learn to make the most of your support system in the <a href="/springboard/get-support">Get Support</a> section.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_1'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Want help talking to your doctor about your needs?</h3>

<p>Learn how to <a href="/springboard/get-support/health-care-team">communicate with your health care team</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_3';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 3';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Not sure what to ask your doctors?</h3>

<p>Find out what questions you should be <a href="/springboard/get-support/health-care-team">asking your health care team</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_3'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_4';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 4';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Want to talk to loved ones about your cancer diagnosis but not sure where to start?</h3>

<p>Find out how to start the conversation with <a href="/springboard/get-support/family-friends-caregivers">family, friends, and loved ones</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_4'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_5';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 5';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Need help getting the support you need from your caregiver(s)?</h3>

<p>Learn how to have your needs met from <a href="/springboard/get-support/family-friends-caregivers">family, friends, and loved ones</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_5'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_6';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 6';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Worried about the security of your job while in treatment?</h3>

<p>Understand your <a href="/springboard/get-support/in-the-workplace">rights in the workplace</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_6'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_7';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 7';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Need to talk to your employer about your diagnosis?</h3>

<p>Learn how to <a href="/springboard/get-support/in-the-workplace">communicate with people in the workplace</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_7'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_8';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 8';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Looking to talk to people who share your experiences?</h3>

<p>Find out about <a href="/springboard/get-support/peer-to-peersupport">peer-to-peer support groups</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_8'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_getsupport_9';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Get Support 9';
  $box->options = array(
    'body' => array(
      'value' => '<div class="getsupport">
<div class="fact-box">
<h3>Feeling like no one understands what you’re going through?</h3>

<p>Find a <a href="/springboard/get-support/peer-to-peersupport">peer-to-peer support group</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_getsupport_9'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_1';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Box Stress 1';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Feeling stressed or overwhelmed?</h3>

<p>Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_1'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_10';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 10';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Is your diagnosis keeping you from enjoying your life?</h3>

<p>Learn how to <a href="/springboard/stress-mood/coping-with-cancer">cope with cancer in everyday life</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_10'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_2';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Box Stress 2';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Feeling upset or worried?</h3>

<p>Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_2'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_3';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Box Stress 3';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Feeling sad or anxious</h3>

<p>Understand the emotional challenges of cancer and what you can do to improve your stress levels in <a href="/springboard/stress-mood">Stress &amp; Mood</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_3'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_4';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Box Stress 4';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Are you worried about cancer coming back?</h3>

<p>Learn how to cope with <a href="/springboard/stress-mood/fear-of-recurrence">fear of recurrence</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_4'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_5';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 5';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Are you feeling sad and hopeless?</h3>

<p>Find out if you are <a href="/springboard/stress-mood/depression">depressed</a> and what you can do to improve your mood.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_5'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_6';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 6';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Do you have trouble controlling anxious thoughts?</h3>

<p>Learn how to cope with <a href="/springboard/stress-mood/anxiety">anxiety</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_6'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_7';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 7';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Have you had panic attacks?</h3>

<p>Learn to recognize the signs of panic attacks and learn how to cope with <a href="/springboard/stress-mood/anxiety">anxiety</a>.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_7'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_8';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 8';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Want to cope with stress and your emotions?</h3>

<p>Try some <a href="/springboard/stress-mood/practice-mindfulness">mindfulness and relaxation</a> exercises.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_8'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'sbc_stress_9';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Fact Box Stress 9';
  $box->options = array(
    'body' => array(
      'value' => '<div class="stressmood">
<div class="fact-box">
<h3>Are you feeling weighed down by your emotions?</h3>

<p>Learn about <a href="/springboard/stress-mood/distress">distress</a> and how to cope with it.</p>
</div>
<!-- end fact-box --></div>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['sbc_stress_9'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'springboard_action_decks';
  $box->plugin_key = 'simple';
  $box->title = 'Action Decks';
  $box->description = 'Springboard Action Decks Landing Page';
  $box->options = array(
    'body' => array(
      'value' => '<div id="mockup-top">
<div class="container">
<div class="row">
<div class="col-lg-9">
<p>Use these card decks to help manage your symptoms from cancer treatment.</p>
</div>
</div>
</div>
</div>

<div class="container">
<div class="row">
<div class="col-lg-12">
<div class="decks-nav-box" style="background-color:#f2f6f7;	border-radius:3px;width:100%;padding:25px 25px 0px 25px;	border-bottom:2px solid #e1e5e6;">
<div class="row">
<div class="col-md-3"><a class="btn" href="create.html">Create an Action Deck</a></div>

<div class="col-md-3"><a class="btn" href="#">New Diagnosis</a></div>

<div class="col-md-3"><a class="btn" href="#">Surgery</a></div>

<div class="col-md-3"><a class="btn" href="#">Chemotherapy</a></div>

<div class="col-md-3"><a class="btn" href="radiation.html">Radiation</a></div>

<div class="col-md-3"><a class="btn" href="#">Coping with Cancer</a></div>

<div class="col-md-3"><a class="btn" href="#">Social Support</a></div>

<div class="col-md-3"><a class="btn" href="#">Living Well</a></div>
</div>
</div>
</div>
</div>
</div>

<div class="deck-landing-graphic">
<div class="container">
<div class="row">
<div class="col-lg-12"><img alt="Action Decks Landing Graphic" src="http://icfcreative.com/ACS-NCI/v3/images/decks-landing.png" /></div>
</div>

<div class="row">
<div class="col-lg-12">
<div style="height:40px;">&nbsp;</div>
</div>
</div>
</div>
</div>

<p>&nbsp;</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['springboard_action_decks'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'springboard_helpful_tips';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'Springboard Helpful Tips';
  $box->options = array(
    'body' => array(
      'value' => '<h2 class="helpful-tips">
	<img alt="Tips Icon" class="tip-icon" src="/sites/all/themes/springboard/images/tip-icon.png">Helpful Tips</h2>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['springboard_helpful_tips'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'stress';
  $box->plugin_key = 'simple';
  $box->title = '';
  $box->description = 'stress';
  $box->options = array(
    'body' => array(
      'value' => '<h3>Dealing with stress?</h3>

<p><strong>Practice mindfulness.</strong> Learn how to relax your body and mind. Slow down and breathe.</p>
',
      'format' => 'full_html',
    ),
    'additional_classes' => '',
  );
  $export['stress'] = $box;

  $box = new stdClass();
  $box->disabled = FALSE; /* Edit this to true to make a default box disabled initially */
  $box->api_version = 1;
  $box->delta = 'video_stories_featured';
  $box->plugin_key = 'simple';
  $box->title = 'Featured Video';
  $box->description = 'Video Stories Featured Video';
  $box->options = array(
    'body' => array(
      'value' => '<div class="col-md-12">
<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/W3B7SWwHBiU?rel=0"></iframe></div>

<h3>Carolyn\'s Breast Cancer Experience — Getting Through the Tough Days</h3>

<p class="video-summary">Carolyn, a breast cancer survivor, talks about her initial diagnosis and treatment, and difficult decisions she had to make during her treatment process due to unexpected bumps in the road, including testing positive for the breast cancer gene. She discusses the need to keep moving, how to get through the tough days, and the importance of taking things one day at a time.</p>
</div>',
      'format' => 'raw_html',
    ),
  );
  $export['video_stories_featured'] = $box;

  return $export;
}
