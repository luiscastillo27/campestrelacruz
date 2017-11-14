<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class DetallesdepositosModel{
    private $db;
    private $table  = 'DetallesDepositos';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

        $this->db->insertInto($this->table, $data)
                                   ->execute();

        return $this->response->SetResponse(true, "Se ha registrado correctamente el detalle del deposito");

    }

    public function actualizar($data, $id){

        $this->db->update($this->table, $data)
                           ->where('idDetalleDeposito', $id)
                           ->execute();

        return $this->response->SetResponse(true, "Se han actualizado correctamente");
               
    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idDetalleDeposito', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){  

              $this->db->deleteFrom($this->table)
                       ->where('idDetalleDeposito', $id)
                       ->execute();
              return $this->response->SetResponse(true, "Se ha eliminado correctamente el detalle del deposito");
        

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }
        
    }

    public function paginar($limit, $position, $id){

        $data = $this->db->from($this->table)
                    ->select(null)
                    ->select('Terreno.manzana, Terreno.lote, DetallesDepositos.pago_ingreso, DetallesDepositos.pago_justificado,
                          DetallesDepositos.concepto, DetallesDepositos.observaciones, DetallesDepositos.idDetalleDeposito')
                    ->join('Terreno on DetallesDepositos.idTerreno = Terreno.idTerreno')
                    ->where('DetallesDepositos.idDeposito', $id)
                    ->limit($limit)
                    ->offset($position)
                    ->fetchAll();
                         
        $total = $this->db->from($this->table)
                    ->select(null)
                    ->select('Terreno.manzana, Terreno.lote, DetallesDepositos.pago_ingreso, DetallesDepositos.pago_justificado,
                          DetallesDepositos.concepto, DetallesDepositos.observaciones, DetallesDepositos.idDetalleDeposito')
                    ->join('Terreno on DetallesDepositos.idTerreno = Terreno.idTerreno')
                    ->where('DetallesDepositos.idDeposito', $id)
                    ->select(null)
                    ->select('COUNT(*) Total')
                    ->fetch()
                    ->Total;
        return [
            'data'  => $data,
            'total' => $total
        ];

    }

    public function titulo($id){

        return $this->db->from('Depositos')
                      ->select(null)
                      ->select('Depositos.folio, Depositos.auth')
                        ->where('idDeposito', $id)
                        ->fetch();
                       
    }



    public function obtener($id){

        return $this->db->from($this->table)
                    ->select(null)
                    ->select('Depositos.folio, Depositos.auth, DetallesDepositos.idTerreno, DetallesDepositos.pago_ingreso,
                          DetallesDepositos.pago_justificado, DetallesDepositos.concepto, DetallesDepositos.observaciones')
                    ->join('Depositos on Depositos.idDeposito =DetallesDepositos.idDeposito')
                        ->where('idDetalleDeposito', $id)
                        ->fetch();
                       
    }



    


}