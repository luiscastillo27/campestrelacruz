<?php
namespace App\Validation;

use App\Lib\Response;

class EmpleadosValidation {
    public static function validate($data, $update = false) {
        $response = new Response();
        
        $key = 'nombre'; 
        if(empty($data[$key])) {
            $response->errors[$key][] = 'Este campo es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 3) {
                $response->errors[$key][] = 'Debe contener como mínimo 3 caracteres';
            }
        }


        $key = 'correo';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'Este campo es obligatorio';
        } else {
            $value = $data[$key];
            
            if( !filter_var($value, FILTER_VALIDATE_EMAIL) ) {
                $response->errors[$key][] = 'Valor ingresado no es un correo válido';
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


        $key = 'puesto'; 
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El disponibilidad es obligatorio';
        } else {
            
            $value = $data[$key];
            if($value != 'Secretaria' && $value != 'Vendedor'  && $value != 'Administrador') {
                $response->errors[$key][] = 'Solo se acepta Administrador, Secretaria o Vendedor';
            }

        } 

            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}