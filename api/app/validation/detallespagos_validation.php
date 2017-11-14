<?php
namespace App\Validation;

use App\Lib\Response;

class DetallesPagosValidation {
    public static function validate($data)  {
        $response = new Response();
    
    



        $key = 'folio_deslinde';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El folio_deslinde es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El folio_deslinde debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El folio_deslinde debe ser un numero';
            }

        } 


        $key = 'deslinde';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El deslinde es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 2) {
                $response->errors[$key][] = 'El deslinde debe contener como mínimo 2 caracteres';
            }
        }

        $key = 'folio_enganche';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El folio_deslinde es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El folio_deslinde debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El folio_deslinde debe ser un numero';
            }

        }


        $key = 'enganche';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El deslinde es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 2) {
                $response->errors[$key][] = 'El deslinde debe contener como mínimo 2 caracteres';
            }
        } 


        $key = 'vencimiento_contrato';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El deslinde es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 2) {
                $response->errors[$key][] = 'El deslinde debe contener como mínimo 2 caracteres';
            }
        } 


            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}