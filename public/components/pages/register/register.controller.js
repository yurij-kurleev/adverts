'use strict';

let registerController = ($scope, register, $window, ui) => {
	register.getCountries().success((response) => {
		$scope.countries = response;
	})
	.error(() => {
		console.log('Error: cannot get countries');
	});

    $scope.getRegions = () => {
        register.getRegions($scope.selected).success((response) => {
            $scope.regions = response;
        })
        .error(() => {
			$scope.error = "Can't get regions!";
			ui.toggleError('error-msg');
		});
    };

	$scope.formData = {};
	$scope.sendForm = () => {
		register.sendForm($scope.formData);
        $window.location.href = '#/index';
	};
};
registerController.$inject = [
	'$scope',
	'register',
    '$window',
	'ui'
];

angular.module('app').controller('registerController', registerController);