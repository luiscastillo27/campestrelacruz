var app = angular.module('PagoMasFormCtrl', []);

app.controller('PagoMasFormCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', '$routeParams', function ($scope, restApi, $location, auth, locStr, $routeParams) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';

    $scope.vaciar = function(){
        $scope.pagosmas = {
            vencimiento_contrato:undefined,
            folio_deslinde:undefined,
            folio_enganche:undefined,
            deslinde:undefined,
            enganche:undefined,
            idPago: undefined
        }
    }

    $scope.vaciar();

	$scope.clouse = function(){
	    $(".modal-bg").fadeOut(500);
		$(".ventana").fadeOut(500);
	}

	$scope.conformDeletePagoms = function(id){ 
    	   
        var idDelete = localStorage["id"];
    
        if(id === 1){
            $("#exitoDeleteMas").slideUp();
            $("#deleteWaringDeleteMas").slideUp();
            $("#loadDeleteMas").slideDown();

            restApi.call({
                method: 'delete',
                url: 'detallespagos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadDeleteMas").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el detalle del pago'){
                        $("#exitoDeleteMas").slideDown();  
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringDeleteMas").slideDown();
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
            $("#vDeleteCln").fadeOut(500);
        }

	}

    $scope.guardarPagosMas = function(id){

        
  
        if(id == 1){
            $("#exitoRegistrarMasPagos").slideUp();
            $("#waringEngancheMasPagos").slideUp();
            $("#waringDeslindeMasPagos").slideUp();
            $("#loadRMasPagos").slideDown();

            var data = {
                vencimiento_contrato: $scope.pagosmas.vencimiento_contrato,
                folio_deslinde: $scope.pagosmas.folio_deslinde,
                folio_enganche: $scope.pagosmas.folio_enganche,
                deslinde: $scope.pagosmas.deslinde,
                enganche: $scope.pagosmas.enganche,
                idPago: localStorage["idGlobal"]
            };

            restApi.call({
                method: 'post',
                url: 'detallespagos/registrar',
                data: data,
                response: function (resp) {   
                    $("#loadRMasPagos").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el detalle del pago'){ 
                        $("#exitoRegistrarMasPagos").slideDown();
                        $scope.vaciar();
                    } 
                    if(resp.message == 'El folio del enganche ya existe'){ 
                        $("#waringEngancheMasPagos").slideDown();
                        $scope.pagosmas.folio_enganche = '';
                    } 
                    if(resp.message == 'El folio del deslinde ya existeo'){ 
                        $("#waringDeslindeMasPagos").slideDown();
                        $scope.pagosmas.folio_deslinde = '';
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
            $("#exitoActualizarMasPagos").slideUp();
            $("#waringEngancheMasPagosEdit").slideUp();
            $("#waringDeslindeMasPagosEdit").slideUp();
            $("#loadUMasPagos").slideDown();

            var data = {
                vencimiento_contrato: document.getElementById("vencimiento_contrato").value,
                folio_deslinde: document.getElementById("folio_deslinde").value,
                folio_enganche: document.getElementById("folio_enganche").value,
                deslinde: document.getElementById("deslinde").value,
                enganche: document.getElementById("enganche").value
            };

            restApi.call({ 
                method: 'post',
                url: 'detallespagos/actualizar/' + localStorage["idGlobal"],
                data: data,
                response: function (resp) {   
        
                    $("#loadUMasPagos").slideUp();
                    if(resp.message == 'Se han actualizado correctamente'){ 
                        $("#exitoActualizarMasPagos").slideDown();
                        $scope.vaciar();
                    } 
                    if(resp.message == 'El folio del enganche ya existe'){ 
                        $("#waringEngancheMasPagosEdit").slideDown();
                        $scope.pagosmas.folio_enganche = '';
                    } 
                    if(resp.message == 'El folio del deslinde ya existe'){ 
                        $("#waringDeslindeMasPagosEdit").slideDown();
                        $scope.pagosmas.folio_deslinde = '';
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
      
}]);

