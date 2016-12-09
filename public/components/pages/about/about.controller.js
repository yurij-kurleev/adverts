'use strict';

let aboutController = ($scope, $cookies, aside, ui, auth, $window) => {
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};
    $scope.blockTitle = "Категории";

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
        .error(() => {
            console.log("Error: can't get categories");
        });

    $scope.toggleAuthDialog = ui.toggleAuthDialog;

    $scope.authorize = () => {
        auth.authorize($scope.formData).success((response)=>{
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
            ui.toggleAuthDialog();
        })
            .error((response) => {
                console.log(response);
                $scope.error = "Неверный логин или пароль!";
                $scope.showError();
                $scope.toggleAuthDialog();
            });
    };

    aside.getTags().success((response) => {
        $scope.tags = response;
        for(let i in $scope.tags){
            $scope.tags[i].url = encodeURIComponent($scope.tags[i].name);
        }
        setTimeout(() => {
            for(let i in $scope.tags){
                ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
            }
        }, 0);

    })
        .error((response) => {
            console.log(response);
        });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };

    $scope.searchAdvert = () => {
        $window.location.href = '#/adverts/search/' + $scope.formData.search + "/1";
    };
};

aboutController.$inject = [
    '$scope',
    '$cookies',
    'aside',
    'ui',
    'auth',
    '$window'
];

angular.module('app').controller('aboutController', aboutController);