'use strict';

let registerController = ($scope, register, $window, ui, $cookies, auth) => {
    $scope.user = $cookies.getObject('user');
    if($scope.user){
        $window.location.href = '#/home';
    }
	register.getCountries().success((response) => {
		$scope.countries = response._embedded.countries;
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
		    let user = response;
            user.login = $scope.formData.login;
            user.password = $scope.formData.password;
            $cookies.putObject('user', user);
            $window.location.href = '#/home';
        })
        .error((response) => {
            $scope.error = "Unable to register";
            ui.toggleError('error');
            ui.scrollTo('error');
        });
	};
    $scope.authorize = () => {
        $scope.user = auth.authorize($scope.formData).success((response)=>{
            $scope.user = response;
            $scope.user.login = data.login;
            $scope.user.password = data.password;
            $cookies.putObject('user', response);
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            ui.toggleAuthDialog();
            $window.location.href = '#/home';
        })
        .error((response) => {
            console.log(response);
            $scope.error = "Unable to authorize";
            ui.toggleError('error');
            ui.scrollTo('error');
        });
        ui.toggleAuthDialog();
        $window.location.href = '#/home';
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