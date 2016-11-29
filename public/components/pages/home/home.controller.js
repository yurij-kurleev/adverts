'use strict';

let homeController = ($scope, $cookies, auth, ui, home) => {
    $scope.currentPage = document.getElementById('cur').nodeValue;
    $scope.user = $cookies.getObject('user');
    $scope.formData = {};

    home.getAdvertsByPage($scope.currentPage).success((response) => {
        $scope.adverts = response._embedded.adverts;
        let lastPage = getPageFromUrl(response._links.lastPage.href);
        $scope.prev = lastPage > $scope.currentPage;
        $scope.next = 1 < $scope.currentPage;
        $scope.cur = 1 == lastPage;
    })
    .error(() => {

    });

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

    let getPageFromUrl = (url) => {
        let entry = url.match(/page=\d+/);
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
    'home'
];

angular.module('app').controller('homeController', homeController);