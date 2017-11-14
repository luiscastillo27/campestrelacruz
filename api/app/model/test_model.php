<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class TestModel{
    private $db;
    private $table  = 'Recursos';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){
        $fileP = $_FILES["imagenpeque"]["name"];
        $typepeque = $_FILES["imagenpeque"]["type"];
        $fileG = $_FILES["imagengrande"]["name"];
        $typegrande = $_FILES["imagengrande"]["type"];
        return $typegrande;
    }

    


}