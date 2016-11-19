'use strict';

let profileController = ($scope, $cookies, auth) => {
    $scope.user = $cookies.getObject('user');

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