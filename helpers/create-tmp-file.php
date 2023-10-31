<?php

$file_data = new stdClass();
$file_data->name = null;
$file_data->type = null;
$file_data->size = null;
$file_data->tmp_name = null;

if (
        
    filter_has_var(INPUT_POST, 'file_type') &&
    isset($_FILES["file_upload"])  &&
    filter_has_var(INPUT_POST, 'uploads_path')
            
    ) {
    
    $file_type = filter_input(INPUT_POST, "file_type");
    $file_upload = $_FILES["file_upload"];
    $uploads_path = filter_input(INPUT_POST, "uploads_path");
    
    $file_data->name = $file_upload['name'];
    $file_data->type = $file_upload['type'];
    $file_data->size = $file_upload['size'];

    if ($file_type === 'shape' && $file_upload["type"] === "application/zip") {

        $target_dir = $uploads_path . "/shape/tmp/";
        $target_file = $target_dir . $file_upload["name"];

        if (copy($file_upload["tmp_name"], $target_file)) {
            
            $file_data->tmp_name = $target_dir;
            
        }
            
            
    } else if ($file_type === 'geojson' && $file_upload['type'] === 'application/geo+json') {
        
        $target_dir = $uploads_path . "/geojson/tmp/";
        $target_file = $target_dir . $file_upload["name"];
        
        if (copy($file_upload["tmp_name"], $target_file)) {
            
            $file_data->tmp_name = $target_dir;
            
        }
        
    }
    
    else if ($file_type === 'kml' && $file_upload['type'] === 'application/vnd.google-earth.kml+xml') {

        $target_dir = $uploads_path . "/kml/tmp/";
        $target_file = $target_dir . $file_upload["name"];
        
        if (copy($file_upload["tmp_name"], $target_file)) {
            
            $file_data->tmp_name = $target_dir;
            
        }
        
    }
}

echo json_encode($file_data);