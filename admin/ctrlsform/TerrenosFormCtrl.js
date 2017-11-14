var app = angular.module('TerrenosFormCtrl', []);

app.controller('TerrenosFormCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr',  function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.listaDisponibles = [];
    $scope.terrenos = [];

    $scope.vaciar = function(){
        $scope.terreno = {
            lote: undefined,
            manzana: undefined,
            costo: undefined,
            idCliente: undefined
        }
    }

    $scope.vaciar();

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

    $scope.clouse = function(){
    	$(".modal-bg").fadeOut(500);
		$(".ventana").fadeOut(500);
        $(".alert").fadeOut(500);
        localStorage["id"] = "";
        $scope.vaciar();
    }

    $scope.guardarTerreno = function(id){
        
        if(id == 1){
            $("#loadRTerreno").slideDown();
            $("#waringRegistrarTerrenop").slideUp();
            $("#exitoRegistrarTerrenop").slideUp();

            if($scope.terreno.idCliente == 0){
                disponible = "Si";
            } else {
                disponible = "No";
            }

            var data = {
                lote: $scope.terreno.lote,
                manzana: $scope.terreno.manzana,
                costo: $scope.terreno.costo,
                disponibilidad: disponible,
                idCliente: $scope.terreno.idCliente
            }

            restApi.call({
                method: 'post',
                url: 'terrenos/registrar',
                data: data,
                response: function (resp) {  
                    $("#loadRTerreno").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el terreno'){ 
                        $("#exitoRegistrarTerrenop").slideDown();
                        $scope.vaciar();
                        $location.path('load/terrenos'); 
                    } 
                    if(resp.message == 'El terreno ya esta registrado'){
                        $("#waringRegistrarTerrenop").slideDown();
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
            $("#loadUTerreno").slideDown();
            $("#waringActualizarTerrenop").slideUp();
            $("#exitoActualizarTerrenop").slideUp();

            if(document.getElementById("idClientes").value == 0){
                disponible = "Si";
            } else {
                disponible = "No";
            }

            var data = {
                lote: document.getElementById("lote").value,
                manzana: document.getElementById("manzana").value,
                costo: document.getElementById("costo").value,
                disponibilidad: disponible,
                idCliente: document.getElementById("idClientes").value
            }
            var idDelete = localStorage["id"];  

            restApi.call({
                method: 'post',
                url: 'terrenos/actualizar/' + idDelete,
                data: data,
                response: function (resp) { 
                    $("#loadUTerreno").slideUp(); 
                    if(resp.message == 'Se ha modificado correctamente el terrenos'){
                        $("#exitoActualizarTerrenop").slideDown();
                        $location.path('load/terrenos'); 
                    }
                    if(resp.message == 'Este id no se encuentra'){
                        $("#waringActualizarTerrenop").slideDown(); 
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

    $scope.conformDeleteTerreno = function(id){
        var idDelete = localStorage["id"];
    
        if(id == 1){
            $("#loadDTerreno").slideDown();
            $("#deleteWaringTerrenop").slideUp();
            $("#deleteTerrenop").slideUp();

            restApi.call({
                method: 'delete',
                url: 'terrenos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadDTerreno").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el terrenos'){
                        $("#deleteTerrenop").slideDown();
                        $location.path('load/terrenos'); 
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

