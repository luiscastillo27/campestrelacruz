<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class DetallespagosModel{
    private $db;
    private $table  = 'DetallesPagos';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

      $fecha = $data['vencimiento_contrato'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['vencimiento_contrato'] = $fecha;

        $folio_deslinde = $data['folio_deslinde'];
        $folio_enganche = $data['folio_enganche'];

        $totalTerreno = $this->db->from($this->table)
                            ->where('folio_deslinde', $folio_deslinde)
                            ->select(null)
                            ->select('COUNT(*) Total')
                            ->fetch()
                            ->Total;
        if($totalTerreno == 0){

                $totalFolio = $this->db->from($this->table)
                                  ->where('folio_enganche', $folio_enganche)
                                  ->select(null)
                                  ->select('COUNT(*) Total')
                                  ->fetch()
                                  ->Total;

                if($totalFolio == 0){
                  
                      $this->db->insertInto($this->table, $data)
                                               ->execute();

                      return $this->response->SetResponse(true, "Se ha registrado correctamente el detalle del pago");


                } else {
                    return $this->response->SetResponse(false, "El folio del enganche ya existe");
                }

                
        } else {
          return $this->response->SetResponse(false, "El folio del deslinde ya existeo");
        }

    }

    public function actualizar($data, $id){

      $fecha = $data['vencimiento_contrato'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['vencimiento_contrato'] = $fecha;
    
        $oldData = $this->db->from($this->table)
                          ->where('idDetallePago', $id)
                          ->select(null)
                          ->select('folio_deslinde, folio_enganche')
                          ->fetch();
                          
        $oldFolioDeslinde = $oldData->folio_deslinde;
        $oldFolioEnganche = $oldData->folio_enganche;
        
        if($oldFolioDeslinde != $data["folio_deslinde"]){
            
            $totalFolioDes = $this->db->from($this->table)
                            ->where('folio_deslinde', $data['folio_deslinde'])
                            ->select(null)
                            ->select('COUNT(*) Total')
                            ->fetch()
                            ->Total;

            if($totalFolioDes == 0){

                $dataDes = array('folio_deslinde' => $data['folio_deslinde']);
                $this->db->update($this->table, $dataDes)
                               ->where('idDetallePago', $id)
                               ->execute();

            } else {
                return $this->response->SetResponse(true, "El folio del deslinde ya existe");
            }

        } 

        if($oldFolioEnganche != $data["folio_enganche"]){
            
            $totalFolioEng = $this->db->from($this->table)
                            ->where('folio_enganche', $data['folio_enganche'])
                            ->select(null)
                            ->select('COUNT(*) Total')
                            ->fetch()
                            ->Total;

            if($totalFolioEng == 0){

                  $dataEng = array('folio_enganche' => $data['folio_enganche']);
                  $this->db->update($this->table, $dataEng)
                               ->where('idDetallePago', $id)
                               ->execute();

            } else {
                return $this->response->SetResponse(true, "El folio del enganche ya existe");
            }

        } 

  
        $dataContennt = array('deslinde' => $data["deslinde"],
                              'enganche' => $data["enganche"],
                              'vencimiento_contrato' => $data["vencimiento_contrato"]);

        $this->db->update($this->table, $dataContennt)
                               ->where('idDetallePago', $id)
                               ->execute();

        return $this->response->SetResponse(true, "Se han actualizado correctamente");
               
    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idDetallePago', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

              $this->db->deleteFrom($this->table)
                       ->where('idDetallePago', $id)
                       ->execute();

              return $this->response->SetResponse(true, "Se ha eliminado correctamente el detalle del pago");
        

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }
        
    }

    public function paginar($limit, $position, $id){
       
        $data = $this->db->from($this->table)
                         ->where('idPago', $id)
                         ->limit($limit)
                         ->offset($position)
                         ->fetchAll();
                         
        $total = $this->db->from($this->table)
                          ->where('idPago', $id)
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
                          ->where('idDetallePago', $id)
                          ->fetch();
                          
                       
    }

    public function listarDisponibles(){
      
        return  $this->db->from($this->table)
                           ->fetchAll();
        
    }

    public function titulo($id){

        return $this->db->from('Pagos')
                      ->select(null)
                      ->select('Pagos.folio_contrato')
                        ->where('idPago', $id)
                        ->fetch();
                       
    }

}