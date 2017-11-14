<?php
namespace App\Validation;

use App\Lib\Response;

class LoginValidation {
    public static function validate($data, $update = false) {
        $response = new Response();

        $key = 'usuario';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El nombre es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 1) {
                $response->errors[$key][] = 'El nombre debe contener como mínimo 1 caracteres';
            }
        } 


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
            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}