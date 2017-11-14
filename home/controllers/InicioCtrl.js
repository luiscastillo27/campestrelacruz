var app = angular.module('InicioCtrl', []);

app.controller('InicioCtrl',  ['$scope', 'restApi', '$location', 'auth', 'locStr', function ($scope, restApi, $location, auth, locStr) {

    $scope.url = API.img_url;
    $scope.recursos = [];
    $scope.imagen = "";
    $scope.abir = 0;
    var secciones = [$("#inicio").offset().top, $("#gallery").offset().top, $("#nosotros").offset().top, $("#contacto").offset().top, $("body").height()];
    $("#menu a").on("click", menuMover ) ;
    

    $(window).scroll(function(){
        if($(this).scrollTop() > secciones[0] -61 && $(this).scrollTop() < secciones[1] -61 ){
            $(".btn-abajo").slideUp(300);
            $('#menu a').eq(0).addClass('activo');
        }else{
            $(".btn-abajo").slideDown(300);
            $('#menu a').eq(0).removeClass('activo');
        }

        if($(this).scrollTop() > secciones[1] -61 && $(this).scrollTop() < secciones[2] -61 ){
            $('#menu a').eq(1).addClass('activo');
        }else{
            $('#menu a').eq(1).removeClass('activo');
        }

        if($(this).scrollTop() > secciones[2] -61 && $(this).scrollTop() < secciones[3] -61 ){
            $('#menu a').eq(2).addClass('activo');
        }else{
            $('#menu a').eq(2).removeClass('activo');
        }

        if($(this).scrollTop() > secciones[3] -61 && $(this).scrollTop() < secciones[4] -61 ){
            $('#menu a').eq(3).addClass('activo');
        }else{
            $('#menu a').eq(3).removeClass('activo');
        }
    });

    function menuMover(){
        var seccion = $(this).attr('href');
        $("body, html").animate({
            scrollTop: $(seccion).offset().top -61
        },800);
        $scope.togglemenu(1);
        return false;
    }

    $scope.subir = function(){
        $("body, html").animate({
            scrollTop: "0px"
        },300);
    }

    $scope.filtro = function(name){  

        $("#filTodos").removeClass("selected");
        $("#filFotos").removeClass("selected");
        $("#filVideo").removeClass("selected");

        if(name == 'all'){
            $("#filTodos").addClass("selected");
            $scope.fil = " ";
        } else {

            if(name == 'img'){
                $("#filFotos").addClass("selected");
            }
            if(name == 'video'){
                $("#filVideo").addClass("selected");
            }
            $scope.fil = name;
        }

    }

    $scope.irLogin = function(){

        console.log("#DE5E60");
        var url="./admin";
        var a = document.createElement("a");
        a.target = "_blank";
        a.href = url;
        a.click();

    }

    $scope.paginando = function(){

        restApi.call({
            method: 'get',
            url: 'recursos/listar',
            response: function (resp) { 
                $scope.recursos = resp.data;
            },
            error: function (error) {
                console.log(error);
            },
            validationError: function (validerror) {
                console.log(validerror);
            }
        });
        
    }

    $scope.paginando();

    $scope.close = function(){
        $(".oscuro").fadeOut(100);
        $('.ventana').fadeOut(100);
        document.getElementById("body").style.overflow = "scroll";
    }

    $scope.abrirGalerry = function(id){ 
        $('.ventana').addClass('animated rubberBand'); 
        document.getElementById("body").style.overflow = "hidden";
        restApi.call({
            method: 'get',
            url: 'recursos/obtener/' + id,
            response: function (resp) { 
                $(".oscuro").fadeIn(100);
                $(".ventana").fadeIn(100);
                $scope.tipoVentana = resp.tipo;
                $scope.titulo = resp.titulo;
                $scope.imagen = resp.imagengrande;
                $scope.video = resp.imagengrande;
                $scope.contenido = resp.contenido;
            },
            error: function (error) {
                console.log(error);
            },
            validationError: function (validerror) {
                console.log(validerror);
            }
        });

    }

    $scope.togglemenu = function(id){
        var ventana_ancho = $(window).width();
        if(ventana_ancho < 1000){
            if(id === 0){
                $scope.abir = 1;
                $("#menu").animate({"left": "70%"});
            }
            if(id === 1){
                $scope.abir = 0;
                $("#menu").animate({"left": "-70%"});
            }
        }  
    }


}]);

