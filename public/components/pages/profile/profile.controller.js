'use strict';

let profileController = ($scope, $cookies, auth) => {
    $scope.user = $cookies.getObject('user');
    $scope.authorize = () => {
        auth.authorize($scope.formData);
        $scope.user = $cookies.getObject('user');
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

profileController.$inject = [
    '$scope',
    '$cookies',
    'auth'
];

angular.module('app').controller('profileController', profileController);