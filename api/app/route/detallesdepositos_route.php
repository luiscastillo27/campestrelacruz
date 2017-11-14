<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\DetallesDepositosValidation,
    App\Middleware\AuthMiddleware;

$app->group('/detallesdepositos/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        $r = DetallesDepositosValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->registrar($req->getParsedBody()))
                   ); 
    });


    $this->post('actualizar/{id}', function ($req, $res, $args) {
        $r = DetallesDepositosValidation::validate($req->getParsedBody(), true);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    });

    $this->delete('eliminar/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->eliminar($args['id']))
                   ); 

    });

    $this->get('paginar/{limit}/{position}/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->paginar($args['limit'], $args['position'], $args['id']))
                   ); 

    }); 


    $this->get('obtener/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->obtener($args['id']))
                   ); 

    }); 


    $this->get('titulo/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->detallesdepositos->titulo($args['id']))
                   ); 

    }); 


   


})->add(new AuthMiddleware($app));
// });