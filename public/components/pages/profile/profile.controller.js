'use strict';

let profileController = ($scope, $cookies, auth, $window, profile) => {
    $scope.user = $cookies.getObject('user');
    if(!$scope.user && ~$window.location.href.indexOf("#/profile")){
        $window.location.href = '#/adverts/1';
    }

    profile.getUserPosts($scope.user._links.adverts.href).success((response) => {
        $scope.adverts = response._embedded.adverts;
        for(let i = 0; i < $scope.adverts.length; i++){
            $scope.adverts[i].addTime = $scope.adverts[i].addTime.replace(/T/, " ");
            $scope.adverts[i].description = $scope.adverts[i].description.substr(0, 200);
        }
    })
    .error((response) => {
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