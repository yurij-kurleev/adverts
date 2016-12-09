'use strict';

let advertAddController = ($scope, $cookies, auth, $window, advert, ui, aside) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";
    if(!$scope.user && ~$window.location.href.indexOf("#/adverts/add")){
        $window.location.href = '#/adverts/1';
    }

    $scope.getAdvertCategory = ($event) => {
        $cookies.put('category', $event.target.text);
    };

    advert.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
        ui.scrollTo('scrollTo');
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    aside.getTags().success((response) => {
        $scope.tags = response;
        for(let i in $scope.tags){
            $scope.tags[i].url = encodeURIComponent($scope.tags[i].name);
        }
    })
    .error((response) => {
        console.log(response);
    });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };

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
            $scope.popsubcategories = response._embedded.subcategories;
        })
        .error(() => {
            console.log("Error: can't get subcategories");
        });
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = '#/adverts/1';
    };

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
    };

    $scope.sendForm = () => {
        $scope.formData.owner = {id: $scope.user.id};
        if($scope.formData.tags){
            let tmp = $scope.formData.tags.split('#');
            delete tmp[0];
            $scope.formData.tags = [];
            for(let i in tmp){
                $scope.formData.tags.push({name: tmp[i]});
            }
        }
        else $scope.formData.tags = [];
        $scope.formData.login = $scope.user.login;
        $scope.formData.password = $scope.user.password;
        advert.sendForm($scope.formData).success((response) => {
            $window.location.href = '#/adverts/1';
            ui.scrollTo('logo-link');
        })
        .error((response) => {
            $scope.error = "Unable to add advert";
            ui.toggleError('error');
            ui.scrollTo('error');
        });
    };

    $scope.searchAdvert = () => {
        $window.location.href = '#/adverts/search/' + $scope.formData.search + "/1";
    };
};

advertAddController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window',
    'advert',
    'ui',
    'aside'
];

angular.module('app').controller('advertAddController', advertAddController);
