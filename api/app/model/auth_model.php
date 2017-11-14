<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class AuthModel{
    private $db;
    private $table  = 'Usuarios';
    private $table2 = 'Clientes';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function autenticar($data){

        //return $data;

        $total = $this->db->from($this->table)
                          ->where('usuario', $data["usuario"])
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total == 0){
            return $this->response->SetResponse(false, "Este usuario no existe");
        } else{
            
            $old = $this->db->from($this->table)
                        ->select(null)
                        ->select('contrasena')
                        ->where('usuario', $data["usuario"])
                        ->fetch();

            $pass = $old->contrasena;
            $contrasena = $data['contrasena'];


        
            if(password_verify($contrasena,$pass)){

               

                $usuarios = $this->db->from($this->table)
                                 ->where('usuario', $data["usuario"])
                                 ->select(null)
                                 ->select('idUsuarios, usuario, tipo')
                                 ->fetch();

                if(is_object($usuarios)){
                    
                    $token = Auth::SignIn([
                        'idUsuarios' => $usuarios->idUsuarios,
                        'usuario' => $usuarios->usuario,
                        'tipo' => $usuarios->tipo,
                    ]);
                    
                    $this->response->result = $token;
                    return $this->response->SetResponse(true, "Datos correctos");

                }

            } else{
                return $this->response->SetResponse(false, "Correo y/o password incorrectos");
            }

          
        }

    }

    public function actualizar($data, $id){


        $old = $this->db->from($this->table)
                        ->select(null)
                        ->select('contrasena')
                        ->where('usuario', $id)
                        ->fetch();

        $pass = $old->contrasena;
        $contrasena = $data['contrasena'];

        if(password_verify($contrasena,$pass)){

            $opciones = [
                'cost' => 15,
            ];
            $password = $data['password'];
            $data['password'] = password_hash($password, PASSWORD_DEFAULT ,  $opciones);

            $data = array('contrasena' => $data['password']);
            $this->db->update($this->table, $data)
                                   ->where('usuario', $id)
                                   ->execute();

            return $this->response->SetResponse(true, "El password se ha modificado");
        } else {
            return $this->response->SetResponse(true, "El password actual no coincide"); 
        }             

    }

    public function obtener($id){

      return $this->db->from($this->table2)
                      ->select(null)
                      ->select('nombre_completo, telefono, domicilio, folio_contrato')
                      ->where('idCliente', $id)
                      ->fetch();
                  
    }

}