<?php
namespace App\Validation;

use App\Lib\Response;

class RecursosValidation {
    public static function validate($data, $update = false) {
        $response = new Response();
        
        
        $key = 'titulo'; 
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El titulo es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 2) {
                $response->errors[$key][] = 'El titulo debe contener como mínimo 2 caracteres';
            }
        } 

        $key = 'contenido'; 
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El contenido es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 2) {
                $response->errors[$key][] = 'El contenido debe contener como mínimo 2 caracteres';
            }
        } 

        $key = 'imagenpeque';  
        if( !$update ){
            if(empty($_FILES[$key]["name"])) {
                $response->errors[$key][] = 'Este campo es obligatorio';
            } else {
                $archivos_disp_ar = array('jpg', 'jpeg', 'gif', 'png', 'tif', 'tiff', 'bmp'); 
                $value = $data[$key];

                if($_FILES[$key]["type"] != "image/jpeg"  && $_FILES[$key]["type"] != "image/png"  && $_FILES[$key]["type"] != "image/gif"  && $_FILES[$key]["type"] != "image/jpg" && $_FILES[$key]["type"] != "image/tif" && $_FILES[$key]["type"] != "image/tiff"  && $_FILES[$key]["type"] != "image/bmp"){ 
                    $response->errors[$key][] = 'Debe ser una imagen jpg, jpeg, gif, png, tif, tiff o bmp';
                }
            }
        }
            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}