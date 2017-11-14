var app = angular.module('MenuCtrl', []);

app.controller('MenuCtrl',  ['$scope', 'auth', function ($scope, auth) {

	$scope.loadmenu = function(){

		//ADMIN
		if(tipo == 0){
			$scope.Clientes = true;
			$scope.Depositos = true;
			$scope.Empleados = true;
			$scope.Pagos = true;
			$scope.Terrenos = true;
			$scope.Recursos = true;
			$scope.Mapa = true;
		}

		//SECRETARIA
		if(tipo == 1){
			$scope.Pagos = true;
			$scope.Depositos = true;
			$scope.Mapa = true;
		}

		//VENDEDOR
		if(tipo == 2){
			$scope.Terrenos = true;
			$scope.Mapa = true;
		}

		//CLIENTE
		if(tipo == 3){
			$scope.Perfil = true;
			$scope.Mapa = true;
		}

	}

    if(auth.hasToken()){
    	var tipo = auth.getUserData().tipo;
    	$scope.loadmenu();
    } 
    


}]);

