<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class PagosModel{
    private $db;
    private $table  = 'Pagos';
    private $table2  = 'Terreno';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

      $fecha = $data['fecha'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['fecha'] = $fecha;

       $total = $this->db->from($this->table)
                          ->where('folio_contrato', $data["folio_contrato"])
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
                          
        if($total == 0){

          $this->db->insertInto($this->table, $data)
                                     ->execute();

          return $this->response->SetResponse(false, "Se ha registrado correctamente el pago");

        } else {
          return $this->response->SetResponse(false, "Este folio se encuentra registrado");
        }
      
    }

    public function actualizar($data, $id){

      $fecha = $data['fecha'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['fecha'] = $fecha;


        $old = $this->db->from($this->table)
                          ->where('idPago', $id)
                          ->select(null)
                          ->select('folio_contrato')
                          ->fetch();
                          
        $folio = $old->folio_contrato;
  
        if($folio != $data["folio_contrato"]){


            $totalFolio = $this->db->from($this->table)
                          ->where('folio_contrato', $data['folio_contrato'])
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        
            if($totalFolio == 0){

                $dataFolio = array('folio_contrato' => $data['folio_contrato']);
                $this->db->update($this->table, $dataFolio)
                           ->where('idPago', $id)
                           ->execute();


            } else {
                return $this->response->SetResponse(false, "Este folio ya existe");
            }


        }

          $dataPagos = array('idTerreno' => $data["idTerreno"],
                             'idCliente' => $data["idCliente"],
                             'fecha' => $data["fecha"]);

          $this->db->update($this->table, $dataPagos)
                           ->where('idPago', $id)
                           ->execute();

          return $this->response->SetResponse(false, "Se han actualizado los cambios");
                       
    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idPago', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

              $this->db->deleteFrom($this->table)
                                         ->where('idPago', $id)
                                         ->execute();

              return $this->response->SetResponse(true, "Se ha eliminado correctamente el pago");
        

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }
        
    }

    public function paginar($limit, $position){
      

        $data = $this->db->from($this->table)
                         ->select(null)
                         ->select('Pagos.idPago, Pagos.folio_contrato, Terreno.lote, Terreno.manzana, Pagos.fecha, Clientes.nombre_completo')
                         ->join('Terreno on Pagos.idTerreno = Terreno.idTerreno')
                         ->join('Clientes on Clientes.idCliente = Pagos.idCliente')
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
                        ->where('idPago', $id)
                        ->fetch();
                       
    }

    public function listarDisponibles(){
      
        return  $this->db->from($this->table)
                           ->fetchAll();
        
    }

}