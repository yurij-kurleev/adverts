"use strict";

let profile = ($http) => {
    let getUserPosts = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    let deleteAdvert = (data, advertId) => {
        return $http({
            method: 'DELETE',
            url: '/adverts/' + advertId,
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    return {
        getUserPosts,
        deleteAdvert
    };
};

profile.$inject = [
    '$http'
];

angular.module('app').factory('profile', profile);