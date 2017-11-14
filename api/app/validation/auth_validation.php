<?php
namespace App\Validation;

use App\Lib\Response;

class AuthValidation {
    public static function validate($data, $update = false) {
        $response = new Response();


        $key = 'contrasena';
        if( !$update ){
            if(empty($data[$key])){
                $response->errors[$key][] = 'Este campo es obligatorio';
            } else {
                $value = $data[$key];

                if(strlen($value) < 8) {
                    $response->errors[$key][] = 'Debe contener como mínimo 8 caracteres';
                }
            }            
        } else {
            if(!empty($data[$key])){
                $value = $data[$key];

                if(strlen($value) < 8) {
                    $response->errors[$key][] = 'Debe contener como mínimo 8 caracteres';
                }
            }
        }


        $key = 'password';  
        if( !$update ){
            if(empty($data[$key])){
                $response->errors[$key][] = 'Este campo es obligatorio';
            } else {
                $value = $data[$key];

                if(strlen($value) < 8) {
                    $response->errors[$key][] = 'Debe contener como mínimo 8 caracteres';
                }
            }            
        } else {
            if(!empty($data[$key])){
                $value = $data[$key];

                if(strlen($value) < 8) {
                    $response->errors[$key][] = 'Debe contener como mínimo 8 caracteres';
                }
            }
        }
            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}