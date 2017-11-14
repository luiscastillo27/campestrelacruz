<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class TerrenosModel{
    private $db;
    private $table  = 'Terreno';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

        $data["nombre"] =  "Lote ". $data["lote"] . " y Mza " . $data["manzana"];
        $total = $this->db->from($this->table)
                          ->where('nombre', $data["nombre"])
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        if($total == 0){
            
            $this->db->insertInto($this->table, $data)
                     ->execute();
            return $this->response->SetResponse(true, "Se ha registrado correctamente el terreno");

        } else {
            return $this->response->SetResponse(false, "El terreno ya esta registrado");
        }    

    }

    public function actualizar($data, $id){

        $total = $this->db->from($this->table)
                          ->where('idTerreno', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

            $this->db->update($this->table, $data)
                     ->where('idTerreno', $id)
                     ->execute();

            return $this->response->SetResponse(true, "Se ha modificado correctamente el terrenos");

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }

    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idTerreno', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){
            
            $this->db->deleteFrom($this->table)
                 ->where('idTerreno', $id)
                 ->execute();
                 
            return $this->response->SetResponse(true, "Se ha eliminado correctamente el terrenos");

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }

        return $total;
        
    }

    public function paginar($limit, $position){
      
        $data = $this->db->from($this->table)
                         ->limit($limit)
                         ->offset($position)
                         ->fetchAll();
                         
        $total = $this->db->from($this->table)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        return [
            'data'  => $data,
            'total' => $total
        ];

    }

    public function obtener($id){

        return $this->db->from($this->table)
                        ->where('idTerreno', $id)
                        ->fetch();
                        
    }

    public function listarDisponibles(){
      
        return  $this->db->from($this->table)
                          ->select(null)
                          ->select("idTerreno, nombre")
                          ->where("disponibilidad", "Si")
                           ->fetchAll();

    }


    public function listarTodos(){
      
        return  $this->db->from($this->table)
                          ->select(null)
                          ->select("idTerreno, nombre")
                           ->fetchAll();
                           
    }

    public function mios($limit, $position, $id){
     
        $data = $this->db->from($this->table)
                     ->select(null)
                     ->select('Terreno.idCliente, Terreno.lote, Terreno.manzana, Terreno.costo, Clientes.folio_contrato')
                     ->join('Clientes on Terreno.idCliente = Clientes.idCliente')
                     ->where('Clientes.idCliente', $id)
                     ->fetchAll();
                         
        $total = count($data);

        return [
            'data'  => $data,
            'total' => $total
        ];

        
    }


}