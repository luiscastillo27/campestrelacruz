<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\EmpleadosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/empleados/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = EmpleadosValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->empleados->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = EmpleadosValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->empleados->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{idEmpleado}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->empleados->eliminar($args['idEmpleado']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->empleados->paginar($args['limit'], $args['position']))
                   ); 

    }); 


    $this->get('obtener/{idEmpleado}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->empleados->obtener($args['idEmpleado']))
                   ); 

    });


})->add(new AuthMiddleware($app));
// });