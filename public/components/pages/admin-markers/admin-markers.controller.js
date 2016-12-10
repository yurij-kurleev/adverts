'use strict';

let adminMarkersController = ($scope, $cookies, advert, adminMarkers, ui, $window) => {
    $scope.user = $cookies.getObject('user');

    if(!$scope.user || !$scope.user.admin){
        $window.location.href = '#/adverts/1';
    }

    advert.getMarkers().success((response) => {
        $scope.markers = response._embedded.markers;
        for(let i in $scope.markers){
            $scope.markers[i].show = false;
        }
    })
        .error(() => {
            console.log("Can't get markers");
        });

    $scope.sendForm = () => {
        adminMarkers.add($scope.formData, $scope.user).success((response) => {
            $scope.markers.push({id: response.id, name: response.name});
        })
        .error((response) => {
            if(response.status == 400){
                $scope.error = "Данная метка уже существует";
                ui.toggleError('error');
                ui.scrollTo('error');
            }
        });
    };

    $scope.toggleModal = (markerId = null) => {
        ui.toggleDeleteModal();
        $scope.markerId = markerId;
    };

    $scope.toggleEdit = (markerId = null) => {
        for(let i in $scope.markers){
            if($scope.markers[i].id == markerId){
                $scope.markers[i].show = !$scope.markers[i].show;
            } else{
                $scope.markers[i].show = false;
            }
        }
        $scope.markerId = markerId;
    };

    $scope.deleteAdvert = () => {
        adminMarkers.deleteMarker($scope.user, $scope.markerId).success((response) => {
            for(let i in $scope.markers){
                if($scope.markers.id == $scope.markerId){
                    delete $scope.markers[i];
                    break;
                }
            }
            $scope.toggleModal();
        })
        .error((response) => {
            if(response.status == 403) {
                $scope.error = "Данная метка уже существует";
                ui.toggleError('error');
                ui.scrollTo('error');
            }
        });
    };

    $scope.editAdvert = () => {
        adminMarkers.editMarker($scope.user, $scope.markerId).success((response) => {
            $scope.markers.push({id: response.id, name: response.name, show: false});
            $scope.toggleModal();
        })
            .error((response) => {
                if(response.status == 403) {
                    $scope.error = "Данная метка уже существует";
                    ui.toggleError('error');
                    ui.scrollTo('error');
                }
            });
    };
};

adminMarkersController.$inject = [
    '$scope',
    '$cookies',
    'advert',
    'adminMarkers',
    'ui',
    '$window'
];

angular.module('app').controller('adminMarkersController', adminMarkersController);