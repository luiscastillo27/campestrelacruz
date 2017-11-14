var app = angular.module('PagosFormCtrl', []);

app.controller('PagosFormCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';

    $scope.vaciar = function(){
        $scope.pago = {
            folio_contrato:undefined,
            idTerreno:undefined,
            fecha:undefined,
            idCliente:undefined
        }
    }

    $scope.disponibles = function(){
        restApi.call({
            method: 'get',
            url: 'clientes/listarDisponibles',
            response: function (resp) { 
                $scope.listarclientes = resp; 
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
    
    $scope.todos = function(){
        restApi.call({
            method: 'get',
            url: 'terrenos/listarTodos',
            response: function (resp) { 
                $scope.terrenos = resp; 
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

    $scope.disponibles();
    $scope.todos();
    $scope.vaciar();

	$scope.guardarPago = function(id){

		if(id == 1){
            $("#exitoRegistrarPagos").slideUp();
            $("#waringRegistrarPagos").slideUp();
            $("#loadRPagos").slideDown();

            var data = {
				folio_contrato:$scope.pago.folio_contrato,
				idTerreno:$scope.pago.idTerreno,
				fecha:$scope.pago.fecha,
				idCliente:$scope.pago.idCliente
			}

            restApi.call({
                method: 'post',
                url: 'pagos/registrar',
                data: data,
                response: function (resp) {   
                    $("#loadRPagos").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el pago'){  
                        $("#exitoRegistrarPagos").slideDown();
                        $scope.vaciar();
                        $location.path('load/pagos');
                    } 
                    if(resp.message == 'Este folio se encuentra registrado'){  
                        $("#waringRegistrarPagos").slideDown();
                        $scope.pago.folio_contrato = "";
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
            $("#loadEPagos").slideDown();
            $("#exitoActualizarCliente").slideUp(); 
            $("#exitoEditarPagos").slideUp(); 
            
            var data = {
                folio_contrato: document.getElementById("updfolio_contrato").value,
                idTerreno: document.getElementById("updidTerreno").value,
                fecha: document.getElementById("updfecha").value,
                idCliente: document.getElementById("updidCliente").value
            }
            var idDelete = localStorage["id"];  

            restApi.call({
                method: 'post',
                url: 'pagos/actualizar/' + idDelete,
                data: data,
                response: function (resp) {   
                    $("#loadEPagos").slideUp();
                    if(resp.message == 'Se han actualizado los cambios'){  
                        $("#exitoEditarPagos").slideDown();
                        $location.path('load/pagos');
                    } 
                    if(resp.message == 'Este folio ya existe'){ 
                        $("#waringEditarPagos").slideDown();
                        document.getElementById("updfolio_contrato").value = '';
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


	$scope.conformDeletePago = function(id){ 
        var idDelete = localStorage["id"];
    
	    if(id === 1){
	      
            $("#deletePagos").slideUp();
            $("#deleteWaringPagos").slideUp();
            $("#loadDeletePag").slideDown();

            restApi.call({
                method: 'delete',
                url: 'pagos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadDeletePag").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el pago'){
                        $("#deletePagos").slideDown(); 
                        $location.path('load/pagos'); 
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringPagos").slideDown();
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
        localStorage["id"] = '';
	}

    $scope.irDeposito = function(){
        var id = localStorage["id"];
        $location.path('/pago/'+ id);
        $scope.clouse();
    }
      
}]);

