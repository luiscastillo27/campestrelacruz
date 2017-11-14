var app = angular.module('DepositoMasFormCtrl', []);

app.controller('DepositoMasFormCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', '$routeParams', function ($scope, restApi, $location, auth, locStr, $routeParams) {
   	
    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';

    $scope.lista = function(){ 
        restApi.call({
            method: 'get',
            url: 'terrenos/listarTodos',
            response: function (resp) { 
                $scope.listaTodos = resp;
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

    $scope.vaciar = function(){
        $scope.masdepositos = {
            idTerreno: undefined,
            pago_ingreso: undefined,
            pago_justificado: undefined,
            concepto: undefined,
            observaciones: undefined,
            idDeposito:undefined
        }
    }

    $scope.lista(); 
    $scope.vaciar();

    $scope.clouse = function(){
        $(".modal-bg").fadeOut(500);
        $(".ventana").fadeOut(500);
        $(".alert").fadeOut(500);
    }

	$scope.guardarMasDepositos = function(id){

    	

    	if(id == 1){
            $("#exitoRegistrarMasDepositos").slideUp();
            $("#loadRMasDepositos").slideDown();

            var data = {
	    		idTerreno: $scope.masdepositos.idTerreno,
	    		pago_ingreso: $scope.masdepositos.pago_ingreso,
	    		pago_justificado: $scope.masdepositos.pago_justificado,
	    		concepto: $scope.masdepositos.concepto,
	    		observaciones: $scope.masdepositos.observaciones,
                idDeposito:localStorage["idGlobal"]
	    	}
        
            restApi.call({
                method: 'post',
                url: 'detallesdepositos/registrar',
                data: data,
                response: function (resp) {   
                    $("#loadRMasDepositos").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el detalle del deposito'){
                        $("#exitoRegistrarMasDepositos").slideDown();
                        $scope.vaciar();
                        $location.path('load/depositos'); 
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
            $("#loadEMasDepositos").slideDown();
            $("#exitoActualizarMasDepositosbb").slideUp();
            
            

            var data = {
                idTerreno: document.getElementById("idTerrenos").value,
                pago_ingreso: document.getElementById("pago_ingreso").value,
                pago_justificado: document.getElementById("pago_justificado").value,
                concepto: document.getElementById("concepto").value,
                observaciones: document.getElementById("observaciones").value,
                idDeposito:localStorage["idGlobal"]
            }
            var idDelete = localStorage["id"];  
     
            restApi.call({
                method: 'post',
                url: 'detallesdepositos/actualizar/' + idDelete,
                data: data,
                response: function (resp) {   
                    $("#loadEMasDepositos").slideUp();
                    if(resp.message == 'Se han actualizado correctamente'){ 
                        $("#exitoActualizarMasDepositosbb").slideDown();
                        $location.path('load/depositos'); 
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


	$scope.conformDeleteDepositomas = function(id){ 
		var idDelete = localStorage["id"];
    
        if(id == 1){
            $("#loadDTerreno").slideDown();
            $("#deleteWaringTerrenop").slideUp();
            $("#deleteTerrenop").slideUp();

            restApi.call({
                method: 'delete',
                url: 'detallesdepositos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadDTerreno").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el detalle del deposito'){
                        $("#deleteTerrenop").slideDown();
                        $location.path('load/depositos'); 
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringTerrenop").slideDown();
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
            $("#vDeleteTrn").fadeOut(500);
        }
	}


}]);

