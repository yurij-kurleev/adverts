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

    return {
        add
    };
};

adminMarkers.$inject = [
    '$http'
];

angular.module('app').factory('adminMarkers', adminMarkers);