'use strict';

let adminMarkers = ($http) => {
    let add = (data, user) => {
        return $http({
            method: "POST",
            url: '/markers',
            data: data,
            headers: {
                'Authorization': 'Basic ' + user.login + ':' + user.password
            }
        });
    };

    let deleteMarker = (data, markerId) => {
        return $http({
            method: 'DELETE',
            url: '/markers/' + markerId,
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    let editMarker = (data, markerId) => {
        return $http({
            method: 'PUT',
            url: '/markers/' + markerId,
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    return {
        add,
        deleteMarker,
        editMarker
    };
};

adminMarkers.$inject = [
    '$http'
];

angular.module('app').factory('adminMarkers', adminMarkers);