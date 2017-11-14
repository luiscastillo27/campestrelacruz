var app = angular.module('EmpleadosCtrl', []);

app.controller('EmpleadosCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.siguiente = 10;
    $scope.empleados = [];
    localStorage["id"] = "";
    $scope.exite = false;
    $scope.cargando = true;
    $scope.vacio = false;

    $scope.vaciar = function(){
        $scope.empelado = {
            puesto: undefined,
            nombre: undefined,
            correo: undefined,
            contrasena: undefined
        }
    }

    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'empleados/paginar/10/0',
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
                $scope.empleados = resp.data;   
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

    $scope.vaciar();
    $scope.paginando();

    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();
        restApi.call({
            method: 'get',
            url: 'empleados/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataEmpleados").append($scope.empleados = data); 
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

    $scope.editempleado = function(id){

        $(".modal-bg").fadeIn(0);
        $("#vEditEmp").fadeIn(0);
        $("#vEditEmp").addClass('animated rubberBand');
        localStorage["id"] = id;
        restApi.call({
            method: 'get',
            url: 'empleados/obtener/'+ id,
            response: function (resp) { 
                document.getElementById("empPuesto").value = resp.puesto;
                document.getElementById("empNombre").value = resp.nombre;
                document.getElementById("empCorreo").value = resp.correo;
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

    $scope.deletempleado = function(id){
        localStorage["id"] = id;
        $(".modal-bg").fadeIn(0);
        $("#vDeleteEmp").fadeIn(0);
        $("#vDeleteEmp").addClass('animated rubberBand');
    }

    $scope.nempleado = function(){
        $(".modal-bg").fadeIn(0);
        $("#vNuevoEmp").fadeIn(0);
        $scope.vaciar();
        $("#vNuevoEmp").addClass('animated rubberBand');
    }


    

   


}]);

