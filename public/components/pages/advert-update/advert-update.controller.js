'use strict';

let advertUpdateController = ($scope, $routeParams, $window, advertUpdate, auth, ui, advert, $cookies, aside) => {
    $scope.user = $cookies.getObject('user');
    $scope.blockTitle = "Категории";

    advertUpdate.getAdvert($routeParams.id).success((response)=>{
        ui.scrollTo('scrollTo');
        $scope.advert = response;
        if($scope.user.admin || $scope.user.id == $scope.advert.owner.id){
            $scope.advert.addTime = $scope.advert.addTime.replace(/T/, " ");
            let tags = "";
            for(let i in $scope.advert.tags){
                tags += "#" + $scope.advert.tags[i].name;
            }
            $scope.advert.tags = tags;
            delete $scope.advert.addTime;
        } else{
            $window.location.href = "#/adverts/1";
        }
    })
    .error((response) => {
        console.log(response);
        $window.location.href = "#/adverts/1";
        $scope.error = "Данный пост сейчас недоступен!";
    });

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
    .error(() => {
        console.log("Error: can't get categories");
    });

    $scope.getAdvertCategory = ($event) => {
        $cookies.put('category', $event.target.text);
    };

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

    $scope.searchAdvert = () => {
        $window.location.href = '#/adverts/search/' + $scope.formData.search + "/1";
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
    '$cookies',
    'aside'
];

angular.module('app').controller('advertUpdateController', advertUpdateController);