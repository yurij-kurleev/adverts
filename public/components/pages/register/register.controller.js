'use strict';

let registerController = ($scope, register, $window, ui, $cookies, auth, aside) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";
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

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    $scope.getAdvertCategory = ($event) => {
        $cookies.put('category', $event.target.text);
    };

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
            $scope.error = "Неверный логин или пароль!";
            ui.showError();
            $scope.toggleAuthDialog();
        });
        ui.toggleAuthDialog();
    };

    aside.getTags().success((response) => {
        $scope.tags = response;
    })
        .error((response) => {
            console.log(response);
        });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };
};
registerController.$inject = [
	'$scope',
	'register',
    '$window',
	'ui',
    '$cookies',
    'auth',
    'aside'
];

angular.module('app').controller('registerController', registerController);