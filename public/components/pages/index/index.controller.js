'use strict';

let indexController = ($scope, $cookies) => {
    $scope.user = $cookies.getObject('user');
};
indexController.$inject = [
    '$scope',
    '$cookies'
];

angular.module('app').controller('indexController', indexController);