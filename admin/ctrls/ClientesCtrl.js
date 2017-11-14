var app = angular.module('ClientesCtrl', []);

app.controller('ClientesCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr',function ($scope, restApi, $location, auth, locStr) {

	auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';

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
    $scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;
	$scope.vaciar();
	$scope.listaDisponibles = [];
    $scope.listaTodos = [];
	$scope.clientes = [];
    localStorage["id"] = "";
    $scope.exite = false;
    var con = 0;

	restApi.call({
        method: 'get',
        url: 'terrenos/listarDisponibles',
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
    
    

    $scope.timer = function(){
        var timer = setInterval(function(){
            $scope.paginar();
            if(con == 27){
                clearInterval(timer);
            }
            con++;
        }, 1000);
    }

    $scope.paginar = function(){
        restApi.call({
            method: 'get',
            url: 'clientes/paginar/10/0',
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
                $scope.clientes = resp.data; 
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

    $scope.paginar();

    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();

        restApi.call({
            method: 'get',
            url: 'clientes/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataClientes").append($scope.clientes = data); 
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

    

	$scope.ncliente = function(){
		$(".modal-bg").fadeIn(0);
		$("#vNuevoCln").fadeIn(0);
        $("#vNuevoCln").addClass('animated rubberBand'); 
	}


	$scope.editcliente = function(id){
		$(".modal-bg").fadeIn(0);
   		$("#vEditCln").fadeIn(0);
        $("#vEditCln").addClass('animated rubberBand');
        localStorage["id"] = id;

        restApi.call({
            method: 'get',
            url: 'clientes/obtener/'+ id,
            response: function (resp) { 
                document.getElementById("upfolio_contrato").value = resp.folio_contrato;
                document.getElementById("upfecha").value = resp.fecha;
                document.getElementById("upcorreo").value = resp.correo;
                document.getElementById("uptelefono").value = resp.telefono;
                document.getElementById("upnombre_completo").value = resp.nombre_completo;
                document.getElementById("updomicilio").value = resp.domicilio;
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

	$scope.deletecliente = function(id){
		$(".modal-bg").fadeIn(0);
   		$("#vDeleteCln").fadeIn(0);
        localStorage["id"] = id;
        $("#vDeleteCln").addClass('animated rubberBand'); 
	}

	

}]);

