'use strict';

let adminStatisticsController = ($scope, $cookies, advertStatistics, $window) => {
    $scope.user = $cookies.getObject('user');

    if(!$scope.user || !$scope.user.admin){
        $window.location.href = '#/adverts/1';
    }

    advertStatistics.getTopTags($scope.user).success((response) => {
        $scope.tags = response;
    })
        .error(() => {
            console.log("Can't get tags");
        });

    advertStatistics.getTopSubcategories($scope.user).success((response) => {
        $scope.subcategories = response._embedded.subcategories;
    })
        .error(() => {
            console.log("Can't get subcategories");
        });
};

adminStatisticsController.$inject = [
    '$scope',
    '$cookies',
    'advertStatistics',
    '$window'
];

angular.module('app').controller('adminStatisticsController', adminStatisticsController);