'use strict';

let registerController = ($scope, register, $window, ui, $cookies) => {
    $scope.user = $cookies.getObject('user');
    if($scope.user){
        $window.location.href = '#/index';
    }
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
		register.sendForm($scope.formData).success((response) => {
            //$cookies.putObject('user', response);
            delete $scope.formData.file;
            $cookies.putObject('user', $scope.formData);
            $window.location.href = '#/index';
        })
        .error(() => {
            //
        });
	};
};
registerController.$inject = [
	'$scope',
	'register',
    '$window',
	'ui',
    '$cookies'
];

angular.module('app').controller('registerController', registerController);