var app = angular.module('Router', []);
// Rutas
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
          controller: 'InicioCtrl',
          templateUrl: 'home/templates/inicio.html'
        })
        .otherwise({ 
          redirectTo: '/'
        });

}]);