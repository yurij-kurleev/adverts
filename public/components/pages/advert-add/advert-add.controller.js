'use strict';

let advertAddController = ($scope, $cookies, auth, $window, advert, ui) => {
    $scope.user = $cookies.getObject('user');
    if(!$scope.user && ~$window.location.href.indexOf("#/adverts/add")){
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

    advert.getMarkers().success((response) => {
        $scope.markers = response._embedded.markers;
    })
    .error(() => {
        console.log("Can't get markers");
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

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
    };

    $scope.sendForm = () => {
        $scope.formData.owner = {id: $scope.user.id};
        if($scope.formData.tags){
            let tmp = $scope.formData.tags.split('#');
            delete tmp[0];
            for(let i = 0; i < tmp.length; i++){
                $scope.formData.tags.push({name: tmp[i]});
            }
        }
        else $scope.formData.tags = [];
        $scope.formData.login = $scope.user.login;
        $scope.formData.password = $scope.user.password;
        advert.sendForm($scope.formData).success((response) => {
            $window.location.href = '#/home';
            ui.scrollTo('logo-link');
        })
        .error((response) => {
            $scope.error = "Unable to add advert-add";
            ui.toggleError('error');
            ui.scrollTo('error');
        });
    };
};

advertAddController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window',
    'advert',
    'ui'
];

angular.module('app').controller('advertAddController', advertAddController);
