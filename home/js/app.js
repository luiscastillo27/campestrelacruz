// var URLactual = window.location;
// if( URLactual == 'http://localhost/~Luis/terreno/angularjs/'){
//  window.location = "http://localhost/~Luis/terreno/angularjs/";
// }

var frontApp = angular.module('jimApp', ['Services', 'InicioCtrl', 'youtube-embed']);

(function(){
    if(typeof(localStorage[API.token_name]) === 'undefined'){
        localStorage[API.token_name] = '';
    }
}());