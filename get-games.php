<?php
if (file_exists('catalog.xml')) {
    $games = simplexml_load_file('catalog.xml');
} else {
    exit('Failed to open catalog.xml');
}

echo json_encode($games);