<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Validation\RecursosValidation,
    App\Middleware\AuthMiddleware,
    Slim\Http\UploadedFile;

$app->group('/recursos/', function () {


    $this->post('registrar', function ($req, $res, $args) {

        $r = RecursosValidation::validate($req->getParsedBody());
        
        if(!$r->response){
            return $res->withHeader('Content-type', 'application/json')
                       ->withStatus(422)
                       ->write(json_encode($r->errors));
        }
    
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->recursos->registrar($req->getParsedBody()))
                   ); 

    });


    $this->get('paginar/{limit}/{position}', function ($req, $res, $args) {
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->recursos->paginar($args['limit'], $args['position'] ))
                   ); 

    });


    $this->delete('eliminar/{id}', function ($req, $res, $args) {

        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->recursos->eliminar($args['id']))
                   ); 

    });
 
    $this->get('listar', function ($req, $res, $args) {
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->recursos->listar($req->getParsedBody()))
                   ); 

    });


    $this->get('obtener/{id}', function ($req, $res, $args) {

        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->recursos->obtener($args['id']))
                   ); 

    });

  


//})->add(new AuthMiddleware($app));
});