var app = angular.module('ClientesFormCtrl', []);

app.controller('ClientesFormCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr', '$rootScope', function ($scope, restApi, $location, auth, locStr, $rootScope) {

	auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    //$scope.vacio = true;

    $scope.vaciar = function(){
        $scope.cliente = {
            folio_contrato: undefined,
            fecha: undefined,
            telefono: undefined,
            correo: undefined,
            nombre_completo: undefined,
            domicilio: undefined,
            contrasena: undefined
        }
    }

    $scope.vaciar();

    $scope.clouse = function(){
		$(".modal-bg").fadeOut(500);
		$(".ventana").fadeOut(500);
		$(".alert").fadeOut(0);
	}

	$scope.guardarCliente = function(id){

        if(id == 1){
            $("#exitoRegistrarClientep").slideUp();
            $("#waringRegistrarCliente").slideUp();
            $("#loadRCliente").slideDown();
            $("#waringRegistrarMza").slideUp();

            var data = {
                folio_contrato: $scope.cliente.folio_contrato,
                fecha: $scope.cliente.fecha,
                correo: $scope.cliente.correo,
                telefono: $scope.cliente.telefono,
                nombre_completo: $scope.cliente.nombre_completo,
                domicilio: $scope.cliente.domicilio,
                contrasena: $scope.cliente.contrasena
            }
            
            

            $("#showNuewDada").load('./load/html/clientes.html');
            restApi.call({
                method: 'post',
                url: 'clientes/registrar',
                data: data,
                response: function (resp) {  
                    $("#loadRCliente").slideUp();
                    if(resp.message == 'Se ha registrado correctamente el cliente'){ 
                        $scope.vaciar();
                        $("#exitoRegistrarClientep").slideDown();
                        $location.path('load/cliente');
                    } 
                    if(resp.message == 'Este folio ya existe'){
                        $("#waringRegistrarCliente").slideDown();
                        $("#loadRCliente").slideUp();
                        $scope.cliente.folio_contrato = undefined;
                    } 
                    if(resp.message == 'Este cliente ya esta registrado'){
                        $("#waringRegistrarMza").slideDown();
                        $scope.cliente.correo = '';
                        $("#loadRCliente").slideUp();
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
            $("#loadACliente").slideDown();
            $("#exitoActualizarCliente").slideUp(); 
            $("#waringActualizarCliente").slideUp(); 
            $("#waringActualizarMza").slideUp(); 
            
            

            var data = {
                folio_contrato: document.getElementById("upfolio_contrato").value,
                fecha: document.getElementById("upfecha").value,
                correo: document.getElementById("upcorreo").value,
                telefono: document.getElementById("uptelefono").value,
                nombre_completo: document.getElementById("upnombre_completo").value,
                domicilio: document.getElementById("updomicilio").value
            }
            var idDelete = localStorage["id"];  

            restApi.call({
                method: 'post',
                url: 'clientes/actualizar/' + idDelete,
                data: data,
                response: function (resp) {   
                    $("#loadACliente").slideUp();
                    if(resp.message == 'Se han actualizado correctamente'){  
                        $("#exitoActualizarCliente").slideDown();
                        $location.path('load/cliente');
                    } 
                    if(resp.message == 'Este folio ya existe'){
                        $("#waringActualizarCliente").slideDown();
                        document.getElementById("upfolio_contrato").value = "";
                    } 
                    if(resp.message == 'Este terreno ya esta vendido'){
                        $("#waringActualizarMza").slideDown();
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


    $scope.conformDeleteCliente = function(id){
        var idDelete = localStorage["id"];
    
        if(id === 1){
            $("#deleteRegistrar").slideUp();
            $("#deleteWaringRegistrar").slideUp();
            $("#loadDelete").slideDown();

            restApi.call({
                method: 'delete',
                url: 'clientes/eliminar/' + idDelete,
                response: function (resp) {  
                    $("#loadDelete").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el cliente'){
                        $("#deleteRegistrar").slideDown(); 
                        $location.path('load/cliente');
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringRegistrar").slideDown();
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

}]);

