'use strict';

let adminMarkersController = ($scope, $cookies, advert, adminMarkers, ui) => {
    $scope.user = $cookies.getObject('user');

    if(!$scope.user.admin){
        $window.location.href = '#/adverts/1';
    }

    advert.getMarkers().success((response) => {
        $scope.markers = response._embedded.markers;
    })
        .error(() => {
            console.log("Can't get markers");
        });

    $scope.sendForm = () => {
        adminMarkers.add($scope.formData, $scope.user).success((response) => {
            $scope.markers.push({id: response.id, name: response.name});
        })
        .error((response) => {
            $scope.error = "Unable to add advert";
            console.log(response);
        });
    }
};

adminMarkersController.$inject = [
    '$scope',
    '$cookies',
    'advert',
    'adminMarkers',
    'ui'
];

angular.module('app').controller('adminMarkersController', adminMarkersController);