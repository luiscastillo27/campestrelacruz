var app = angular.module('PerfilCtrl', []);

app.controller('PerfilCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    var id = auth.getUserData().idUsuarios;
    var tipoUsuario = auth.getUserData().tipo;
    if(tipoUsuario == 0){
        $scope.tipoUsr = true;
    } else {
        $scope.tipoUsr = false;
    }
    $scope.mios = [];
    $scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;

	$scope.vaciar = function(){
		$scope.perfil = {
			contrasena: undefined,
			password: undefined,
			repassword: undefined,
		}
	}

	$scope.vaciar();

    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'terrenos/mios/10/0/' + id,
            response: function (resp) { 
                if(resp.total > 10){
                    $scope.exite = true;
                }
                if(resp.total > 0){
                    $scope.cargando = false;
                }
                if(resp.total == 0){
                    $scope.cargando = false;
                    $scope.vacio = true;
                }
                $scope.mios = resp.data;
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
    }

    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();

        restApi.call({
            method: 'get',
            url: 'terrenos/mios/'+ $scope.siguiente + "/0/" + id ,
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataClientes").append($scope.mios = data); 
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

    }


    $scope.paginando();

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
                url: 'auth/actualizar/'+ id,
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

