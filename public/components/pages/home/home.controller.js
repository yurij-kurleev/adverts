'use strict';

let homeController = ($scope, $cookies, auth, ui) => {
    $scope.user = $cookies.getObject('user');
    $scope.toggleAuthDialog = ui.toggleAuthDialog;
    $scope.formData = {};
    $scope.authorize = () => {
        auth.authorize($scope.formData).success((response)=>{
            $scope.user = response;
            $scope.user.login = $scope.formData.login;
            $scope.user.password = $scope.formData.password;
            console.log($scope.user);
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
        });
    };
    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };
};
homeController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui'
];

angular.module('app').controller('homeController', homeController);