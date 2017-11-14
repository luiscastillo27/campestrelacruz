var app = angular.module('PagoMasCtrl', []);

app.controller('PagoMasCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', '$routeParams', function ($scope, restApi, $location, auth, locStr, $routeParams) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
	$scope.idParams = $routeParams.id; 
    localStorage["id"] = '';
    localStorage["idGlobal"] = "";
    localStorage["idGlobal"] = $scope.idParams;
    $scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;
    localStorage["id"] = "";
    $scope.exite = false;
    $scope.title = '';
    var idActualizar;

    restApi.call({
        method: 'get',
        url: 'detallespagos/titulo/' + localStorage["idGlobal"],
        response: function (resp) { 
            $scope.title = 'Folio #' + resp.folio_contrato;
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
        $scope.pagosmas = {
            vencimiento_contrato:undefined,
            folio_deslinde:undefined,
            folio_enganche:undefined,
            deslinde:undefined,
            enganche:undefined,
            idPago: undefined
        }
    }

    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'detallespagos/paginar/10/0/' + localStorage["idGlobal"],
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
                $scope.detallespagos = resp.data; 
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
            url: 'detallespagos/paginar/'+ $scope.siguiente + "/0/" + localStorage["idGlobal"],
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataPagos").append($scope.detallespagos = data); 
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

    $scope.paginando();
    $scope.vaciar();


	$scope.npagoms = function(){
	   $(".modal-bg").fadeIn(0);
	   $("#vNuevoPgsMs").fadeIn(0);
       $("#vNuevoPgsMs").addClass('animated rubberBand');
	}


	$scope.editpagoms = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vEditPgsMs").fadeIn(0);
       $("#vEditPgsMs").addClass('animated rubberBand');
       localStorage["idGlobal"] = id;
        restApi.call({
            method: 'get',
            url: 'detallespagos/obtener/' + id,
            response: function (resp) { 
                idActualizar = resp.idDetallePago;
                document.getElementById("vencimiento_contrato").value = resp.vencimiento_contrato;
                document.getElementById("folio_deslinde").value = resp.folio_deslinde;
                document.getElementById("folio_enganche").value = resp.folio_enganche;
                document.getElementById("deslinde").value = resp.deslinde;
                document.getElementById("enganche").value = resp.enganche;
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

	$scope.deletepagoms = function(id){
	   $(".modal-bg").fadeIn(0);
	   $("#vDeletePgsMs").fadeIn(0);
       $("#vDeletePgsMs").addClass('animated rubberBand');
       localStorage["id"] = id;
	}

   
}]);

