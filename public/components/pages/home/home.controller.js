'use strict';

let homeController = ($scope, $cookies, auth, ui) => {
    $scope.user = $cookies.getObject('user');
    $scope.toggleAuthDialog = ui.toggleAuthDialog;
    $scope.formData = {};
    $scope.authorize = () => {
        $scope.user = auth.authorize($scope.formData);
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