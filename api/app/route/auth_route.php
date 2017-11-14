<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\AuthValidation,
    App\Validation\LoginValidation,
    App\Middleware\AuthMiddleware;

$app->group('/auth/', function () {

    $this->post('actualizar/{id}', function ($req, $res, $args) {
      
        $r = AuthValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->auth->actualizar($req->getParsedBody(), $args['id']))
                   ); 
    
    });


    $this->post('autenticar', function ($req, $res, $args) {
        $r = LoginValidation::validate($req->getParsedBody(), false);
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->auth->autenticar($req->getParsedBody()))
                   ); 
    
    });


    $this->get('obtener/{id}', function ($req, $res, $args) {
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->auth->obtener($args['id']))
                   ); 

    }); 

});