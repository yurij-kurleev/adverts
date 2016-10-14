'use strict';

let productsController = ($scope, $http, $location, ui) => {
	// include ui in scope to get access from template
	$scope.ui = ui;

	$scope.getProducts = () => {
		$http({
			method: 'GET',
			url: '/products'
		})
		.success((response) => {
			$scope.products = response;
		});
	}
	$scope.getProducts();
}
productsController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('productsController', productsController);