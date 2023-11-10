<?php

require "helpers/google-translate-php/vendor/autoload.php";
use Stichoza\GoogleTranslate\GoogleTranslate;

class tool_leaflet_special_tools extends tool_common  {

    public static function vector_download(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';

        $response->vector_type = $options->vector_type;

        $response->vector_name = strip_tags($options->vector_name);

        $replace = [

                "\"", "'", "\\", "/", "¿", "?", "!", "¡", "$", "#", "@", "&", ":", ";",
                "*", "+", "·", "½", "~", "%", "¬", "{", "}", "[", "]", "(", ")", "ç",
                "<", ">", "º", "ª", "^", "´", "`", "Ç", "ñ", "Ñ", "¨"

            ];

        $response->vector_name = str_replace(" ", '-', $response->vector_name);
        $response->vector_name = str_replace($replace, '', $response->vector_name);

        $response->content = $options->content;

        if ($response->vector_type === 'geojson') {
            
            $temporal_file_name = $response->vector_name . '.geojson';

            $temporal_file = self::downloads_path() . '/vector-download/geojson/' . $response->vector_name . '.geojson';

            $fp = fopen($temporal_file, "w+");
            fwrite($fp, $response->content);
            fclose($fp);

            sleep(2);

            $zipArchive = new ZipArchive();
            
            $zipName = $response->vector_name . ".zip";
            $zipFile =  self::downloads_path() . '/vector-download/geojson/' .  $zipName;

            if (file_exists($zipFile)) {

                unlink($zipFile);

            }
            
            $create_file = true;
            
            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

                $response->success = false;
                $response->msg = "No ha sido posible crear el archivo. Administre los permisos de escritura.";
                
                $create_file = false;
                
            } 
            
            if ($create_file) {
                
                $zipArchive->addFile($temporal_file, $temporal_file_name);

                $zipArchive->close();

                unlink($temporal_file);

                $response->success = true;
                $response->zip = self::downloads_url() . '/vector-download/geojson/' . $zipName;
                $response->msg = 'ok';
            
            }
            

        } else if ($response->vector_type === 'shp') {

            $temporal_geojson_name = $response->vector_name . '.geojson';
            $temporal_geojson_file = self::downloads_path() . '/vector-download/shp/' . $temporal_geojson_name;
            
            $temporal_shape_name = $response->vector_name . '.' . $response->vector_type;
            $temporal_shape_file =  self::downloads_path() . '/vector-download/shp/' .  $temporal_shape_name;
            
            $temporal_shx_name = $response->vector_name . '.shx';
            $temporal_shx_file = self::downloads_path() . '/vector-download/shp/' .  $temporal_shx_name;
            
            $temporal_prj_name = $response->vector_name . '.prj';
            $temporal_prj_file = self::downloads_path() . '/vector-download/shp/' .  $temporal_prj_name;
            
            $temporal_dbf_name = $response->vector_name . '.dbf';
            $temporal_dbf_file = self::downloads_path() . '/vector-download/shp/' .  $temporal_dbf_name;

            $fp = fopen($temporal_geojson_file, "w+");
            fwrite($fp, $response->content);
            fclose($fp);
            
            sleep(2);

            shell_exec("ogr2ogr -f 'ESRI ShapeFile' -a_srs EPSG:4326 $temporal_shape_file $temporal_geojson_file");

            
            $zipArchive = new ZipArchive();
            
            $zipName = $response->vector_name . ".zip";
            $zipFile = self::downloads_path() . '/vector-download/shp/' . $zipName;

            if (file_exists($zipFile)) {

                unlink($zipFile);

            }
            
            $create_file = true;
            
            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

                $response->success = false;
                $response->msg = "No ha sido posible crear el archivo. Administre los permisos de escritura.";
                
                $create_file = false;

            }
            
