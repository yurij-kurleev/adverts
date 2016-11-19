'use strict';

let userController = ($scope, $cookies) => {
    $scope.user = $cookies.getObject('user');
    $scope.authorize = () => {
        $scope.user = auth.authorize($scope.formData);
        ui.toggleAuthDialog();
    };
    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };
};

userController.$inject = [
    '$scope',
    '$cookies'
];

angular.module('app').controller('userController', userController);