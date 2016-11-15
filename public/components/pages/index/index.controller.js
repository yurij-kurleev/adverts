'use strict';

let indexController = ($scope, $cookies, auth) => {
    $scope.user = $cookies.getObject('user');
    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };
};
indexController.$inject = [
    '$scope',
    '$cookies',
    'auth'
];

angular.module('app').controller('indexController', indexController);