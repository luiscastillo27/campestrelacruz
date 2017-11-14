<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\DepositosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/depositos/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = DepositosValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->depositos->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = DepositosValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->depositos->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->depositos->eliminar($args['id']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->depositos->paginar($args['limit'], $args['position']))
                   ); 

    }); 


    $this->get('obtener/{idCliente}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->depositos->obtener($args['idCliente']))
                   ); 

    }); 

//})->add(new AuthMiddleware($app));
});