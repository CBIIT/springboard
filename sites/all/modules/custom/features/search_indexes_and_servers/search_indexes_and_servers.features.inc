<?php
/**
 * @file
 * search_indexes_and_servers.features.inc
 */

/**
 * Implements hook_default_search_api_index().
 */
function search_indexes_and_servers_default_search_api_index() {
  $items = array();
  $items['springboard_index'] = entity_import('search_api_index', '{
    "name" : "Springboard Index",
    "machine_name" : "springboard_index",
    "description" : null,
    "server" : "springboard_db",
    "item_type" : "node",
    "options" : {
      "datasource" : { "bundles" : [] },
      "index_directly" : 0,
      "cron_limit" : "50",
      "fields" : {
        "body:summary" : { "type" : "text" },
        "body:value" : { "type" : "text" },
        "search_api_language" : { "type" : "string" },
        "status" : { "type" : "integer" },
        "title" : { "type" : "text" },
        "type" : { "type" : "string" }
      }
    },
    "enabled" : "1",
    "read_only" : "0",
    "rdf_mapping" : []
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function search_indexes_and_servers_default_search_api_server() {
  $items = array();
  $items['springboard_db'] = entity_import('search_api_server', '{
    "name" : "Springboard DB",
    "machine_name" : "springboard_db",
    "description" : "",
    "class" : "search_api_db_service",
    "options" : {
      "database" : "default:default",
      "min_chars" : "1",
      "partial_matches" : 0,
      "indexes" : { "springboard_index" : {
          "search_api_language" : {
            "table" : "search_api_db_springboard_index",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "body:value" : {
            "table" : "search_api_db_springboard_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "body:summary" : {
            "table" : "search_api_db_springboard_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "type" : {
            "table" : "search_api_db_springboard_index",
            "column" : "type",
            "type" : "string",
            "boost" : "1.0"
          },
          "title" : {
            "table" : "search_api_db_springboard_index_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "status" : {
            "table" : "search_api_db_springboard_index",
            "column" : "status",
            "type" : "integer",
            "boost" : "1.0"
          }
        }
      }
    },
    "enabled" : "1",
    "rdf_mapping" : []
  }');
  return $items;
}
