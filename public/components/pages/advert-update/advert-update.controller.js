'use strict';

let advertUpdateController = ($scope, $routeParams, $window, advertUpdate, auth, ui, advert, $cookies) => {
    $scope.user = $cookies.getObject('user');
    if(!$scope.user && ~$window.location.href.indexOf("#/adverts/edit/")){//~ = n + 1
        $window.location.href = '#/adverts/1';
    }

    advertUpdate.getAdvert($routeParams.id).success((response)=>{
        ui.scrollTo('scrollTo');
        $scope.advert = response;
        if($scope.user.id != $scope.advert.owner.id){
            $window.location.href = "#/adverts/1";
        }
        $scope.advert.addTime = $scope.advert.addTime.replace(/T/, " ");
        let tags = "";
        for(let i in $scope.advert.tags){
            tags += "#" + $scope.advert.tags[i].name;
        }
        $scope.advert.tags = tags;
        delete $scope.advert.addTime;
    })
    .error((response) => {
        console.log(response);
        $window.location.href = "#/adverts/1";
        $scope.error = "Данный пост сейчас недоступен!";
    });

    $scope.scrollTo = () => {
        ui.scrollTo('logo-link', 500);
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
        $window.location.href = "#/adverts/1";
    };

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

    $scope.sendForm = () => {
        $scope.advert.owner = {id: $scope.user.id};
        if($scope.advert.tags){
            let tmp = $scope.advert.tags.split('#');
            delete tmp[0];
            $scope.advert.tags = [];
            for(let i in tmp){
                $scope.advert.tags.push({name: tmp[i]});
            }
        }
        else $scope.advert.tags = [];
        $scope.advert.login = $scope.user.login;
        $scope.advert.password = $scope.user.password;
        advertUpdate.sendForm($scope.advert, $scope.advert.id).success((response) => {
            $window.location.href = '#/adverts/1';
            ui.scrollTo('logo-link');
        })
            .error((response) => {
                $scope.error = "Unable to edit advert";
                ui.toggleError('error');
                ui.scrollTo('error');
            });
    };
};

advertUpdateController.$inject = [
    '$scope',
    '$routeParams',
    '$window',
    'advertUpdate',
    'auth',
    'ui',
    'advert',
    '$cookies'
];

angular.module('app').controller('advertUpdateController', advertUpdateController);