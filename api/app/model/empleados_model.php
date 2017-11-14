<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class EmpleadosModel{
    private $db;
    private $table  = 'Empleados';
    private $table2  = 'Usuarios';
    private $response;
    
    public function __CONSTRUCT($db){
        $this->db = $db;
        $this->response = new Response();
    }

    public function registrar($data){

        $correo = $data['correo'];

        $total = $this->db->from($this->table)
                          ->where('correo', $correo)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        if($total == 0){
 
            $opciones = [
                'cost' => 15,
            ];
            $password = $data['contrasena'];
            
            $data['contrasena'] = password_hash($password, PASSWORD_DEFAULT ,  $opciones);

            $dataEmpleado = array('nombre' => $data['nombre'],
                                  'correo' => $data['correo'],
                                  'puesto' => $data['puesto']);

            if($data['puesto'] == 'Administrador'){ $types = 0;}
            if($data['puesto'] == 'Vendedor'){ $types = 2;}
            if($data['puesto'] == 'Secretaria'){ $types = 1;}

            $dataUsuario = array('usuario' => $data['correo'],
                                  'contrasena' => $data['contrasena'],
                                  'tipo' => $types);
        
            $this->db->insertInto($this->table, $dataEmpleado)
                 ->execute();

            $this->db->insertInto($this->table2, $dataUsuario)
                 ->execute();

            return $this->response->SetResponse(true, "Se ha registrado correctamente el empleado");

        } else {
            return $this->response->SetResponse(false, "Este correo electronico ya existe");
        }   

    }

    public function actualizar($data, $id){


        $total = $this->db->from($this->table)
                          ->where('idEmpleado', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

            if($data['puesto'] == 'Administrador'){ $types = 0;}
            if($data['puesto'] == 'Vendedor'){ $types = 2;}
            if($data['puesto'] == 'Secretaria'){ $types = 1;}

            $this->db->update($this->table, $data)
                     ->where('idEmpleado', $id)
                     ->execute();

            $dataUsuario = array('tipo' => $types);
            $this->db->update($this->table2, $dataUsuario)
                     ->where('usuario', $data["correo"])
                     ->execute();

            return $this->response->SetResponse(true, "Se ha modificado correctamente el empleado");

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }

    }

    public function eliminar($idEmpleado){

        $total = $this->db->from($this->table)
                          ->where('idEmpleado', $idEmpleado)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

            $data = $this->db->from($this->table)
                        ->select(null)
                        ->select('puesto, correo')
                        ->where('idEmpleado', $idEmpleado)
                        ->fetch();

            $puesto = $data->puesto;
            $correo = $data->correo;
 
            if($puesto != 'Administrador'){

              $this->db->deleteFrom($this->table)
                       ->where('idEmpleado', $idEmpleado)
                       ->execute();

              $this->db->deleteFrom($this->table2)
                       ->where('usuario', $correo)
                       ->execute();

              return $this->response->SetResponse(true, "Se ha eliminado correctamente el empleado");

            } else {
              
              return $this->response->SetResponse(false, "No se pueden eliminar empleados administradores");
              
            }
            
                 
            

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
                        ->select(null)
                        ->select('idEmpleado, nombre, correo, puesto')
                        ->where('idEmpleado', $id)
                        ->fetch();
                        
    }

}