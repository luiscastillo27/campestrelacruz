var app = angular.module('FormsCtrl', []);

app.controller('FormsCtrl',  ['$scope', function ($scope) {

	$scope.clienteV      = "./formularios/cliente.ventana.html";
	$scope.depositosV    = "./formularios/depositos.ventana.html";
	$scope.empleadosV    = "./formularios/empleados.ventana.html";
	$scope.masdepositosV = "./formularios/mas-depositos.ventana.html";
	$scope.maspagosV     = "./formularios/mas-pagos.ventana.html";
	$scope.pagosV        = "./formularios/pagos.ventana.html";
	$scope.terrenosV     = "./formularios/terrenos.ventana.html";
	$scope.videosV       = "./formularios/videos.ventana.html";

	$scope.abir = 0;
	$scope.btnMenu = function(id){
		var ventana_ancho = $(window).width();
        if(ventana_ancho < 1000){
            if(id === 0){
                $scope.abir = 1;
                $(".sidebar").animate({"left": "260px"});
            }
            if(id === 1){
                $scope.abir = 0;
                $(".sidebar").animate({"left": "-260px"});
            }
        }  
	}

}]);

