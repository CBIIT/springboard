<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<div class="<?php print $classes; ?>">
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
        <?php print $title; ?>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if ($header): ?>
        <div class="view-header">
            <?php print $header; ?>
        </div>
    <?php endif; ?>

    <?php if ($exposed): ?>
        <div class="view-filters">
            <?php print $exposed; ?>
        </div>
    <?php endif; ?>

    <?php if ($attachment_before): ?>
        <div class="attachment attachment-before">
            <?php print $attachment_before; ?>
        </div>
    <?php endif; ?>

    <?php if ($rows): ?>
        <section class="decks">
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel-pane pane-block pane-boxes-homepage-deck-preview block-boxes-simple ">


                        <div class="pane-content">
                            <div id="boxes-box-homepage_deck_preview" class="boxes-box">
                                <div class="boxes-box-content">
                                    <div class="box">
                                        <div class="row">
                                            <div class="col-sm-9 col-md-7">
                                                <h2>Create your own action deck or choose an action deck we’ve made for
                                                    you.</h2>
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
                                                            Create an Action Deck with the topics that are most
                                                            important to you. </a></li>
                                                    <?php print $rows; ?>
                                                </ul>
                                            </div>
                                            <!-- end column -->
                                            <div class="col-md-8 col-lg-9">
                                                <p class="deck-summary">Your experience with cancer is unique. You can
                                                    build an action deck with
                                                    topics that are important to you. Or select an action deck that
                                                    gives you tips and tools on a
                                                    specific topic about cancer or treatment.</p>
                                            </div>
                                            <!-- end column -->
                                        </div>
                                        <!-- end row -->
                                    </div>
                                    <!-- end box -->
                                </div>
                            </div>
                        </div>


                    </div>
                </div> <!-- end column -->
            </div> <!-- end row -->
        </section>
    <?php elseif ($empty): ?>
        <div class="view-empty">
            <?php print $empty; ?>
        </div>
    <?php endif; ?>

    <?php if ($pager): ?>
        <?php print $pager; ?>
    <?php endif; ?>

    <?php if ($attachment_after): ?>
        <div class="attachment attachment-after">
            <?php print $attachment_after; ?>
        </div>
    <?php endif; ?>

    <?php if ($more): ?>
        <?php print $more; ?>
    <?php endif; ?>

    <?php if ($footer): ?>
        <div class="view-footer">
            <?php print $footer; ?>
        </div>
    <?php endif; ?>

    <?php if ($feed_icon): ?>
        <div class="feed-icon">
            <?php print $feed_icon; ?>
        </div>
    <?php endif; ?>

</div><?php /* class view */ ?>
