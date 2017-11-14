var app = angular.module('LoginCtrl', []);

app.controller('LoginCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    if(!auth.hasToken()){
        $scope.pie = './templates/pie.html';
    	$scope.vacio =  function(){
    		$scope.login = {
    			usuario:undefined,
    			contrasena:undefined
    		}
    	}
        
    	$scope.login = function(){
            
    		var data = {
    			usuario: $scope.login.usuario,
    			contrasena: $scope.login.contrasena
    		}
    		$("#loadLogin").slideDown();
    		$("#errorServidor").slideUp();
    		$("#RedencialesInvalidas").slideUp();

    		restApi.call({
                method: 'post',
                url: 'auth/autenticar',
                data: data,
                response: function (resp) {   
                    $("#loadLogin").slideUp();
                    if(resp.message == 'Datos correctos'){
                        auth.setToken(resp.result);
                        $location.path('perfil/editar');
                    }
                    if(resp.message == 'Este usuario no existe'){
                    	$("#errorServidor").slideDown();
                    	$scope.login.usuario = '';
                    }
                    if(resp.message == 'Correo y/o password incorrectos'){
                        $("#RedencialesInvalidas").slideDown();
                    	$scope.login.usuario = '';
                    	$scope.login.contrasena = '';	
                    }
                },
                error: function (error) {
                    console.log(error);
                   //$location.path('load/errorserver');
                },
                validationError: function (validerror) {
                    console.log(validerror);
                    //$location.path('load/errorvalidate');
                }
            });

    	}

    
    } else {

        $scope.salir = function(){
            auth.logout();
        }

    }
      
}]);

