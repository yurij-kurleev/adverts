'use strict';

let profileEditController = ($scope, $window, $cookies, auth, ui, profileEdit, aside) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";
    if(!$scope.user){
        $window.location.href = '#/adverts/1';
    }
    profileEdit.getCountries().success((response) => {
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
        profileEdit.getRegions($scope.selected).success((response) => {
            $scope.regions = response._embedded.regions;
        })
        .error(() => {
            console.log('Error: cannot get countries');
        });
    };

    $scope.authData = {
        login: $scope.user.login,
        password: $scope.user.password
    };
    $scope.sendForm = () => {
        profileEdit.sendForm($scope.user, $scope.user._links.self.href).success((response) => {
            $scope.user = response;
            $scope.user.login = $scope.authData.login;
            $scope.user.password = $scope.authData.password;
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            $cookies.putObject('user', $scope.user);
            $window.location.href = '#/profile';
            ui.scrollTo('logo-link');
        })
        .error((response) => {
            $scope.error = "Unable to edit data";
            ui.toggleError('error');
            ui.scrollTo('error');
            console.log(response);
        });
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = "#/adverts/1";
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

profileEditController.$inject = [
    '$scope',
    '$window',
    '$cookies',
    'auth',
    'ui',
    'profileEdit',
    'aside'
];

angular.module('app').controller('profileEditController', profileEditController);