// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var objetos = [];
angular.module('starter', ['ionic', 'ngSanitize', 'angular-loading-bar']) 

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('inicio', {
    url: '/inicio',
    templateUrl: 'templates/list.html',
    controller: 'getnews'
  })

  // if the url matches something like /movie/88 then this route
  // will fire off the MovieDetailCtrl (controllers.js)
  .state('item', {
    url: '/inicio/item/:aId',
    templateUrl: 'templates/item.html',
    controller: 'getnews'
  });

  // if none of the above routes are met, use this fallback
  $urlRouterProvider.otherwise('inicio');

})
// .directive( 'transit', function() {
//   var linkFn = function( scope, element, attrs ) {

//     if (scope.$last){
//       $('#listageneral .item').each(function(){

//       $(this).transition({ opacity: 1});

//     });

//     }

//   }
//   return {
//     link: linkFn
//   }

// })
//Obtener las news
.controller("getnews", ["$scope", "$sce", "$http", '$state',
    function($scope, $sce, $http, $state){
  $http.get("http://www.rssmix.com/u/8140309/rss.json").success(function(data){

    $scope.news     = data.channel.item;
    $scope.whichartist = $state.params.aId;



  });

  $scope.doRefresh = function(){

    $http.get("http://www.rssmix.com/u/8140309/rss.json").success(function(data){

    $scope.news       = data.channel.item;
    $scope.$broadcast('scroll.refreshComplete');

    });

  }


  $scope.$on('cfpLoadingBar:completed', function(){
    
    $("#listageneral *").hide().fadeIn(1500)

  });
  $scope.contenidohtml = function(html) {
    $( ' #contenidodeitem a' ).each(function(){

      var link = $(this).attr("href");
      $(this).attr("href", "#");
      $(this).attr("onclick", "window.open('"+ link +"', '_system', 'location=yes'); return false;");

    });
    var linkfuente = $("#fuentelink").attr("href");
    $("#fuentelink").attr("onclick", "window.open('"+ linkfuente +"', '_system', 'location=yes'); return false;");

  return $sce.trustAsHtml(html);

  };

}])