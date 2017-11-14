// var URLactual = window.location;
// if( URLactual == 'http://localhost/~Luis/terreno/angularjs/'){
//  window.location = "http://localhost/~Luis/terreno/angularjs/";
// }

var frontApp = angular.module('jimApp', ['ngRoute', 'Router', 'Services', 'ClientesCtrl', 
  'MenuCtrl', 'LoginCtrl', 'DepositosCtrl' ,'EmpleadosCtrl', 'PagosCtrl',
  'TerrenosCtrl', 'VideosCtrl', 'FormsCtrl', 'DepositoMasCtrl', 'PagoMasCtrl', 'PerfilCtrl', 'AccesoCtrl'
  , 'EditarPerfilCtrl',
  'ClientesFormCtrl', 'DepositoMasFormCtrl', 'DepositosFormCtrl', 'EmpleadosFormCtrl', 'PagoMasFormCtrl',
  'PagosFormCtrl', 'TerrenosFormCtrl', 'VideosFormCtrl',

  'ClientesLoadCtrl'
  ]);

(function(){ 
    if(typeof(localStorage[API.token_name]) === 'undefined'){
        localStorage[API.token_name] = '';
    }
    if(typeof(localStorage['idGlobal']) === 'undefined'){
        localStorage['idGlobal'] = '';
    }
}());