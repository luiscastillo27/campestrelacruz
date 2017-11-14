var app = angular.module('Router', []);
// Rutas
app.config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
          controller: 'LoginCtrl',
          templateUrl: 'templates/login.html'
        })  
        .when('/acceso', {
          controller: 'AccesoCtrl',
          templateUrl: 'templates/acceso.html'
        }) 
        .when('/perfil', {
          controller: 'PerfilCtrl',
          templateUrl: 'templates/perfil.html'
        })
        .when('/perfil/editar', {
          controller: 'EditarPerfilCtrl',
          templateUrl: 'templates/editarperfil.html'
        })
        .when('/empleados', {
          controller: 'EmpleadosCtrl',
          templateUrl: 'templates/empleados.html'
        })
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'templates/login.html'
        })
        .when('/clientes', {
          controller: 'ClientesCtrl',
          templateUrl: 'templates/clientes.html'
        })
        .when('/depositos', {
          controller: 'DepositosCtrl',
          templateUrl: 'templates/depositos.html'
        })
        .when('/deposito/:id', {
          controller: 'DepositoMasCtrl',
          templateUrl: 'templates/masdepositos.html'
        })
        .when('/pagos', {
          controller: 'PagosCtrl',
          templateUrl: 'templates/pagos.html'
        })
        .when('/pago/:id', {
          controller: 'PagoMasCtrl',
          templateUrl: 'templates/maspagos.html'
        })
        .when('/terrenos', {
          controller: 'TerrenosCtrl',
          templateUrl: 'templates/terrenos.html'
        })
        .when('/mapa', {
          templateUrl: 'templates/mapa.html'
        })
        .when('/videos', {
          controller: 'VideosCtrl',
          templateUrl: 'templates/videos.html'
        })
        .when('/errorserver', {
          templateUrl: 'templates/errorserver.html'
        })
        .when('/errorvalidate', {
          templateUrl: 'templates/errorvalidate.html'
        }) 
        .when('/load/:id', {
          controller: 'ClientesLoadCtrl',
          templateUrl: 'templates/load.html'
        })
        .otherwise({ 
          redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
}]);