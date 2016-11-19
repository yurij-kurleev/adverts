'use strict';

let homeController = ($scope, $cookies, auth, ui) => {
    $scope.user = $cookies.getObject('user');
    $scope.toggleAuthDialog = ui.toggleAuthDialog;
    $scope.formData = {};
    $scope.authorize = () => {
        $scope.user = auth.authorize($scope.formData);
        if($scope.user.admin){
            $scope.user.role = "Администраторы";
        } else {
            $scope.user.role = "Пользователи";
        }
        $scope.user.registrationDate = $scope.user.registrationDate.split("T");
        ui.toggleAuthDialog();
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