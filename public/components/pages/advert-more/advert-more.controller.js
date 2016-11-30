'use strict';

let advertMoreController = ($scope, $cookies, auth, ui, $routeParams, $window, advertMore) => {
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    advertMore.getAdvert($routeParams.id).success((response)=>{
        $scope.advert = response;
        if($scope.user == $scope.advert.owner.id || !$scope.user){
            return;
        } else {
            advertMore.addView($scope.advert._links.incrementViews.href);
        }
    })
    .error((response) => {
        console.log(response);
        $window.location.href = "#/adverts/1";
        $scope.error = "Данный пост сейчас недоступен!";
    });

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
    };

    $scope.showError = () => {
        ui.scrollTo('error');
        ui.toggleError('error');
    };

    $scope.toggleAuthDialog = ui.toggleAuthDialog;

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };

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
            $scope.toggleAuthDialog();
        })
            .error((response) => {
                console.log(response);
            });
    };
};

advertMoreController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    '$routeParams',
    '$window',
    'advertMore'
];

angular.module('app').controller('advertMoreController', advertMoreController);