<?php
namespace App\Validation;

use App\Lib\Response;

class DepositosValidation {
    public static function validate($data) {
        $response = new Response();
        
        
        $key = 'idCliente';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El idCliente es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El idCliente debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El idCliente debe ser un numero';
            }

        } 

        $key = 'folio';
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


        $key = 'auth';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El auth es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El auth debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El auth debe ser un numero';
            }

        } 


        // $key = 'clave';
        // if(empty($data[$key])) {
        //     $response->errors[$key][] = 'La clave es obligatorio';
        // } else {
        //     $value = $data[$key];
            
        //     if(strlen($value) < 8) {
        //         $response->errors[$key][] = 'La clave debe contener como mínimo 8 caracteres';
        //     }
        // } 


        $key = 'fecha';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El fecha es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 8) {
                $response->errors[$key][] = 'El fecha debe contener como mínimo 8 caracteres';
            }
        } 

            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}