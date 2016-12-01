'use strict';

let profileController = ($scope, $cookies, auth, $window, profile) => {
    $scope.user = $cookies.getObject('user');
    if(!$scope.user && ~$window.location.href.indexOf("#/profile")){
        $window.location.href = '#/adverts/1';
    }

    profile.getUserPosts($scope.user._links.adverts.href).success((response) => {
        $scope.adverts = response._embedded.adverts;
    })
    .error((response) => {
        $scope.adverts = [];
        console.log(response);
    });

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = '#/adverts/1';
    };
};

profileController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window',
    'profile'
];

angular.module('app').controller('profileController', profileController);