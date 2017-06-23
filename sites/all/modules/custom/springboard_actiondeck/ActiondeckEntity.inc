<?php

/**
 * Class ActiondeckEntity.
 */
class ActiondeckEntity extends Entity {

  public function __construct($values = array()) {
    parent::__construct($values, 'actiondeck');
  }

  protected function defaultUri() {
    return array('path' => 'springboard/actiondeck/' . $this->identifier());
  }

  protected function defaultLabel() {
    return array('path' => 'springboard/actiondeck/' . $this->identifier());
  }
}
