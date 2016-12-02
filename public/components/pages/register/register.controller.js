'use strict';

let registerController = ($scope, register, $window, ui, $cookies, auth) => {
    $scope.user = $cookies.getObject('user');
    if($scope.user){
        $window.location.href = '#/home';
    }
	register.getCountries().success((response) => {
		$scope.countries = response._embedded.countries;
        ui.scrollTo('scrollTo');
	})
	.error(() => {
		console.log('Error: cannot get countries');
	});

    $scope.getRegions = () => {
        register.getRegions($scope.selected).success((response) => {
            $scope.regions = response._embedded.regions;
        })
        .error(() => {
            console.log('Error: cannot get countries');
		});
    };

	$scope.formData = {};
	$scope.sendForm = () => {
		register.sendForm($scope.formData).success((response) => {
		    $scope.user = response;
            $scope.user.login = $scope.formData.login;
            $scope.user.password = $scope.formData.password;
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            $cookies.putObject('user', $scope.user);
            $window.location.href = '#/home';
            ui.scrollTo('logo-link');
        })
        .error((response) => {
            $scope.error = "Unable to register";
            ui.toggleError('error');
            ui.scrollTo('error');
            console.log(response);
        });
	};
    $scope.toggleAuthDialog = ui.toggleAuthDialog;
    $scope.authorize = () => {
        $scope.user = auth.authorize($scope.formData).success((response)=>{
            $scope.user = response;
            $scope.user.login = $scope.formData.login;
            $scope.user.password = $scope.formData.password;
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            $cookies.putObject('user', response);
            $window.location.href = '#/home';
        })
        .error((response) => {
            console.log(response);
            $scope.error = "Unable to authorize";
            ui.toggleError('error');
            ui.scrollTo('error');
        });
        ui.toggleAuthDialog();
    };
};
registerController.$inject = [
	'$scope',
	'register',
    '$window',
	'ui',
    '$cookies',
    'auth'
];

angular.module('app').controller('registerController', registerController);