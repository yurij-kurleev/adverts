'use strict';

let profileController = ($scope, $cookies, auth, $window) => {
    $scope.user = $cookies.getObject('user');

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = '#/home';
    };
};

profileController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window'
];

angular.module('app').controller('profileController', profileController);