'use strict';

let advertSubcategoryController = ($scope, $cookies, auth, ui, advertSubcategory, $routeParams, $window, aside, $route) => {
    $scope.currentPage = $routeParams.pageId;
    $scope.categoryId = $routeParams.categoryId;
    $scope.subcategoryId = $routeParams.subcategoryId;
    $scope.blockTitle = $cookies.get('category');
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    aside.getAdvertsBySubcategory($scope.currentPage, $scope.subcategoryId).success((response) => {
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

    aside.getSubcategories($scope.categoryId).success((response) => {
        $scope.subcategories = response._embedded.subcategories;
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
        $window.location.href = "#/adverts/" + $scope.categoryId + "/subcategories/" + $scope.subcategoryId + "/" + $scope.currentPage;
    };

    $scope.prevPage = () => {
        $scope.currentPage--;
        $window.location.href = "#/adverts/" + $scope.categoryId + "/subcategories/" + $scope.subcategoryId + "/" + $scope.currentPage;
    };

    $scope.toggleModal = (advertId = null) => {
        ui.toggleDeleteModal();
        $scope.advertId = advertId;
    };

    $scope.deleteAdvert = () => {
        advertSubcategory.deleteAdvert($scope.user, $scope.advertId).success((response) => {
            $route.reload();
            $scope.toggleModal();
        })
            .error((response) => {
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
        }, 0);
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

advertSubcategoryController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    'advertSubcategory',
    '$routeParams',
    '$window',
    'aside',
    '$route'
];

angular.module('app').controller('advertSubcategoryController', advertSubcategoryController);