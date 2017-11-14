var app = angular.module('EditarPerfilCtrl', []);

app.controller('EditarPerfilCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.idUser = auth.getUserData().usuario;
    var tipoUsuario = auth.getUserData().tipo;
    $scope.tipoUsr = true;

	$scope.vaciar = function(){
		$scope.perfil = {
			contrasena: undefined,
			password: undefined,
			repassword: undefined,
		}
	}

	$scope.vaciar();


    $scope.cambiarpass = function(){

        var data = {
            contrasena: $scope.perfil.passactual,
            password: $scope.perfil.password,
            repassword: $scope.perfil.repassword
        }	
        
        $("#exito").slideUp();
        $("#waring").slideUp();
        $("#waringPassword").slideUp();
        $("#load").slideDown();
        
        if($scope.perfil.password == $scope.perfil.repassword){


            restApi.call({
                method: 'post',
                url: 'auth/actualizar/'+ $scope.idUser,
                data: data,
                response: function (resp) { 
                    $("#load").slideUp();
                    if(resp.message == 'El password se ha modificado'){
                        $("#exito").slideDown();
                        $scope.vaciar();
                    }
                    if(resp.message == 'El password actual no coincide'){
                        $("#waring").slideDown();
                        $scope.perfil.passactual = '';
                    }  
                },
                error: function (error) {
                    console.log(error);
                    $location.path('load/errorserver');
                },
                validationError: function (validerror) {
                    console.log(validerror);
                    $location.path('load/errorvalidate');
                }
            });

             
        } else {
            $scope.perfil.password = "";
            $scope.perfil.repassword = "";
            $(".alert").slideUp();
            $("#waringPassword").slideDown();
        }

    }

 
    
      
}]);

