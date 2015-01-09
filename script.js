'use strict';

var app=angular.module('app', ['ngSanitize']);

app.controller('context', function($scope, $http){
	$http.get('./csvs/article-titles.json').
		success(function(data, status, headers, config){
			$scope.titles = data;
		}).
		error(function(data, status, headers, config) {
		      console.log(error)
		});
	$http.get('./csvs/data-with-script.json').
		 success(function(data, status, headers, config) {
		      $scope.documents = data;
		    }).
		    error(function(data, status, headers, config) {
		      console.log(error)
		    });
});