'use strict';

let profileController = ($scope, $cookies, auth, $window, profile, aside, ui) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";
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

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = '#/adverts/1';
    };

    $scope.getAdvertCategory = ($event) => {
        $cookies.put('category', $event.target.text);
    };

    $scope.toggleModal = (advertId = null) => {
        ui.toggleDeleteModal();
        $scope.advertId = advertId;
    };

    $scope.deleteAdvert = () => {
        profile.deleteAdvert($scope.user, $scope.advertId).success((response) => {
            $window.location.href = "#/profile";
        })
            .error((response) => {
                console.log(response);
                $window.location.href = "#/profile";
            });
        $scope.toggleModal();
    };

    aside.getTags().success((response) => {
        $scope.tags = response;
    })
        .error((response) => {
            console.log(response);
        });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };
};

profileController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    '$window',
    'profile',
    'aside',
    'ui'
];

angular.module('app').controller('profileController', profileController);