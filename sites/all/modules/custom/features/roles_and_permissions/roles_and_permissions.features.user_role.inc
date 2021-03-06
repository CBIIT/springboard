<?php
/**
 * @file
 * roles_and_permissions.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function roles_and_permissions_user_default_roles() {
  $roles = array();

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => 2,
  );

  // Exported role: springboard content admin.
  $roles['springboard content admin'] = array(
    'name' => 'springboard content admin',
    'weight' => 3,
  );

  return $roles;
}
