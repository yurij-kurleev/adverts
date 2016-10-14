'use strict';

let registerController = ($scope, $http, $location, registerFactory, file) => {
	registerFactory.countriesPromise.success((response) => {
		$scope.countries = response;
	})
	.error(() => {
		console.log('Error: cannot get countries');
	});

	$scope.fileBinaryData = "";

	$scope.getFileBinaryData = (inputFileId) => {
		$scope.fileBinaryData = file.convertFileToBinary(inputFileId);
		console.log('file binary data is:');
		console.log($scope.fileBinaryData);
	}
}
registerController.$inject = [
	'$scope',
	'$http',
	'$location',
	'registerFactory',
	'file'
];

angular.module('app').controller('registerController', registerController);