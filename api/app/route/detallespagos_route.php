<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\DetallesPagosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/detallespagos/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = DetallesPagosValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = DetallesPagosValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->eliminar($args['id']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->paginar($args['limit'], $args['position'], $args['id']))
                   ); 

    }); 


    $this->get('obtener/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->obtener($args['id']))
                   ); 

    }); 


    $this->get('listarDisponibles', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->listarDisponibles($req->getParsedBody()))
                   ); 

    });

    $this->get('titulo/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallespagos->titulo($args['id']))
                   ); 

    });


})->add(new AuthMiddleware($app));
// });