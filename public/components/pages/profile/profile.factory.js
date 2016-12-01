"use strict";

let profile = ($http) => {
    let getUserPosts = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    return {
        getUserPosts
    };
};

profile.$inject = [
    '$http'
];

angular.module('app').factory('profile', profile);