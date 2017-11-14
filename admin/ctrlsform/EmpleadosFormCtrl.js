var app = angular.module('EmpleadosFormCtrl', []);

app.controller('EmpleadosFormCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.empleados = [];
    
    $scope.vaciar = function(){
        $scope.empelado = {
            puesto: undefined,
            nombre: undefined,
            correo: undefined,
            contrasena: undefined
        }
    }

    $scope.vaciar();

    $scope.clouse = function(){
        $(".modal-bg").fadeOut(500);
        $(".ventana").fadeOut(500);
        $(".alert").fadeOut(500);
        localStorage["id"] = "";
        $scope.vaciar();
    }

    $scope.guardarEmpleado = function(id){

        $("#exitoRegistrar").slideUp();
        $("#exitoActualizar").slideUp(); 
        $("#waringActualizar").slideUp();
        $("#emailExist").slideUp();
        $("#pass8Digit").slideUp();
        
        var password = $scope.empelado.contrasena;
        if(password != null &&password.length > 7){

            $("#load").slideDown();
            if(id == 1){


                var data = {
                    puesto: $scope.empelado.puesto,
                    nombre: $scope.empelado.nombre,
                    correo: $scope.empelado.correo,
                    contrasena: $scope.empelado.contrasena
                }

                restApi.call({
                    method: 'post',
                    url: 'empleados/registrar',
                    data: data,
                    response: function (resp) {   
                        $("#load").slideUp();
                        if(resp.message == 'Se ha registrado correctamente el empleado'){ 
                            $("#exitoRegistrar").slideDown();
                            $scope.vaciar();
                            $location.path('load/empleados');
                        } 
                        if(resp.message == 'Este correo electronico ya existe'){
                            $("#emailExist").slideDown();
                            $scope.empelado.correo = undefined;
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
        } else {
            $("#pass8Digit").slideDown();
            $scope.empelado.contrasena = undefined;            
        }
            if(id == 2){
                $("#loadActualizar").slideDown();
                var data = {
                    puesto: document.getElementById("empPuesto").value,
                    nombre: document.getElementById("empNombre").value,
                    correo: document.getElementById("empCorreo").value
                }
                var idDelete = localStorage["id"];  

                restApi.call({
                    method: 'post',
                    url: 'empleados/actualizar/' + idDelete,
                    data: data,
                    response: function (resp) { 
                        $("#loadActualizar").slideUp();
                        if(resp.message == 'Se ha modificado correctamente el empleado'){
                            $("#exitoActualizar").slideDown(); 
                            $location.path('load/empleados');
                        }
                        if(resp.message == 'Este id no se encuentra'){
                            $("#waringActualizar").slideDown(); 
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

    $scope.conformDeleteEmpleado = function(id){
        var idDelete = localStorage["id"];
    
        if(id == 1){
            $("#deleteEmpleado").slideUp();
            $("#warningDelete").slideUp();
            $("#loadEliminarEmpleado").slideDown();

            restApi.call({
                method: 'delete',
                url: 'empleados/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadEliminarEmpleado").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente el empleado'){
                        $("#deleteEmpleado").slideDown();
                        $location.path('load/empleados'); 
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#warningDelete").slideDown();
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

