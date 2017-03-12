const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


//ROUTES
weatherApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/views/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'src/views/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'src/views/forecast.html',
            controller: 'forecastController'
        })
})



//SERVICES
weatherApp.service('cityService', function() {
    this.city = "tunis";
});



//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
      cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource','$routeParams', 'cityService',
function($scope, $resource, $routeParams,cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';

    $scope.weatherApi =
    $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
    {callback:"JSON_CALLBACK" }, { get: { method :"JSONP" }});
    $scope.weatherResult = $scope.weatherApi.get({q:$scope.city, units:"metric", cnt:$scope.days, appid:"9ae8e94d860bc77374ad10284cc91970"});

    $scope.convertToDate = function(dt){
      return new Date(dt * 1000)
    }
}]);
