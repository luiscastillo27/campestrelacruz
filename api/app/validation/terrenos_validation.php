<?php
namespace App\Validation;

use App\Lib\Response;

class TerrenosValidation {
    public static function validate($data) {
        $response = new Response();
        
        
        $key = 'lote';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El lote es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El lote debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El lote debe ser un numero';
            }

        } 


        $key = 'manzana';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'La manzana es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    if($value != '1' && $value != '2' && $value != '3' && $value != '4' && 
                        $value != '5' && $value != '6' && $value != '7'  && $value != '8'  && $value != '9') {
                        $response->errors[$key][] = 'Solo se acepta del 1 al 9';
                    }
                } 

            } else {
                $response->errors[$key][] = 'La manzana debe ser un numero';
            }

        }





        $key = 'costo';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El costo es obligatorio';
        } 
            
        



        $key = 'disponibilidad'; 
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El disponibilidad es obligatorio';
        } else {
            
            $value = $data[$key];
            if($value != 'Si' && $value != 'No') {
                $response->errors[$key][] = 'Solo se acepta Si o No';
            }

        } 


            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}