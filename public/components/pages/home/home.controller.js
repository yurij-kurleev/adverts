'use strict';

let homeController = ($scope, $cookies, auth, ui, home, $routeParams, $window) => {
    $scope.currentPage = $routeParams.pageId;
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    home.getAdvertsByPage($scope.currentPage).success((response) => {
        $scope.adverts = response._embedded.adverts;
        let lastPage = getPageFromUrl(response._links.lastPage.href);
        $scope.next = lastPage > $scope.currentPage;
        $scope.prev = 1 < $scope.currentPage;
        $scope.cur = 1 != lastPage;
        if($scope.currentPage > lastPage){
            $window.location.href = "#/adverts/" + lastPage;
        }
        if($scope.currentPage < 1){
            $window.location.href = "#/adverts/1";
        }
    })
    .error((response) => {
        $scope.error = "No adverts found";
        console.log(response);
    });

    $scope.showError = () => {
        ui.scrollTo('error');
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
        });
    };

    $scope.unauthorize = () => {
        auth.unauthorize();
        delete $scope.user;
    };

    $scope.nextPage = () => {
        $scope.currentPage++;
        $window.location.href = "#/adverts/" + $scope.currentPage;
    };

    $scope.prevPage = () => {
        $scope.currentPage--;
        $window.location.href = "#/adverts/" + $scope.currentPage;
    };

    let getPageFromUrl = (url) => {
        let entry = url.match(/page=\d+/)[0];
        if(entry){
            return entry.split('=')[1];
        }
    };
};
homeController.$inject = [
    '$scope',
    '$cookies',
    'auth',
    'ui',
    'home',
    '$routeParams',
    '$window'
];

angular.module('app').controller('homeController', homeController);