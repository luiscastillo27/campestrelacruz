<?php
namespace App\Validation;

use App\Lib\Response;

class PagosValidation {
    public static function validate($data) {
        $response = new Response();
        
        
        $key = 'idTerreno';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El idTerreno es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El idTerreno debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El idTerreno debe ser un numero';
            }

        } 


        $key = 'idCliente';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El idTerreno es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El idTerreno debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El idTerreno debe ser un numero';
            }

        } 


        $key = 'folio_contrato';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El idTerreno es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El idTerreno debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El idTerreno debe ser un numero';
            }

        } 

        $key = 'fecha';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El nombre es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 8) {
                $response->errors[$key][] = 'El nombre debe contener como mínimo 8 caracteres';
            }
        }

            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}