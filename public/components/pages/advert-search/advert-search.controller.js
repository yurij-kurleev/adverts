'use strict';

let advertSearchController = ($scope, $cookies, auth, ui, advertSearch, $routeParams, $window, aside) => {
    $scope.currentPage = $routeParams.pageId;
    $scope.title = $routeParams.title;
    $scope.blockTitle = "Категории";
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    aside.getAdvertsByTitle($scope.currentPage, $scope.title).success((response) => {
        $scope.adverts = response._embedded.adverts;
        for(let i = 0; i < $scope.adverts.length; i++){
            $scope.adverts[i].addTime = $scope.adverts[i].addTime.replace(/T/, " ");
            $scope.adverts[i].description = $scope.adverts[i].description.substr(0, 200);
        }
        let lastPage = getPageFromUrl(response._links.lastPage.href);
        $scope.next = lastPage > $scope.currentPage;
        $scope.prev = 1 < $scope.currentPage;
        $scope.cur = 1 != lastPage;
    })
        .error((response) => {
            $scope.error = "No adverts found";
            console.log(response);
        });

    aside.getCategories().success((response) => {
        $scope.categories = response._embedded.categories;
    })
        .error(() => {
            console.log("Error: can't get subcategories");
        });

    $scope.showError = () => {
        ui.toggleError('error');
    };

    $scope.toggleAuthDialog = ui.toggleAuthDialog;

    $scope.authorize = () => {
        auth.authorize($scope.formData).success((response)=>{
            $scope.user = response;
            $scope.user.login = $scope.formData.login;
            $scope.user.password = $scope.formData.password;
            if($scope.user.admin){
                $scope.user.role = "Администраторы";
            } else {
                $scope.user.role = "Пользователи";
            }
            $scope.user.registrationDate = $scope.user.registrationDate.split("T");
            $cookies.putObject('user', $scope.user);
            ui.toggleAuthDialog();
        })
            .error((response) => {
                console.log(response);
                $scope.error = "Неверный логин или пароль!";
                $scope.showError();
                $scope.toggleAuthDialog();
            });
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };

    $scope.nextPage = () => {
        $scope.currentPage++;
        $window.location.href = "#/adverts/search/" + $scope.title + "/" + $scope.currentPage;
    };

    $scope.prevPage = () => {
        $scope.currentPage--;
        $window.location.href = "#/adverts/search/" + $scope.title + "/" + $scope.currentPage;
    };

    $scope.toggleModal = (advertId = null) => {
        ui.toggleDeleteModal();
        $scope.advertId = advertId;
    };

    $scope.deleteAdvert = () => {
        advertSearch.deleteAdvert($scope.user, $scope.advertId).success((response) => {
            $window.location.href = "#/adverts/search/" + $scope.title + "/" + $scope.currentPage;
            $scope.toggleModal();
        }).error((response) => {
            console.log(response);
        });
    };

    aside.getTags().success((response) => {
        $scope.tags = response;
        for(let i in $scope.tags){
            $scope.tags[i].url = encodeURIComponent($scope.tags[i].name);
        }
        setTimeout(() => {
            for(let i in $scope.tags){
                ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
            }
        }, 500);
    })
        .error((response) => {
            console.log(response);
        });

    $scope.setTagSize = () => {
        for(let i in $scope.tags){
            ui.setTagSize($scope.tags[i].id, $scope.tags[i].advertsAmount);
        }
    };

    $scope.searchAdvert = () => {
        $window.location.href = '#/adverts/search/' + $scope.formData.search + "/1";
    };

    let getPageFromUrl = (url) => {
        let entry = url.match(/page=\d+/)[0];
        if(entry){
            return entry.split('=')[1];
        }
    };
};

advertSearchController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    'advertSearch',
    '$routeParams',
    '$window',
    'aside'
];

angular.module('app').controller('advertSearchController', advertSearchController);