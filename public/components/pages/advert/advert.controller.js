'use strict';

let advertController = ($scope, $cookies, auth, $window, advert) => {
    $scope.user = $cookies.getObject('user');
    if(!$scope.user){
        $window.location.href = '#/home';
    }
    advert.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    advert.getCurrency().success((response) => {
        $scope.currencies = response._embedded.currencies;
    })
    .error(() => {
        console.log("Can't get currencies");
    });

    advert.getMarks().success((response) => {
        $scope.marks = response._embedded.marks;
    })
    .error(() => {
        console.log("Can't get marks");
    });

    $scope.getSubcategories = () => {
        advert.getSubcategories($scope.selected).success((response) => {
            $scope.subcategories = response._embedded.subcategories;
        })
        .error(() => {
            console.log("Error: can't get subcategories");
        });
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = '#/home';
    };
};

advertController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window',
    'advert'
];

angular.module('app').controller('advertController', advertController);
