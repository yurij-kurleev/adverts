'use strict';

let homeController = ($scope, $cookies, auth, ui) => {
    $scope.user = $cookies.getObject('user');
    $scope.toggleAuthDialog = ui.toggleAuthDialog;
    $scope.formData = {};
    $scope.authorize = () => {
        auth.authorize($scope.formData).success((response)=>{
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