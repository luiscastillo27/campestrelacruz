<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\PagosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/pagos/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = PagosValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = PagosValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->eliminar($args['id']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->paginar($args['limit'], $args['position'] ))
                   ); 

    }); 


    $this->get('obtener/{idCliente}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->obtener($args['idCliente']))
                   ); 

    }); 


    $this->get('listarDisponibles', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->pagos->listarDisponibles($req->getParsedBody()))
                   ); 

    });



})->add(new AuthMiddleware($app));
//});