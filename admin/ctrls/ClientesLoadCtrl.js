var app = angular.module('ClientesLoadCtrl', []);

app.controller('ClientesLoadCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr', '$routeParams', function ($scope, restApi, $location, auth, locStr, $routeParams) {

	$scope.idParams = $routeParams.id; 
	if($scope.idParams === 'cliente'){
		$location.url('clientes');
	}
	if($scope.idParams === 'depositos'){
		$location.url('depositos');
	}
	if($scope.idParams === 'empleados'){
		$location.url('empleados');
	}
	if($scope.idParams === 'pagos'){
		$location.url('pagos');
	}
	if($scope.idParams === 'terrenos'){
		$location.url('terrenos');
	}
	if($scope.idParams === 'videos'){
		$location.url('videos');
	}
	if($scope.idParams === 'errorserver'){
		$location.url('errorserver');
	}
	if($scope.idParams === 'errorvalidate'){
		$location.url('errorvalidate');
	}
	

}]);

