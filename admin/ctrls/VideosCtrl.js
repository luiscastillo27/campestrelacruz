var app = angular.module('VideosCtrl', []);

app.controller('VideosCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', 'restApiImg', function ($scope, restApi, $location, auth, locStr, restApiImg) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';
    $scope.url = API.img_url; 
    $scope.cargando = true;
    $scope.vacio = false;
    $scope.siguiente = 10;
    $scope.exite = false;

    $scope.vacio = function(){
        $scope.archivo = {
            titulo: undefined,
            tipo: undefined,
            imagenpeque: undefined,
            imagengrande: undefined,
            imagengrandeimg: undefined,
            imagengrandevideo: undefined,
            contenido: undefined
        }
    }

    $scope.paginando = function(){
        restApi.call({
            method: 'get',
            url: 'recursos/paginar/10/0',
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
                $scope.recursos = resp.data; 
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
            url: 'recursos/paginar/'+ $scope.siguiente + "/0",
            response: function (resp) { 
                if(resp.data){
                    $(".mostrar-btn").fadeIn();
                    $(".mostrar-img").fadeOut();
                    var data = resp.data;
                    $("#dataVideos").append($scope.recursos = data); 
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
    $scope.vacio();



    $scope.nvideo = function(){
       $(".modal-bg").fadeIn(0);
       $("#vNuevoVdo").fadeIn(0);
       $("#vNuevoVdo").addClass('animated rubberBand');
    }

    $scope.delevideo = function(id){
       $(".modal-bg").fadeIn(0);
       $("#vDeleteVdo").fadeIn(0);
       $("#vDeleteVdo").addClass('animated rubberBand');
       localStorage["id"] = id;
    }


    

}]);

