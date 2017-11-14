var app = angular.module('PagosCtrl', []);

app.controller('PagosCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
	$scope.clientes = [];
    $scope.pagos = [];
	$scope.cargando = true;
    $scope.vacio = false;
    localStorage["id"] = "";
    $scope.exite = false;

    $scope.vaciar = function(){
	    $scope.pago = {
	    	folio_contrato:undefined,
	    	idTerreno:undefined,
	    	fecha:undefined,
	    	idCliente:undefined
	    }
	}

	$scope.vaciar();

	$scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'pagos/paginar/10/0',
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
                $scope.pagos = resp.data; 
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


    $scope.mostrarmas = function(next){

        $scope.siguiente = next + 10;
        $(".mostrar-btn").fadeOut();
        $(".mostrar-img").fadeIn();

        restApi.call({
            method: 'get',
            url: 'pagos/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataPagos").append($scope.pagos = data); 
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


	$scope.npago = function(){
	   $(".modal-bg").fadeIn(0);
	   $("#vNuevoPgs").fadeIn(0);
       $("#vNuevoPgs").addClass('animated rubberBand');
	}

	$scope.verpago = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vVerPgs").fadeIn(0);
       $("#vVerPgs").addClass('animated rubberBand');
       localStorage["id"] = id;
	    restApi.call({
            method: 'get',
            url: 'pagos/obtener/' + id,
            response: function (resp) { 
                document.getElementById("folio_contratoc").value = resp.folio_contrato;
                document.getElementById("idTerrenos").value = resp.idTerreno;
                document.getElementById("fechac").value = resp.fecha;
                document.getElementById("idCliente").value = resp.idCliente;
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

	$scope.editpago = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vEditPgs").fadeIn(0);
       $("#vEditPgs").addClass('animated rubberBand');
       localStorage["id"] = id;
	   restApi.call({
            method: 'get',
            url: 'pagos/obtener/' + id,
            response: function (resp) { 
                document.getElementById("updfolio_contrato").value = resp.folio_contrato;
                document.getElementById("updidTerreno").value = resp.idTerreno;
                document.getElementById("updfecha").value = resp.fecha;
                document.getElementById("updidCliente").value = resp.idCliente;
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

	$scope.deletepago = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vDeletePgs").fadeIn(0);
       localStorage["id"] = id;
       $("#vDeletePgs").addClass('animated rubberBand');
	}

      
}]);

