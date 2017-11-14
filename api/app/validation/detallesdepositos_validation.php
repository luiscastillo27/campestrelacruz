<?php
namespace App\Validation;

use App\Lib\Response;

class DetallesDepositosValidation {
    public static function validate($data)  {
        $response = new Response();


        $key = 'idDeposito';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El idDeposito es obligatorio';
        } else {
            
            $value = $data[$key];
            if(is_numeric($value)) {
                
                if($value < 0){
                    $response->errors[$key][] = 'El idDeposito debe ser un numero positivo';
                } 

            } else {
                $response->errors[$key][] = 'El idDeposito debe ser un numero';
            }

        } 



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



        $key = 'pago_ingreso';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El pago es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 1) {
                $response->errors[$key][] = 'El pago debe contener como mínimo 1 caracteres';
            }
        }



        $key = 'pago_justificado';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El pago_justificado es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 1) {
                $response->errors[$key][] = 'El pago_justificado debe contener como mínimo 1 caracteres';
            }
        }



        $key = 'concepto';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El concepto es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 3) {
                $response->errors[$key][] = 'El concepto debe contener como mínimo 3 caracteres';
            }
        }


        $key = 'observaciones';
        if(empty($data[$key])) {
            $response->errors[$key][] = 'El observaciones es obligatorio';
        } else {
            $value = $data[$key];
            
            if(strlen($value) < 3) {
                $response->errors[$key][] = 'El observaciones debe contener como mínimo 3 caracteres';
            }
        }


        

            
        $response->setResponse(count($response->errors) === 0);

        return $response;
    }
}