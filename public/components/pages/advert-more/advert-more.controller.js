'use strict';

let advertMoreController = ($scope, $cookies, auth, ui, $routeParams) => {
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};
    $scope.id = $routeParams.id;
    console.log($scope.id);

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
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
    '$routeParams'
];

angular.module('app').controller('advertMoreController', advertMoreController);