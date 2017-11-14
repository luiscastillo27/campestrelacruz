<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class ClientesModel{
    private $db;
    private $table  = 'Clientes';
    private $table2  = 'Usuarios';
    private $table3  = 'Terreno';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

        $folio_contrato = $data['folio_contrato'];
        $correo = $data['correo'];
        $folio_contrato = $data['folio_contrato'];

        $fecha = $data['fecha'];
        $fecha = explode('T', $fecha);
        $fecha = current($fecha);
        $data['fecha'] = $fecha;

        $totalNombre = $this->db->from($this->table)
                            ->where('correo', $correo)
                            ->select(null)
                            ->select('COUNT(*) Total')
                            ->fetch()
                            ->Total;
        if($totalNombre == 0){

                $totalFolio = $this->db->from($this->table)
                                  ->where('folio_contrato', $folio_contrato)
                                  ->select(null)
                                  ->select('COUNT(*) Total')
                                  ->fetch()
                                  ->Total;

                if($totalFolio == 0){
                    
                    $opciones = [
                        'cost' => 15,
                    ];
                    $password = $data['contrasena'];
                    $data['contrasena'] = password_hash($password, PASSWORD_DEFAULT ,  $opciones);


                    $dataUsuario = array('usuario' => $data['correo'],
                                          'contrasena' => $data['contrasena'],
                                          'tipo' => 3);

                    $this->db->insertInto($this->table2, $dataUsuario)
                                               ->execute();

                                               

                    $old = $this->db->from($this->table2)
                        ->select(null)
                        ->select('idUsuarios')
                        ->where('usuario', $data["correo"])
                        ->fetch();

                    $idClienteActual = $old->idUsuarios;

                    $dataCliente = array( 
                                         'idCliente' => $idClienteActual,
                                         'folio_contrato' => $data["folio_contrato"],
                                         'correo' => $data["correo"],
                                         'nombre_completo' => $data["nombre_completo"],
                                         'telefono' => $data["telefono"],
                                         'domicilio' => $data["domicilio"],
                                         'fecha' => $data["fecha"]);
                   
                    $this->db->insertInto($this->table, $dataCliente)
                                               ->execute();

                    $this->response->result = $data;
                    return $this->response->SetResponse(true, "Se ha registrado correctamente el cliente");

                } else {
                    return $this->response->SetResponse(false, "Este folio ya existe");
                }

                
        } else {
          return $this->response->SetResponse(false, "Este cliente ya esta registrado");
        }

    }

    public function actualizar($data, $id){

      $fecha = $data['fecha'];
      $fecha = explode('T', $fecha);
      $fecha = current($fecha);
      $data['fecha'] = $fecha;

      $oldData = $this->db->from($this->table)
                          ->where('idCliente', $id)
                          ->select(null)
                          ->select('nombre_completo, folio_contrato')
                          ->fetch();
                          
      $oldid = $oldData->nombre_completo;
      $oldFolio = $oldData->folio_contrato;
    
      if($oldid != $data["nombre_completo"]){

          $totalTerreno = $this->db->from($this->table)
                            ->where('nombre_completo', $data["nombre_completo"])
                            ->select(null)
                            ->select('COUNT(*) Total')
                            ->fetch()
                            ->Total;

          if($totalTerreno == 0){

             $dataFolio = array('usuario' => $data["correo"]);

             $this->db->update($this->table, $data)
                           ->where('idCliente', $id)
                           ->execute();

            $this->db->update($this->table2, $dataFolio)
                           ->where('idUsuarios', $id)
                           ->execute();
                  
          } else {
              return $this->response->SetResponse(false, "Este cliente ya esta registrado");
          }

          
      } 

  
      if($oldFolio != $data["folio_contrato"]){ 
              
           
              $totalFolio = $this->db->from($this->table)
                                     ->where('folio_contrato', $data["folio_contrato"])
                                     ->select(null)
                                     ->select('COUNT(*) Total')
                                     ->fetch()
                                     ->Total;

            
              if($totalFolio == 0){

                  $dataFolio = array('folio_contrato' => $data["folio_contrato"]);
                  $this->db->update($this->table, $dataFolio)
                           ->where('idCliente', $id)
                           ->execute();
    
              } else {
                  return $this->response->SetResponse(false, "Este folio ya existe");
              }
            
      }


        $dataContennt = array(
                              'telefono' => $data["telefono"],
                              'fecha' => $data["fecha"],
                              'domicilio' => $data["domicilio"]);

        $this->db->update($this->table, $dataContennt)
                               ->where('idCliente', $id)
                               ->execute();

        return $this->response->SetResponse(true, "Se han actualizado correctamente");
               
    }

    public function eliminar($id){

        $total = $this->db->from($this->table)
                          ->where('idCliente', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

              $this->db->deleteFrom($this->table)
                 ->where('idCliente', $id)
                 ->execute();

              $this->db->deleteFrom($this->table2)
                 ->where('idUsuarios', $id)
                 ->execute();
              return $this->response->SetResponse(true, "Se ha eliminado correctamente el cliente");
        

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }
        
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
                        ->where('idCliente', $id)
                        ->fetch();
                       
    }

    public function listarDisponibles(){
      
        return  $this->db->from($this->table)
                           ->fetchAll();
        
    }

}