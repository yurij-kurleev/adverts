'use strict';

let registerController = ($scope, $http, $location, register) => {
	register.getCountries().success((response) => {
		$scope.countries = response;
	})
	.error(() => {
		console.log('Error: cannot get countries');
	});

	$scope.formData = {};
	$scope.sendForm = register.sendForm;
}
registerController.$inject = [
	'$scope',
	'$http',
	'$location',
	'register'
];

angular.module('app').controller('registerController', registerController);