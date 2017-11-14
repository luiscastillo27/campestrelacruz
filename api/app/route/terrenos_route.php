<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\TerrenosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/terrenos/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = TerrenosValidation::validate($req->getParsedBody());
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = TerrenosValidation::validate($req->getParsedBody());
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{idTerreno}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->eliminar($args['idTerreno']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->paginar($args['limit'], $args['position']))
                   ); 

    }); 


    $this->get('obtener/{idTerreno}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->obtener($args['idTerreno']))
                   ); 

    });

    $this->get('listarDisponibles', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->listarDisponibles($req->getParsedBody()))
                   ); 

    });

    $this->get('listarTodos', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->listarTodos($req->getParsedBody()))
                   ); 

    });


    $this->get('mios/{limit}/{position}/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->terrenos->mios($args['limit'], $args['position'], $args['id']))
                   ); 

    });

})->add(new AuthMiddleware($app));
//});