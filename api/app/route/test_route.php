<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Middleware\AuthMiddleware;

$app->group('/test/', function () {


    $this->post('registrar', function ($req, $res, $args) {
        
        return $res->withHeader('Content-type', 'application/json')
                   ->write(
                     json_encode($this->model->test->registrar($req->getParsedBody()))
                   ); 
                   
    });
  


})->add(new AuthMiddleware($app));
// });