<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class DepositosrModel{
    private $db;
    private $table  = 'Depositos';
    private $table2  = 'DetallesDepositos';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

        $folio = $data['folio'];
        $auth = $data['auth'];
    
      $fecha = $data['fecha'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['fecha'] = $fecha;

      // $clave = $data['clave'];
      // $clave = explode('.', $clave);
      // $clave = current($clave);
      // //1970-01-01T07:27:00

      // $clave = $data['clave'];
      // $clave = explode('T', $clave);
      // $clave = end($clave);

      // //11:00:00.000Z
      // $data['clave'] = $clave;


        $totalFolio = $this->db->from($this->table)
                          ->where('folio', $folio)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        
        if($totalFolio == 0){
                

                $totalAuth = $this->db->from($this->table)
                          ->where('auth', $auth)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

                

                if($totalAuth == 0){

                    $this->db->insertInto($this->table, $data)
                                               ->execute();

                    return $this->response->SetResponse(true, "Se ha registrado correctamente el deposito");

                } else {
                    return $this->response->SetResponse(false, "Esta autenticacion ya esta registrada");
                }
        

        } else {
            return $this->response->SetResponse(false, "Este folio ya esta registrado");
        }
        
    }

    public function actualizar($data, $id){

      $fecha = $data['fecha'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      
      $data['fecha'] = $fecha;


        $oldData = $this->db->from($this->table)
                          ->where('idDeposito', $id)
                          ->select(null)
                          ->select('folio, auth')
                          ->fetch();
                          
        $oldFolio = $oldData->folio;
        $oldAuth = $oldData->auth;

        if($oldFolio != $data["folio"]){

            $totalFolio = $this->db->from($this->table)
                          ->where('folio', $data['folio'])
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        
            if($totalFolio == 0){

                $dataFolio = array('folio' => $data['folio']);
                $this->db->update($this->table, $dataFolio)
                                       ->where('idDeposito', $id)
                                       ->execute();

            } else {
                return $this->response->SetResponse(false, "Este folio ya existe");
            }

        }

        if($oldAuth != $data["auth"]){
          
              $totalAuth = $this->db->from($this->table)
                          ->where('auth', $auth)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

                

              if($totalAuth == 0){

                  $dataAuth = array('auth' => $data['auth']);
                  $this->db->update($this->table, $dataAuth)
                                         ->where('idDeposito', $id)
                                         ->execute();

              } else {
                return $this->response->SetResponse(false, "Esta autenticacion ya existe");
              }

        }


            $dataContennt = array('idCliente' => $data["idCliente"],
                                  'clave' => $data["clave"],
                                  'fecha' => $data["fecha"]);

            $this->db->update($this->table, $dataContennt)
                                       ->where('idDeposito', $id)
                                       ->execute();

            return $this->response->SetResponse(true, "Se han actualizado correctamente");                

    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idDeposito', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){
 
              $this->db->deleteFrom($this->table)
                       ->where('idDeposito', $id)
                       ->execute();

              $this->db->deleteFrom($this->table2)
                       ->where('idDeposito', $id)
                       ->execute();

              return $this->response->SetResponse(true, "Se ha eliminado correctamente el deposito"); 

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }
        
    }

    public function paginar($limit, $position){
       
        $data = $this->db->from($this->table)
                        ->select(null)
                        ->select('Depositos.idCliente, Depositos.idCliente, Depositos.folio, Depositos.auth,
                          Depositos.clave, Depositos.fecha, Clientes.nombre_completo,  Depositos.idDeposito')
                        ->join('Clientes on Depositos.idCliente = Clientes.idCliente')
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
                        ->select(null)
                        ->select('Depositos.idCliente, Depositos.idCliente, Depositos.folio, Depositos.auth,
                          Depositos.clave, Depositos.fecha, Clientes.nombre_completo,  Depositos.idDeposito')
                        ->join('Clientes on Depositos.idCliente = Clientes.idCliente')
                         ->where('idDeposito', $id)
                        ->fetch();
                  
    }

}