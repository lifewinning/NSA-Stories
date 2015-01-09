'use strict';

var app=angular.module('app', ['ngSanitize']);

app.controller('context', function($scope, $http){
	$http.get('./csvs/data-with-script.json').
		 success(function(data, status, headers, config) {
		      $scope.documents = data;
		    }).
		    error(function(data, status, headers, config) {
		      console.log('what have you done my god you fool')
		    });
});