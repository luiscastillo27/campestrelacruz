<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\ClientesValidation,
    App\Middleware\AuthMiddleware;

$app->group('/clientes/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = ClientesValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = ClientesValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{idCliente}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->eliminar($args['idCliente']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->paginar($args['limit'], $args['position']))
                   ); 

    }); 


    $this->get('obtener/{idCliente}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->obtener($args['idCliente']))
                   ); 

    }); 


    $this->get('listarDisponibles', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->clientes->listarDisponibles($req->getParsedBody()))
                   ); 

    });



})->add(new AuthMiddleware($app));
//});