            if ($create_file) {
                
                $zipArchive->addFile($temporal_shape_file, $temporal_shape_name);
                $zipArchive->addFile($temporal_shx_file, $temporal_shx_name);
                $zipArchive->addFile($temporal_prj_file, $temporal_prj_name);
                $zipArchive->addFile($temporal_dbf_file, $temporal_dbf_name);

                $zipArchive->close();

                unlink($temporal_geojson_file);
                unlink($temporal_shape_file);
                unlink($temporal_shx_file);
                unlink($temporal_prj_file);
                unlink($temporal_dbf_file);

                $response->success = true;
                $response->zip = self::downloads_url() . '/vector-download/shp/' . $zipName;
                $response->msg = 'ok';
            
            }

        } else if ($response->vector_type === 'kml') {

            $temporal_geojson_name = $response->vector_name . '.geojson';
            $temporal_geojson_file = self::downloads_path() . '/vector-download/kml/' . $temporal_geojson_name;
            
            $temporal_kml_name = $response->vector_name . '.kml';
            $temporal_kml_file =  self::downloads_path() . '/vector-download/kml/' . $temporal_kml_name;

            $fp = fopen($temporal_geojson_file, "w+");
            fwrite($fp, $response->content);
            fclose($fp);

            sleep(2);

            shell_exec("ogr2ogr -f 'KML' -a_srs EPSG:4326 $temporal_kml_file $temporal_geojson_file");

            sleep(2);

            $zipArchive = new ZipArchive();
            
            $zipName = $response->vector_name . ".zip";
            
            $zipFile = self::downloads_path() . '/vector-download/kml/' . $zipName;

            if (file_exists($zipFile)) {

                unlink($zipFile);

            }
            
            $create_file = true;
            
            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

                $response->success = false;
                $response->msg = "No ha sido posible descargar el archivo";
                
                $create_file = false;
                
            }
            
            if ($create_file) {
                
                $zipArchive->addFile($temporal_kml_file, $temporal_kml_name);

                $zipArchive->close();

                unlink($temporal_geojson_file);
                unlink($temporal_kml_file);

                $response->success = true;
                $response->zip = self::downloads_url() . '/vector-download/kml/' . $zipName;
                $response->msg = 'ok';
            
            }

        } else {
            
            $response->success = false;
            $response->msg = "El tipo de archivo no es válido";
            
        }
        
        return $response;
        
    }

    public static function geotiff_download(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->bounds = $options->bounds;

        $response->url = $options->url;
        
        $response->raster_name = strip_tags($options->raster_name);

        $replace = [

                "\"", "'", "\\", "/", "¿", "?", "!", "¡", "$", "#", "@", "&", ":", ";",
                "*", "+", "·", "½", "~", "%", "¬", "{", "}", "[", "]", "(", ")", "ç",
                "<", ">", "º", "ª", "^", "´", "`", "Ç", "ñ", "Ñ", "¨"

            ];

        $response->raster_name = str_replace(" ", "-", $response->raster_name);
        $response->raster_name = str_replace($replace, '', $response->raster_name);

        $im = file_get_contents($response->url);

        if (!$im) {
            
            $response->success = false;
            $response->msg = 'No ha sido posible obtener la imagen';


        } else {

            $blob_name = $response->raster_name . ".png";
            $blob_file = self::downloads_path() . '/geotiff-download/' . $blob_name;

            $geotiff_name = $response->raster_name . ".tif";
            $geotiff_file = self::downloads_path() . '/geotiff-download/' . $geotiff_name;

            file_put_contents($blob_file, $im);

            sleep(3);

            shell_exec("gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr " . $response->bounds . " -outsize 100% 100% -co TILED=YES -co COMPRESS=LZW -co ALPHA=YES $blob_file $geotiff_file"); 

            sleep(2);

            $zipArchive = new ZipArchive();
            
            $zipName = $response->raster_name . ".zip";
            
            $zipFile = self::downloads_path() . '/geotiff-download/' . $zipName;

            if (file_exists($zipFile)) {

                unlink($zipFile);

            }
            
            $create_file = true;
            
            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {
                
                $response->success = false;
                $response->msg = 'Ha ocurrido un error al crear el archivo';
                
                $create_file = false;

            }
            
            if ($create_file) {
                
                $zipArchive->addFile($geotiff_file, $geotiff_name);
                $zipArchive->close();

                unlink($blob_file);
                unlink($geotiff_file);

                $response->success = true;
                $response->zip = self::downloads_url() . '/geotiff-download/' . $zipName;
                $response->msg = 'ok';
            
            }
            
        }
        
        return $response;
        
    }
    
    public static function image_download(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->image_src = $options->image_src;
        $response->image_type = $options->image_type;
        $response->image_name = $options->raster_name;
        
        $replace = [

                "\"", "'", "\\", "/", "¿", "?", "!", "¡", "$", "#", "@", "&", ":", ";",
                "*", "+", "·", "½", "~", "%", "¬", "{", "}", "[", "]", "(", ")", "ç",
                "<", ">", "º", "ª", "^", "´", "`", "Ç", "ñ", "Ñ", "¨"

            ];
        
        $response->image_name = str_replace(" ", '-', $response->image_name);

        $response->image_name = str_replace($replace, '', $response->image_name);

        $im = file_get_contents($response->image_src);

        if (!$im) {

            $response->success = false;
            $response->msg = 'No ha sido posible obtener la imagen.';

        }

        $image_name = $response->image_name . '.' . $response->image_type;
        $image_file = self::downloads_path() . '/image-download/' . $image_name;

        $blob_name = $image_name . ".png";
        $blob_file = self::downloads_path() . '/image-download/' . $blob_name;

        file_put_contents($blob_file, $im);

        sleep(3);

        $image = new Imagick($blob_file);

        $image->setImageFormat($response->image_type);

        $image->setImageCompressionQuality(100);

        $image->writeImage($image_file);

        $image->clear();

        $image->destroy();

        $zipArchive = new ZipArchive();
        
        $zipName = $response->image_name . ".zip";
        
        $zipFile = self::downloads_path() . '/image-download/' . $zipName;
        
        if (file_exists($zipFile)) {
            
            unlink($zipFile);
            
        }
        
        $create_file = true;

        if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

            $response->success = false;
            $response->msg = 'Ha ocurrido un error al crear el archivo';
            
            $create_file = false;

        }

        if ($create_file) {
            
            $zipArchive->addFile($image_file, $image_name);
            $zipArchive->close();

            unlink($blob_file);
            unlink($image_file);

            $response->success = true;
            $response->zip = self::downloads_url() . '/image-download/' . $zipName;
            $response->msg = 'ok';
        
        }
       
        return $response;
        
    }    
    
    public static function get_catastro_refcat(object $options): object {

        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->url = $options->url;

        $response->content = file_get_contents($response->url);

        if ($response->content) {

            $response->content = str_replace('<?xml version="1.0" encoding="ISO-8859-1"?>', '', $response->content);
            $response->content = str_replace('<!DOCTYPE html ', '', $response->content);
            $response->content = str_replace('PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"', '', $response->content);
            $response->content = str_replace('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">', '', $response->content);
            $response->content = str_replace('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="sp"  lang="sp" >', '', $response->content);
            $response->content = str_replace('<head><title>Informaci&oacute;n parcelas</title></head><body><p>Referencia catastral de la parcela:</p><p>', '', $response->content);
            $response->content = str_replace('</p></body></html>', '', $response->content);
                
            $response->success = true;
            $response->msg = 'ok';
            
        } else {
            
            $response->success = false;
            $response->msg = 'No ha sido posible establecer una conexión con el servidor.';
            
        }
        
        return $response;

    }
    
    public static function get_catastro_feature(object $options): object {

        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->url = $options->url;

        $response->content = file_get_contents($response->url);
        
        $response->reference = $options->reference;

        if ($response->content) {

            $xml = simplexml_load_string($response->content);

            @$xpaths = $xml->xpath('//gml:posList');

            if (isset($xpaths[$response->reference]) && count($xpaths) > 0) {

                $elements = [];

                $reference = explode(' ', $xpaths[$response->reference]);

                for ($x = 0; $x < count($reference); $x++) {

                    array_push($elements, [floatval($reference[$x]), floatval($reference[$x+1])]);

                    $x++;

                }

                if (count($elements) > 0) {

                    $response->success = true;
                    
                    $response->feature = json_encode($elements);
                    
                    $response->msg = 'ok';

                }

            }

        }
            
        return $response;

    }

    public static function get_UA(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->url = $options->url;

        $response->feature = file_get_contents($response->url);

        if ($response->feature) {
            
            $response->feature = json_decode($response->feature);
            
            $response->success = true;
            
            $response->msg = 'ok';

        } 
        
        return $response;
        
    }
    
    public static function get_pleiades_json(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->type = $options->type;

        $response->value = $options->value;
        
        $json_service = DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/leaflet.control.SpecialTools/leaflet.control.SpecialToolsRomanEmpire/services/pleiades/pleiades.json';

        if ($response->type === 'name') {

            $pleiades_file = file_get_contents($json_service);

            if (!$pleiades_file) {

                $response->success = false;
                $response->msg = 'No ha sido posible establecer una conexión.';

            } else {

                $pleiades_array = json_decode($pleiades_file);

                $limit = 1;
                
                $object = [];

                foreach ($pleiades_array as $index => $val) {

                    if (strlen($response->value) > 2 && $limit <= 10) {

                        if (str_contains(strtolower($val[0]), strtolower($response->value))) {

                            array_push($object, ['name' => $val[0], 'id' => $val[1]]);

                            $limit++;
                            
                        }
                    }
                } 
            }
  
        } else if ($response->type === 'id') {
            

            $pleiades_file = file_get_contents($json_service);

            if (!$pleiades_file) {

                $response->success = false;
                $response->msg = 'No ha sido posible establecer una conexión.';

            } else {

            $pleiades_array = json_decode($pleiades_file);

            $limit = 1;

            $object = [];

            foreach ($pleiades_array as $index => $val) {

                if ($val[1] == $response->value && $limit <= 10) {

                        array_push($object, ['name' => $val[0], 'id' => $val[1]]);

                    }
                }
            }
        }
        
        if (isset($object)) {

            $response->content = json_encode($object);
            $response->success = true;
            $response->msg = 'ok';
        
        }
        
        return $response;
        
    }
    
    public static function get_pleiades_service(object $options) : object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->id = $options->id;

        $url = "https://raw.githubusercontent.com/ryanfb/pleiades-geojson/gh-pages/geojson/" . $response->id . ".geojson";

        $response->content = file_get_contents($url);
        
        if ($response->content) {
            
            $response->success = true;
            $response->msg = 'ok';
            
        } else {
            
            $response->success = false;
            $response->msg = 'No ha sido posible establecer una conexión con el servidor';
            
        }

        return $response;

    }
    
    public static function get_pelagios(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';

        $response->query = $options->query;

        $response->files = $options->filter;

        $objects = [];

        $limit = 1;
        
        if (count($response->files) === 0) {
            
            $response->success = false;
            
            return $response;
            
        }

        foreach ($response->files as $file) {
            
            $geojson_file = DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/leaflet.control.SpecialTools/leaflet.control.SpecialToolsRomanEmpire/services/pelagios/data/'.$file.'.geojson';

            $content = file_get_contents($geojson_file);

            if (!$content) {

                $response->success = false;
                
                return $response;

            }

            $contents = json_decode($content);

            foreach ($contents->features as $geojson) {

                foreach ($geojson->properties as $key => $val) {

                    if (strlen($response->query) >= 3 && $limit <= 10) {

                        $string_1 = str_split(utf8_decode($response->query));
                        $string_2 = str_split(utf8_decode($val));

                        $matches_founds = 0;

                        for ($x = 0; $x < count($string_1); $x++) {

                            if (isset($string_2[$x])) {

                                if (str_contains(strtolower($string_1[$x]), strtolower($string_2[$x]))) {

                                    $matches_founds++;

                                }

                            }

                        }

                        if (str_contains(strtolower(utf8_decode($val)), strtolower($response->query)) || str_contains(strtolower($val), strtolower($response->query))) {

                            $object = [

                                "geometry_type" => $geojson->geometry->type,

                                "file" => $file . '.geojson',

                                "value" => $val,

                                "geojson" => json_encode($geojson)

                            ];

                            array_push($objects, $object);

                            $limit++;

                            continue;

                        }

                    }
                }
            }
            
        }
        
        if (count($objects) > 0) {
            
            $response->success = true;
            $response->content = $objects;
        
        }
        
        return $response;
        
    }
    
    public static function get_imperium_ahlfeldt(object $options) : object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->query = $options->query;

        $response->type_site = $options->type_site;

        $response->type_name = $options->type_name;

        $response->type_country = $response->type_country;

        $response->type_name = $response->type_name . '=' . $response->query;
        
        if ($response->type_site !== '') {

            $response->type_site = '&typeid=' . $response->type_site;
            
        }
        
        if ($response->type_country !== '') {
   
            $response->type_country = '&cc=' . $response->type_country;
            
        }

        $params = $response->type_name . $response->type_site . $response->type_country;

        $objects = [];

        if (strlen($response->query) >= 3) {

            $contents = file_get_contents('http://imperium.ahlfeldt.se/api/geojson.php?' . $params);

            if (!$contents) {

                $response->success = false;
                
                return $response;

            }

            $contents = json_decode($contents);

            $count = 0;

            foreach ($contents->features as $geojson) {

                array_push($objects, [

                    "value" => $geojson->properties->name, 
                    "geometry_type" => $geojson->geometry->type,
                    "geojson" => json_encode($geojson)

                ]);

                if ($count === 10) {

                    break;

                }
            }
        }
        
        if (count($objects) > 0) {
            
            $response->success = true;
            $response->content = $objects;
            
        }
        
        return $response;
        
    }
    
    public static function map_image_download(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->raster_name = $options->raster_name;
        
        $replace = [

                "\"", "'", "\\", "/", "¿", "?", "!", "¡", "$", "#", "@", "&", ":", ";",
                "*", "+", "·", "½", "~", "%", "¬", "{", "}", "[", "]", "(", ")", "ç",
                "<", ">", "º", "ª", "^", "´", "`", "Ç", "ñ", "Ñ", "¨"

            ];
        
        $response->raster_name = str_replace(" ", '-', $response->raster_name);

        $response->raster_name = str_replace($replace, '', $response->raster_name);
        
        $response->file_type = $options->file_type;
        $response->tif_bounds = $options->tif_bounds;
        $response->dataUrl = $options->dataUrl;
        
        
        if ($response->tif_bounds === null) {

            $im = file_get_contents($response->dataUrl);

            if (!$im) {

                $response->success = false;
                $response->msg = 'No ha sido posible obtener la imagen';
                
                return $response;

            }

            $new_file_name = $response->raster_name . '.' . $response->file_type;
            $new_file = self::downloads_path() . '/map-image-download/' . $new_file_name;

            $blob_file = $new_file . ".png";

            if (!file_put_contents($blob_file, $im)) {
                
                $response->success = false;
                $response->msg = 'No ha sido posible crear la imagen. Revise los permisos de escritura';
                
                return $response;
                
            }

            sleep(3);

            $image = new Imagick($blob_file);

            $image->setImageFormat($response->file_type);

            $image->setImageCompressionQuality(100);

            $image->writeImage($new_file);

            $image->clear();

            $image->destroy();

            $zipArchive = new ZipArchive();
            $zipName = $response->raster_name . ".zip";
            $zipFile = self::downloads_path() . '/map-image-download/' . $response->file_type . "/" . $zipName;

            $create_file = true;
            
            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

                $response->success = false;
                $response->msg = 'No ha sido posible crear el archivo';
                
                $create_file = false;

            }
            
            if ($create_file) {
                
                $zipArchive->addFile($new_file, $new_file_name);
                $zipArchive->close();

                unlink($blob_file);
                unlink($new_file);

                $response->success = true;
                $response->zip = self::downloads_url() . '/map-image-download/' . $response->file_type . '/' . $zipName;
                $response->msg = 'ok';
                
                return $response;

            }

        } else {
            
            $im = file_get_contents($response->dataUrl);

            if (!$im) {

                $response->success = false;
                $response->msg = 'No ha sido posible obtener la imagen';
                
                return $response;

            }

            $blob_file_name = $response->raster_name . ".png";
            $blob_file = self::downloads_path() . '/map-image-download/' . $blob_file_name;

            $new_file_name = $response->raster_name . ".tif";
            $new_file = self::downloads_path() . '/map-image-download/' . $new_file_name;

            if (!file_put_contents($blob_file, $im)) {
                
                $response->success = false;
                $response->msg = 'No ha sido posible crear la imagen. Revise los permisos de escritura';
                
                return $response;
            }

            sleep(3);

            //shell_exec("gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr " . $response->tif_bounds . " -outsize 100% 100% -co TILED=YES -co COMPRESS=LZW -co ALPHA=YES $blob_file $new_file");
            
            shell_exec("gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr " . $response->tif_bounds . " $blob_file $new_file");
            
            //shell_exec("gdal_translate -of GTiff -a_srs EPSG:4326 -a_gt 7514 1007 0 5972 0 476 -co COMPRESS=LZW -co ALPHA=YES -co TFW=YES $blob_file $new_file");
            
            sleep(2);

            $zipArchive = new ZipArchive();
            
            $zipName = $response->raster_name . ".zip";
            $zipFile = self::downloads_path() . "/map-image-download/" . $response->file_type . "/" . $zipName;

            if ($zipArchive->open($zipFile, ZipArchive::CREATE) !== TRUE) {

                $response->success = false;
                $response->msg = 'No ha sido posible crear el archivo.';
                
                return $response;
                
            }

            $zipArchive->addFile($new_file, $new_file_name);
            
            $zipArchive->close();

            unlink($blob_file);
            unlink($new_file);
            
            $response->success = true;
            $response->zip = self::downloads_url() . '/map-image-download/' . $response->file_type . '/' . $zipName;
            $response->msg = 'ok';
            
            return $response;

        }
        
    }
    
    public static function legends(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        if (isset($options->content)) {
            
            $response->content = $options->content;
            
        }
        
        $response->section_tipo = $options->section_tipo;
        
        $response->geo_provider = $options->geo_provider;

        $legend_name = $response->section_tipo . '-' . $response->geo_provider . '.json';
        $legend_file = self::legends_path() . '/' . $legend_name;

        if (!file_exists($legend_file)) {
            
            $json = '{"legend":"", "enable":true, "columns":[]}';
            
            try {
                
                $handler = fopen($legend_file, 'w+');
                fwrite($handler, $json);
                fclose($handler);

                $response->success = true;
                $response->content = json_encode(json_decode($json));
                $response->msg = 'ok';
                
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
            }

        } else if (isset($response->content)) {

            if (file_put_contents($legend_file, $response->content)) {

                $response->success = true;
                $response->content = json_encode(json_decode($response->content));
                $response->msg = 'ok';
                
            } else {

                $response->success = false;
                $response->msg = 'Ha ocurrido un error al guardar los datos. Revise los permisos de escritura.';

            }

        } else {
            
            $response->success = true;
            $response->content = json_encode(json_decode(file_get_contents($legend_file)));
            $response->msg = 'ok';
            
        }

        return $response;
        
    }
    
    public static function select_basemaps(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::basemaps_path() . '/' . $response->geo_provider . '.json';
        
        $json_file = json_decode(file_get_contents($file_name));

        if (isset($json_file->basemaps)) {

            $response->content = json_encode($json_file);
            $response->success = true;
            $response->msg = 'ok';
            
        } 
        
        return $response;
        
    }
    
    public static function create_basemap(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->basemap_url = $options->basemap_url;
        $response->basemap_name = $options->basemap_name;
        $response->basemap_attribution = $options->basemap_attribution;
        $response->basemap_minzoom = $options->basemap_minzoom;
        $response->basemap_maxzoom = $options->basemap_maxzoom;
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::basemaps_path() . '/' . $response->geo_provider . '.json';

        if (
                $response->basemap_url === '' || 
                $response->basemap_name === '' ||
                $response->basemap_minzoom === '' || 
                $response->basemap_maxzoom === ''
        ) {
            
            $response->success = false;
            $response->msg = 'Hay campos vacíos, por favor rellénelos.';


        } else if (intval($response->basemap_minzoom) < 0 || intval($response->basemap_minzoom) > 18) {

            $response->success = false;
            $response->msg = "El zoom mínimo debe de estar comprendido entre 0 y 18";

        } else if (intval($response->basemap_maxzoom) < 0 || intval($response->basemap_maxzoom) > 18) {

            $response->success = false;
            $response->msg = "El zoom máximo debe de estar comprendido entre 0 y 18";

        } else {

            $json_file = json_decode(file_get_contents($file_name));

            $basemap = [

                "url" => $response->basemap_url,
                "name" => $response->basemap_name,
                "attribution" => $response->basemap_attribution,
                "minzoom" => $response->basemap_minzoom,
                "maxzoom" => $response->basemap_maxzoom

            ];

            if (!isset($json_file->basemaps)) {

                $json_file->basemaps = [];

            }

            array_push($json_file->basemaps, $basemap);

            try {
                
            $handle = fopen($file_name, "w+");
            fwrite($handle, json_encode($json_file, false));
            fclose($handle);

            $response->success = true;
            $response->content = json_encode($json_file);
            $response->msg = 'ok';
            
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
            }
            
        }
        
        return $response;
        
    }
    
    public static function remove_basemap(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';

        $response->basemap_index = $options->basemap_index;
    
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::basemaps_path() . '/' . $response->geo_provider . '.json';
        
        if ($response->basemap_index >= 0) {

            $json_file = json_decode(file_get_contents($file_name));

            if (isset($json_file->basemaps[$response->basemap_index])) {

                array_splice($json_file->basemaps, $response->basemap_index, 1);
                
                try {
                    
                    $handle = fopen($file_name, "w+");

                    fwrite($handle, json_encode($json_file, false));

                    fclose($handle);

                    $response->success = true;
                    $response->msg = 'ok';
                
                } catch (Exception $e) {
                    
                    $response->success = false;
                    $response->msg = $e->getMessage();
                    
                }
            }

        } else {

            $response->success = false; 
            $response->msg = "Ha ocurrido un error inesperado. Por favor revise el archivo $file_name";

        }
        
        return $response;
        
    }
    
    public static function get_wms_layers(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->search = $options->search;
        
        if (mb_substr($response->search, -1) === '?') {
            
            $response->url = str_replace("?", "", $response->search);
            
        }
        
        else if (str_contains($response->search, '?')) {
            
            $response->url = explode('?', $response->search)[0];
            
        } else {
            
            $response->url = $response->search;
            
        }
        
        $content = file_get_contents($response->url . '?request=GetCapabilities&service=WMS');
        
        if ($content) {
            
            $response->success = true;
            $response->content = $content;
            $response->msg = 'ok';
            
        } else {
            
            $response->success = false;
            $response->msg = "No ha sido posible establecer una conexión";
            
        }
        
        return $response;
        
    }
    
    public static function select_wms(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::wms_path() . '/' . $response->geo_provider . '.json';
        
        $json_file = json_decode(file_get_contents($file_name));

        if (isset($json_file->wms)) {

            $response->content = json_encode($json_file);
            $response->success = true;
            $response->msg = 'ok';
            
        } else {
            
            $response->msg = 'Ha ocurrido un error, revise si existe el archivo ' . $file_name;
            $response->success = false;
            
        }
        
        return $response;
        
    }
    
    public static function create_wms(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->wms_url = $options->wms_url;
        $response->wms_name = $options->wms_name;
        $response->wms_title = $options->wms_title;
        $response->wms_opacity = $options->wms_opacity;
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::wms_path() . '/' . $response->geo_provider . '.json';

        if (
                $response->wms_url === '' || 
                $response->wms_name === '' || 
                $response->wms_title === '' || 
                $response->wms_opacity === '' ||
                $response->wms_geoprovider === ''
        ) {
            
            $response->success = false;
            $response->msg = 'Existen campos vacíos. No ha sido posible guardar el servicio WMS.';

        } else if (floatval($response->wms_opacity) < 0 || floatval($response->wms_opacity) > 1) {

            $response->error = true;
            $response->msg = 'Valor incorrecto de opacidad. La opacidad debe de estar entre el intervalo de 0 a 1.';
            return $response;

        } else {

            $json_file = json_decode(file_get_contents($file_name));

            $wms = [

                "url" => $response->wms_url,
                "name" => $response->wms_name,
                "title" => $response->wms_title,
                "opacity" => $response->wms_opacity,
                'view' => false

            ];

            if (!isset($json_file->wms)) {

                $json_file->wms = [];

            }

            array_push($json_file->wms, $wms);
            
            try {
                
                $handle = fopen($file_name, "w+");
                fwrite($handle, json_encode($json_file, false));
                fclose($handle);

                $response->success = true;
                $response->content = json_encode($json_file);
                $response->msg = 'ok';
            
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
            }

        }
        
        return $response;
        
    }
    
    public static function update_wms(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
        
        $response->wms_index = $options->wms_index;
        
        if (isset($options->view)) {
            
            $response->view = $options->view;
            
        } else {
            
            $response->view = null;
            
        }
        
        if (isset($options->wms_opacity)) {
            
            $response->opacity = $options->wms_opacity;
            
        } else {
            
            $response->opacity = null;
            
        }

        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::wms_path() . '/' . $response->geo_provider . '.json';
        
        $json_file = json_decode(file_get_contents($file_name));

        if (isset($json_file->wms)) {
            
            if ($response->view !== null) {
                
                $json_file->wms[$response->wms_index]->view = $response->view;
                
            }
            
            if ($response->opacity !== null) {
                
                $json_file->wms[$response->wms_index]->opacity = $response->opacity;
                
            }
            
            try {
                
                $handle = fopen($file_name, 'w+');
                fwrite($handle, json_encode($json_file));
                fclose($handle);

                $response->content = json_encode($json_file);
                $response->success = true;
                $response->msg = 'ok';
                
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
            }
            
        }
        
        return $response;
        
    }
    
    public static function remove_wms(object $options): object {
        
        $response = new stdClass();
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';

        $response->wms_index = $options->wms_index;
    
        $response->geo_provider = $options->geo_provider;
        
        $file_name = self::wms_path() . '/' . $response->geo_provider . '.json';
        
        if ($response->wms_index >= 0) {

            $json_file = json_decode(file_get_contents($file_name));

            if (isset($json_file->wms[$response->wms_index])) {

                array_splice($json_file->wms, $response->wms_index, 1);

                try {
                    
                $handle = fopen($file_name, "w+");
                fwrite($handle, json_encode($json_file, false));
                fclose($handle);
                
                $response->success = true;
                $response->msg = 'ok';
                
                } catch (Exception $e) {
                    
                    $response->success = false;
                    $response->msg = $e->getMessage();
                    
                }
                
            }

        }
        
        return $response;
        
    }
    
    public static function create_property(object $options): object {
        
        $response = new stdClass();
        
        $response->success = false;
        $response->msg = 'Ha ocurrido un error';
        
        $response->name = $options->name;
        $response->value = strip_tags($options->value);
        
        $name_allows = "/^[A-Za-z\_]+$/";

        if ($response->name === '') {

            $response->success = false;
            $response->msg = "El campo nombre de la propiedad no puede estar vacío";


        } else if (strlen($response->name) > 50) {

            $response->success = false;
            $response->msg = "El campo nombre de la propiedad no puede superar los 50 caracteres";

        } else if (!preg_match($name_allows, $response->name)) {

            $response->success = false;
            $response->msg = "El campo nombre de la propiedad solo acepta valores alfanúmericos y guiones bajos";

        } else if ($response->value === '') {

            $response->success = false;
            $response->msg = "El campo valor de la propiedad no puede estar vacío";


        } else if (strlen($response->value) > 250) {

            $response->success = false;
            $response->msg = "El campo valor de la propiedad no puede superar los 250 caracteres";

        } else {
            
            $response->success = true;
            $response->msg = "ok";
            
        }
        
        return $response;

    }
    
    public static function edit_property(object $options): object {
        
        $response = new stdClass();
        
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado';
        
        $response->name = $options->name;
        $response->value = strip_tags($options->value);

        if ($response->value === '') {

            $response->success = false;

        } else if (strlen($response->value) > 250) {

            $response->success = false;

        } else {
            
            $response->success = true;
            $response->msg = "ok";
            
        }
        
        return $response;

    }
    
    public static function downloads_path(): string {
        
        return DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/downloads';
        
    }
    
    public static function downloads_url(): string {
        
        return DEDALO_ROOT_WEB . '/tools/tool_leaflet_special_tools/downloads';
        
    }
    
   public static function vector_layers_uploads_path(): string {
        
        return DEDALO_MEDIA_PATH . '/vector_layers';
        
    }

    public static function geojson_uploads_path(): string {
        
        return DEDALO_MEDIA_PATH . '/vector_layers/geojson';
        
    }
    
    public static function shape_uploads_path(): string {
        
        return DEDALO_MEDIA_PATH . '/vector_layers/shape';
        
    }
    
    public static function kml_uploads_path(): string {
        
        return DEDALO_MEDIA_PATH . '/vector_layers/kml';
        
    }
    
    public static function geojson_uploads_url(): string {
        
        return DEDALO_ROOT_WEB . '/media/vector_layers/geojson';
        
    }
    
    public static function shape_uploads_url(): string {
        
        return DEDALO_ROOT_WEB . '/media/vector_layers/shape';
        
    }
    
    public static function kml_uploads_url(): string {
        
        return DEDALO_ROOT_WEB . '/media/vector_layers/kml';
        
    }
    
    public static function legends_path(): string {
        
        return DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/legends';
        
    }

    public static function legends_url(): string {
        
        return DEDALO_ROOT_WEB . '/tools/tool_leaflet_special_tools/legends';
        
    }
    
    public static function basemaps_path(): string {
        
        return DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/basemaps';
        
    }
    

    public static function basemaps_url(): string {
        
        return DEDALO_ROOT_WEB . '/tools/tool_leaflet_special_tools/basemaps';
        
    }
    
    public static function wms_path(): string {
        
        return DEDALO_TOOLS_PATH . '/tool_leaflet_special_tools/wms';
        
    }
    

    public static function wms_url(): string {
        
        return DEDALO_ROOT_WEB . '/tools/tool_leaflet_special_tools/wms';
        
    }

    public static function google_translate(object $options): object {
        
        $response = new stdClass();
        
        if (isset($options->source)) {
            
            $response->source = $options->source;
            
        } else {
            
            $response->source = 'es';
            
        }
        
        $response->str = $options->str;
        
        $response->lang = $options->lang;
        
        switch($response->lang) {
            
            case 'lg-spa': 
                $response->target_lang = 'es';
                break;
            case 'lg-eng':
                $response->target_lang = 'en';
                break;
            case 'lg-cat':
                $response->target_lang = 'ca';
                break;
            case 'lg-eus':
                $response->target_lang = 'eu';
                break;
            case 'lg-fr':
                $response->target_lang = 'fr';
                break;
            case 'lg-ita':
                $response->target_lang = 'it';
                break;
            case 'lg-deu':
                $response->target_lang = 'de';
                break;
            case 'lg-ell':
                $response->target_lang = 'el';
                break;

        }
        
        try {
            
        $tr = new GoogleTranslate();
        
        $tr->setSource($response->source);
        
        $tr->setTarget($response->target_lang);
        
        $response->str_translate = $tr->translate($response->str);
        
        } catch (Exception $e) {
            
            $response->msg = $e->getMessage();
            
            $response->str_translate = $response->str;
        }

        return $response;
        
    }
    
    public static function process_uploaded_image(object $options) : object {
        

        $response = new stdClass();
        $response->success = false;
        $response->msg = 'Error. Request failed. '.__METHOD__.' ';
        $response->file_data = $options->file_data;
        $response->tipo =  $options->tipo;
        $response->section_tipo = $options->section_tipo;
        $response->section_id = $options->section_id;
        $response->model = 'component_image';
        $response->default_quality = $options->default_quality;

        $model = RecordObj_dd::get_modelo_name_by_tipo($response->tipo, true);
        
        $component_image = component_common::get_instance(
                
            $model,
            $response->tipo,
            $response->section_id,
            'edit',
            DEDALO_DATA_NOLAN,
            $response->section_tipo
                
        );
        
        $component_image->set_quality($response->default_quality);
        
        $add_file = $component_image->add_file($response->file_data);
        
        if (!$add_file->result) {
            
                $response->msg .= $add_file->msg;
                $response->success = false;
                
                return $response;
                
        }
        
        $process_file = $component_image->process_uploaded_file($add_file->ready);
        
        if (!$process_file->result) {
            
            $response->msg .= 'Ha ocurrido un error mientras se procesaba el archivo: '.$process_file->msg;
            $response->success = false;
            
            return $response;
                
        }
        
        $id = $component_image->get_id();
        
        $explode_original_extension = explode('.', $response->file_data->name);
        $get_original_extension = $explode_original_extension[count($explode_original_extension)-1];
        
        if (substr($response->file_data->name, -3) === 'tif') {

            $response->is_geotiff = true;
            $response->geotiff_src = $component_image->get_media_url_dir($response->default_quality) . '/' . $id .'.tif';
            
            
            $geotiff_to_png = new stdClass();
            $geotiff_to_png->id = $id;
            $geotiff_to_png->url = $component_image->get_media_url_dir($response->default_quality);
            $geotiff_to_png->path = $component_image->get_media_path_dir($response->default_quality);
            
            $result = self::geotiff_to_png($geotiff_to_png);
                    
            if ($result) {
            
                $get_original_extension = 'png';
            
            } else {
                
                $get_original_extension = 'jpg';
                
            }
            
        }

	$url = $component_image->get_media_url_dir($response->default_quality) .'/'. $id .'.'. $get_original_extension;
        
        $response->image_src = $url;
        
        $response->msg = 'OK. archivo procesado correctamente';
        $response->success = true;
        
        return $response;
        
    }
    
    public static function geotiff_to_png(object $options): bool {
        
        $response = new stdClass();

        $response->success = false;
        
        $response->id = $options->id;

        $name_png = $response->id . '.png';
        $name_tif = $response->id . '.tif';

        $response->url = $options->url;
        $response->path = $options->path;
        
        $response->tif_file = $response->path . '/' . $name_tif;
        $response->png_file = $response->path . '/' . $name_png;

        $image = new Imagick($response->tif_file);

        $image->setImageFormat('png');
        
        $image->setImageCompressionQuality(100);
        
        if ($image->writeImage($response->png_file)) {
            
            $response->success = true;
            
        }

        $image->clear();

        $image->destroy();

        return $response->success;
        
    }

    public static function process_uploaded_vector(object $options) : object {

        if (!is_dir(self::vector_layers_uploads_path())) {
            
            mkdir(self::vector_layers_uploads_path(), 0777);
        }
        
        if (!is_dir(self::shape_uploads_path())) {
            
            mkdir(self::shape_uploads_path(), 0777);
            
        }
        
        if (!is_dir(self::geojson_uploads_path())) {
            
            mkdir(self::geojson_uploads_path(), 0777);
            
        }
        
        if (!is_dir(self::kml_uploads_path())) {
            
            mkdir(self::kml_uploads_path(), 0777);
            
        }
        
        $response = new stdClass();
        
        $response->tmp_dir = DEDALO_UPLOAD_TMP_DIR;
        $response->user_id = get_user_id();
        $response->key_dir = $options->file_data->key_dir;
        $response->name = $options->file_data->name;
        $response->type = $options->file_data->type;
        $response->size = $options->file_data->size;
        $response->tmp_file = $response->tmp_dir . '/' . $response->user_id . '/' . $response->key_dir . '/' . $response->name;
        $response->tipo = $options->tipo;
        $response->section_tipo = $options->section_tipo;
        $response->section_id = $options->section_id;
        
        //Default $response
        $response->success = false;
        $response->msg = 'Ha ocurrido un error inesperado.';
 
        $folder_name = $response->user_id . '_' . $response->tipo . '_' . $response->section_tipo . '_' . $response->section_id;

        if ($response->type === "application/zip") {

            if ($response->size > 1500000) {
                
                $response->success = false;
                $response->msg = 'El archivo no debe superar los 1500 kilobytes';
            
                return $response;
                
            }

            mkdir(self::shape_uploads_path() . '/' . $folder_name, 0777);

            $target_dir = self::shape_uploads_path() . '/' . $folder_name;

            $target_file = $target_dir . '/' . $response->name;
            
            if (is_file($target_file)) {
                
                $target_file = $target_dir . '/' . rand(10000, 99999) . '-' . $response->name;
                
            }

            $shape_file_url = self::shape_uploads_url() . '/' . $folder_name . '/' . $response->name;

            try {
                
                copy($response->tmp_file, $target_file);

                $response->success = true;

                $response->shape = $shape_file_url;

                $response->msg = 'ok';

                unlink($response->tmp_file);

                return $response;

            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
                return $response;
                
            }

        } else if ($response->type === 'application/geo+json') {

            if ($response->size > 1500000) {

                $response->success = false;
                $response->msg = 'El archivo no debe superar los 1500 kilobytes';
                
                return $response;

            }
            
            mkdir(self::geojson_uploads_path() . '/' . $folder_name, 0777);
            
            $target_dir = self::geojson_uploads_path() . '/' . $folder_name;
            
            $target_file = $target_dir . '/' . $response->name;
            
            if (is_file($target_file)) {
                
                $target_file = $target_dir . '/' . rand(10000, 99999) . '-' . $response->name;
                
            }

            try {
            
                copy($response->tmp_file, $target_file);

                $response->success = true;
                $response->geojson = json_encode(json_decode(file_get_contents($target_file)));
                $response->msg = 'ok';

                unlink($response->tmp_file);

                return $response;
                
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
                return $response;

            }

        }

        else if ($response->type === 'application/vnd.google-earth.kml+xml') {

            if ($response->size > 1500000) {

                $response->success = false;
                $response->msg = 'El archivo no debe superar los 1500 kilobytes';

                return $response;

            }

            mkdir(self::kml_uploads_path() . '/' . $folder_name, 0777);
            
            $target_dir = self::kml_uploads_path() . '/' . $folder_name;
            
            $target_file = $target_dir . '/' . $response->name;
            
            if (is_file($target_file)) {
                
                $target_file = $target_dir . '/' . rand(10000, 99999) . '-' . $response->name;
                
            }

            try {
                
                copy($response->tmp_file, $target_file);

                $response->success = true;
                $response->kml = file_get_contents($target_file);
                $response->msg = 'ok';
                
                unlink($response->tmp_file);
                
                return $response;
                
            } catch (Exception $e) {
                
                $response->success = false;
                $response->msg = $e->getMessage();
                
                return $response;
                
            }

            
        } else {
            
            $response->success = false;
            
            $response->msg = "Tipo de archivo no válido";
            
            return $response;
            
        }
        
    }

}