<?php
namespace App\Validation;

use App\Lib\Response;

class ClientesValidation {
    public static function validate($data, $update = false) {
        $response = new Response();
        
        $key = 'folio_contrato';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El folio es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El folio debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El folio debe ser un numero';
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


        $key = 'nombre_completo';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El nombre es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 3) {
                $response->errors[$key][] = 'El nombre debe contener como mínimo 3 caracteres';
            }
        } 


        $key = 'telefono';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El telefono es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El telefono debe ser un numero positivo';
                } else {

                    if(strlen($value) < 9) {
                        $response->errors[$key][] = 'El telefono debe contener como mínimo 10 caracteres';
                    }

                }

            } else {
                $response->errors[$key][] = 'El telefono debe ser un numero';
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


        $key = 'domicilio';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El nombre es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 4) {
                $response->errors[$key][] = 'El nombre debe contener como mínimo 4 caracteres';
            }
        }   


        $key = 'fecha';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El nombre es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 4) {
                $response->errors[$key][] = 'El nombre debe contener como mínimo 4 caracteres';
            }
        }   
            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}