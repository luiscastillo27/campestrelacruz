var app = angular.module('VideosFormCtrl', []);

app.controller('VideosFormCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', 'restApiImg', function ($scope, restApi, $location, auth, locStr, restApiImg) {

    auth.redirectIfNotExists();
    $scope.pie = './templates/pie.html';

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

    $scope.vacio();

    $scope.clouse = function(){
        $(".modal-bg").fadeOut(500);
        $(".ventana").fadeOut(500);
        $(".alert").fadeOut(0);
        localStorage["id"] = '';
        $scope.vacio();
    }

    $scope.conformDeleteVideo = function(id){ 

        var idDelete = localStorage["id"];

        if(id === 1){
            $("#exitoEliminarRecurso").slideUp();
            $("#deleteWaringDelete").slideUp();
            $("#loadRVideos").slideDown();

            restApi.call({
                method: 'delete',
                url: 'recursos/eliminar/' + idDelete,
                response: function (resp) {   
                    $("#loadRVideos").slideUp();
                    if(resp.message == 'Se ha eliminado correctamente recurso'){
                        $("#exitoEliminarRecurso").slideDown();  
                        $location.path('load/videos'); 
                    } 
                    if(resp.message == 'Este id no se encuentra'){
                        $("#deleteWaringDelete").slideDown();
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
            $("#vDeleteVdo").fadeOut(500);
        }

    }

    $scope.guardarRecurso = function(){

        $("#waringRegistrarRecursos").slideUp();
        $("#exitoRegistrarRecursos").slideUp();
        $("#waringRegistrarPortada").slideUp();
        $("#waringRegistrarVideo").slideUp();
        $("#loadRRecursos").slideDown();

        if($scope.archivo.imagengrandeimg != undefined && $scope.archivo.imagengrandevideo != undefined){

            if($scope.archivo.imagengrandevideo != undefined){
                $scope.archivo.imagengrande = $scope.archivo.imagengrandevideo;
            }

        } 
        
        if($scope.archivo.imagengrandeimg != undefined || $scope.archivo.imagengrandevideo != undefined){

            if($scope.archivo.imagengrandeimg != undefined){
                $scope.archivo.imagengrande = $scope.archivo.imagengrandeimg;
            }

            if($scope.archivo.imagengrandevideo != undefined){
                $scope.archivo.imagengrande = $scope.archivo.imagengrandevideo;
            }

        }

        if($scope.archivo.imagenpeque == undefined){
            $("#loadRRecursos").slideUp();
            $("#waringRegistrarPortada").slideDown();
        } else {


            if($scope.archivo.imagengrande != undefined){


                var titulo = $scope.archivo.titulo;
                var contenido = $scope.archivo.contenido;
                var imagengrande = $scope.archivo.imagengrande; 
                var imagenpeque = $scope.archivo.imagenpeque;
                var formData = new FormData();
                formData.append("titulo", titulo);
                formData.append("contenido", contenido);
                formData.append("imagengrande", imagengrande);
                formData.append("imagenpeque", imagenpeque);

                restApiImg.call({
                    method: 'post',
                    url: 'recursos/registrar',
                    data: formData,
                    response: function (resp) { 
    
                        $("#loadRRecursos").slideUp();
                        if(resp.message == 'Se han subido correctamente los archivos'){
                            $("#exitoRegistrarRecursos").slideDown();
                            $scope.vacio();
                            $location.path('load/videos'); 
                        }
                        if(resp.message == 'El archivo es invalido, debe ser una imagen ( jpg, jpeg, png o gif )'){
                            $("#waringRegistrarRecursos").slideDown();
                            $scope.archivo.archivo = null;
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
                $("#loadRRecursos").slideUp();
                $("#waringRegistrarVideo").slideDown();
            }

        }

    }

}]);

