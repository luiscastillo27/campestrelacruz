<?php
namespace App\Model;

use App\Lib\Response,
    App\Lib\Auth;

class RecursosModel{
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
   

        if($data['imagengrande'] != '' || $fileG != ''){

            if( ($typepeque === 'image/jpeg') || ($typepeque === 'image/png') || ($typepeque === 'image/jpg') || ($typepeque === 'image/gif')){

                $trozos = explode(".", $fileP); 
                $ex = end($trozos); 
                $foto = "p".date("Ymd").date("HIs").".".$ex;
                $data['imagenpeque'] = $foto;
              
                      
                if(move_uploaded_file($_FILES["imagenpeque"]["tmp_name"], "img/".$foto)){

                    if(isset($data['imagengrande'])){

                      $video = $data['imagengrande'];
                      $video = explode('=', $video);
                      $video = end($video);
                      $data['imagengrande'] =  $video;
                      $data["tipo"] = 'video';
                      $this->db->insertInto($this->table, $data)
                                                 ->execute();
                                                 
                      return $this->response->SetResponse(true, "Se han subido correctamente los archivos");

                    } else {

                        if( ($typegrande === 'image/jpeg') || ($typegrande === 'image/png') || ($typegrande === 'image/jpg') || ($typegrande === 'image/gif')){

                              $trozos = explode(".", $fileG); 
                              $ex = end($trozos); 
                              $foto = "g".date("Ymd").date("HIs").".".$ex;
                              $data['imagengrande'] = $foto;
                              $data["tipo"] = 'img';
                                    
                              if(move_uploaded_file($_FILES["imagengrande"]["tmp_name"], "img/".$foto)){

                                  $this->db->insertInto($this->table, $data)
                                                         ->execute();
                        
                                  return $this->response->SetResponse(true, "Se han subido correctamente los archivos");

                              } else {
                                  return $this->response->SetResponse(false, "La imagen no se ha pidido subir");
                              }

                        }  else {
                            return $this->response->SetResponse(false, "El archivo es invalido, debe ser una imagen ( jpg, jpeg, png o gif )");
                        }

                    }

                    


                } else {
                    return $this->response->SetResponse(false, "El imagen no se ha pidido subir :)");
                }
     
            }  else {
              return $this->response->SetResponse(false, "El archivo es invalido, debe ser una imagen ( jpg, jpeg, png o gif )");
            }
            
        } else {
          return $this->response->SetResponse(false, "Hace falta la imagen grande");
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

    public function eliminar($id){
        
        $total = $this->db->from($this->table)
                          ->where('idRecurso', $id)
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;
        if($total != 0){

              $this->db->deleteFrom($this->table)
                                         ->where('idRecurso', $id)
                                         ->execute();

              return $this->response->SetResponse(true, "Se ha eliminado correctamente recurso");
        

        } else {
            return $this->response->SetResponse(false, "Este id no se encuentra");
        }

    }

    public function listar(){
        
        $par = $this->db->from($this->table)
                         ->where('idRecurso %2=0')
                         ->orderBy('idRecurso ASC')
                         ->fetchAll();

        $imp = $this->db->from($this->table)
                         ->where('idRecurso %2=1')
                         ->orderBy('idRecurso ASC')
                         ->fetchAll();

        $data = $this->db->from($this->table)
                         ->orderBy('idRecurso ASC')
                         ->fetchAll();

        $total = $this->db->from($this->table)
                          ->where('idRecurso %2=0')
                          ->select(null)
                          ->select('COUNT(*) Total')
                          ->fetch()
                          ->Total;

        for ($i=0; $i < $total; $i++) { 
            $tot[$i] = $i;
        }
             
        return [
            'data'   => $data,
            'total' => $tot
        ];            
        

    }


    public function obtener($id){
        
        return $this->db->from($this->table)
                          ->where('idRecurso', $id)
                          ->fetch();

    }


}