<?php
$container = $app->getContainer();


// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], Monolog\Logger::DEBUG));
    return $logger;
};

// Database
$container['db'] = function($c){
    $connectionString = $c->get('settings')['connectionString'];
    
    $pdo = new PDO($connectionString['dns'], $connectionString['user'], $connectionString['pass']);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    return new FluentPDO($pdo); 
};

// Models
$container['model'] = function($c){
    return (object)[
        'clientes' => new App\Model\ClientesModel($c->db),
        'depositos' => new App\Model\DepositosrModel($c->db),
        'detallesdepositos' => new App\Model\DetallesdepositosModel($c->db),
        'detallespagos' => new App\Model\DetallespagosModel($c->db),
        'empleados' => new App\Model\EmpleadosModel($c->db),
        'pagos' => new App\Model\PagosModel($c->db),
        'recursos' => new App\Model\RecursosModel($c->db),
        'terrenos' => new App\Model\TerrenosModel($c->db),
        'auth' => new App\Model\AuthModel($c->db),
        'test' => new App\Model\TestModel($c->db),
    ];
};
