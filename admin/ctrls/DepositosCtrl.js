var app = angular.module('DepositosCtrl', []);

app.controller('DepositosCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
	$scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;
    $scope.exite = false;
    $scope.listaDisponibles = [];
    $scope.depositos = [];
    localStorage["id"] = "";
    $scope.idDep = 1;

    $scope.vaciar = function(){
		$scope.deposito = {
			folio: undefined,
			auth: undefined,
			clave: undefined,
			fecha: undefined,
			idCliente: undefined
		}
	}

	$scope.vaciar();


    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'depositos/paginar/10/0',
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
                $scope.depositos = resp.data; 
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

    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();

        restApi.call({
            method: 'get',
            url: 'depositos/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataDepositos").append($scope.depositos = data); 
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


	$scope.ndeposito = function(){
	   $(".modal-bg").fadeIn(0);
	   $("#vNuevoDep").fadeIn(0);
       $("#vNuevoDep").addClass('animated rubberBand');
	}

	$scope.verdeposito = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vVerDep").fadeIn(0);
       $("#vVerDep").addClass('animated rubberBand');
       localStorage["id"] = id;
       restApi.call({
            method: 'get',
            url: 'depositos/obtener/'+ id,
            response: function (resp) { 
                document.getElementById("folio").value = resp.folio;
                document.getElementById("auth").value = resp.auth;
                document.getElementById("clave").value = resp.clave;
                document.getElementById("fechaa").value = resp.fecha;
                document.getElementById("nombre").value = resp.nombre_completo;
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

	$scope.editdeposito = function(id){
        localStorage["id"] = id;
	    $(".modal-bg").fadeIn(0);
	    $("#vEditDep").fadeIn(0);
        $("#vEditDep").addClass('animated rubberBand');
        restApi.call({
            method: 'get',
            url: 'depositos/obtener/'+ id,
            response: function (resp) {
                document.getElementById("edfolio").value = resp.folio;
                document.getElementById("edauth").value = resp.auth;
                document.getElementById("edclave").value = resp.clave;
                document.getElementById("edfechaa").value = resp.fecha;
                document.getElementById("ednombre").value = resp.idCliente;
                // selectedIndex
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

	$scope.deletedeposito = function(id){
       localStorage["id"] = id;
	   $(".modal-bg").fadeIn(0);
	   $("#vDeleteDep").fadeIn(0);
       $("#vDeleteDep").addClass('animated rubberBand');
	}

	
}]);

