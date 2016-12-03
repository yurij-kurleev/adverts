'use strict';

let advertCategoryController = ($scope, $cookies, auth, ui, advertCategory, $routeParams, $window, aside) => {
    $scope.currentPage = $routeParams.pageId;
    $scope.categoryId = $routeParams.categoryId;
    $scope.blockTitle = $cookies.get('category');
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    advertCategory.getAdvertsByCategory($scope.currentPage, $scope.categoryId).success((response) => {
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
        $scope.categories = response._embedded.subcategories;
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
        $window.location.href = "#/adverts/categories/" + $scope.categoryId + "/" + $scope.currentPage;
    };

    $scope.prevPage = () => {
        $scope.currentPage--;
        $window.location.href = "#/adverts/categories/" + $scope.categoryId + "/" + $scope.currentPage;
    };

    let getPageFromUrl = (url) => {
        let entry = url.match(/page=\d+/)[0];
        if(entry){
            return entry.split('=')[1];
        }
    };
};

advertCategoryController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    'advertCategory',
    '$routeParams',
    '$window',
    'aside'
];

angular.module('app').controller('advertCategoryController', advertCategoryController);