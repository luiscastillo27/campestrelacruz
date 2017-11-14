var app = angular.module('DepositosFormCtrl', []);

app.controller('DepositosFormCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.listaDisponibles = [];
    $scope.depositos = [];

    $scope.vaciar = function(){
        $scope.deposito = {
            folio: undefined,
            auth: undefined,
            clave: undefined,
            fecha: undefined,
            idCliente: undefined
        }
    }

    $scope.lista = function(){
        restApi.call({
            method: 'get',
            url: 'clientes/listarDisponibles',
            response: function (resp) { 
                $scope.listaDisponibles = resp; 
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

    $scope.lista();
    $scope.vaciar();

	$scope.guardarDepositos = function(id){

		if(id == 1){
            $("#exitoRegistrarDeposito").slideUp();
            $("#waringRegistrarFolio").slideUp();
            $("#loadRDepositos").slideDown();
            $("#waringRegistrarAuth").slideUp();

            var data = {
                folio: $scope.deposito.folio,
                auth: $scope.deposito.auth,
                clave: $scope.deposito.clave,
                fecha: $scope.deposito.fecha,
                idCliente: $scope.deposito.idCliente
            }

            restApi.call({
                method: 'post',
                url: 'depositos/registrar',
                data: data,
                response: function (resp) {  
                    $("#loadRDepositos").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el deposito'){ 
                        $("#exitoRegistrarDeposito").slideDown();
                        $scope.vaciar();
                        $location.path('load/depositos');
                    } 
                    if(resp.message == 'Esta autenticacion ya esta registrada'){
                        $("#waringRegistrarAuth").slideDown();
                        $scope.deposito.auth = undefined;
                    } 
                    if(resp.message == 'Este folio ya esta registrado'){
                        $("#waringRegistrarFolio").slideDown();
                        $scope.deposito.folio = undefined;
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
        if(id == 2){
            $("#loadUDepositos").slideDown();
            $("#exitoEditarDeposito").slideUp(); 
            $("#waringEditarFolio").slideUp(); 
            $("#waringEditarAuth").slideUp(); 

            var data = {
                folio: document.getElementById("edfolio").value,
                auth: document.getElementById("edauth").value,
                clave: document.getElementById("edclave").value,
                fecha: document.getElementById("edfechaa").value,
                idCliente: document.getElementById("ednombre").value
            }
            var idDelete = localStorage["id"];  
        
            restApi.call({
                method: 'post',
                url: 'depositos/actualizar/' + idDelete,
                data: data,
                response: function (resp) { 
                    $("#loadUDepositos").slideUp();
                    if(resp.message == 'Se han actualizado correctamente'){ 
                        $("#exitoEditarDeposito").slideDown();
                        $scope.vaciar();
                        $location.path('load/depositos');
                    } 
                    if(resp.message == 'Este folio ya existe'){
                        $("#waringEditarFolio").slideDown();
                        document.getElementById("edfolio").value = '';
                    } 
                    if(resp.message == 'Esta autenticacion ya existe'){
                        $("#waringEditarAuth").slideDown();
                        document.getElementById("edauth").value = '';
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

	}

    $scope.irDeposito = function(){
        var id = localStorage["id"];
        $location.path('/deposito/'+ id);
        $scope.clouse();
    }

	

	

	$scope.conformDeleteDeposito = function(id){ 
        var idDelete = localStorage["id"];
      
        if(id === 1){
            $("#deleteDeposito").slideUp();
            $("#deleteWaringDeposito").slideUp();
            $("#loadDeleteDeposito").slideDown();


            restApi.call({
                method: 'delete',
                url: 'depositos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadDeleteDeposito").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el deposito'){
                        $("#deleteDeposito").slideDown(); 
                        $location.path('load/depositos'); 
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringDeposito").slideDown();
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
            $(".modal-bg").fadeOut(500);
            $(".ventana").fadeOut(500);
        }

	}

	$scope.clouse = function(){
	   	$(".modal-bg").fadeOut(500);
		$(".ventana").fadeOut(500);
	}

}]);

