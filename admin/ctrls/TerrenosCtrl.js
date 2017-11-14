var app = angular.module('TerrenosCtrl', []);

app.controller('TerrenosCtrl', ['$scope', 'restApi', '$location', 'auth', 'locStr',  function ($scope, restApi, $location, auth, locStr) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    var tipoUsuario = auth.getUserData().tipo;
    if(tipoUsuario == 0){
        $scope.tipoUsr = true;
    } else {
        $scope.tipoUsr = false;
    }
	$scope.siguiente = 10;
	$scope.terrenos = [];
    localStorage["id"] = "";
    $scope.exite = false;
    $scope.cargando = true;
    $scope.vacio = false;

    
    $scope.vaciar = function(){
        $scope.terreno = {
            lote: undefined,
            manzana: undefined,
            costo: undefined,
            idCliente: undefined
        }
    }


    $scope.paginando = function(){
    	restApi.call({
            method: 'get',
            url: 'terrenos/paginar/10/0',
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
                $scope.terrenos = resp.data;   
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
            url: 'terrenos/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataTerrenos").append($scope.terrenos = data); 
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

    $scope.editterreno = function(id){

        $(".modal-bg").fadeIn(0);
        $("#vEditTrn").fadeIn(0);
        $("#vEditTrn").addClass('animated rubberBand');
        localStorage["id"] = id;
    	restApi.call({
	        method: 'get',
	        url: 'terrenos/obtener/'+ id,
	        response: function (resp) { 
                document.getElementById("lote").value = resp.lote;
                document.getElementById("manzana").value = resp.manzana;
                document.getElementById("costo").value = resp.costo;
                document.getElementById("idClientes").value = resp.idCliente;
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

    $scope.deleterreno = function(id){
        localStorage["id"] = id;
    	$(".modal-bg").fadeIn(0);
   		$("#vDeleteTrn").fadeIn(0);
        $("#vDeleteTrn").addClass('animated rubberBand');
    }

    $scope.nterreno = function(){
    	$(".modal-bg").fadeIn(0);
   		$("#vNuevoTrn").fadeIn(0);
        $("#vNuevoTrn").addClass('animated rubberBand');
        $scope.vaciar();
    }



}]);

