var app = angular.module('DepositoMasCtrl', []);

app.controller('DepositoMasCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', '$routeParams', function ($scope, restApi, $location, auth, locStr, $routeParams) {
   	
    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
   	$scope.idParams = $routeParams.id; 
    localStorage["idGlobal"] = "";
    localStorage["idGlobal"] = $scope.idParams;
    $scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;
    localStorage["id"] = "";
    $scope.exite = false;
    $scope.title = '';


    restApi.call({
        method: 'get',
        url: 'detallesdepositos/titulo/' + localStorage["idGlobal"],
        response: function (resp) { 
            $scope.title = 'Folio #' + resp.folio;
            $scope.subtitle = 'Autorización #' + resp.auth;
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

    $scope.vaciar();

    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'detallesdepositos/paginar/10/0/' + localStorage["idGlobal"],
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
                $scope.detallesdepositos = resp.data; 
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

    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();

        restApi.call({
            method: 'get',
            url: 'detallesdepositos/paginar/'+ $scope.siguiente + "/0/" + localStorage["idGlobal"],
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataClientes").append($scope.detallesdepositos = data); 
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

    $scope.timer = function(){
        var timer = setInterval(function(){
            $scope.paginando();
        }, 27000);
    }

    $scope.paginando();
    $scope.vaciar();

	$scope.ndepositomas = function(){
	   $(".modal-bg").fadeIn(0);
	   $("#vNuevoDepMs").fadeIn(0);
       $("#vNuevoDepMs").addClass('animated rubberBand');
	}


	$scope.editdepositomas = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vEditDepMs").fadeIn(0);
       $("#vEditDepMs").addClass('animated rubberBand');
	   localStorage["id"] = id;

        restApi.call({
            method: 'get',
            url: 'detallesdepositos/obtener/' + id,
            response: function (resp) { 
                document.getElementById("idTerrenos").value = resp.idTerreno;
                document.getElementById("pago_ingreso").value = resp.pago_ingreso;
                document.getElementById("pago_justificado").value = resp.pago_justificado;
                document.getElementById("concepto").value = resp.concepto;
                document.getElementById("observaciones").value = resp.observaciones;
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

	$scope.deletedepositomas = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vDeleteDepMs").fadeIn(0);
       $("#vDeleteDepMs").addClass('animated rubberBand');
	   localStorage["id"] = id;
	}

	


}]);

