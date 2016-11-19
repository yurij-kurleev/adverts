'use strict';

let advert = ($http) => {
    let getCategories = () => {
        return $http({
            method: 'GET',
            url: '/categories'
        });
    };

    let getSubcategories = (id) => {
        return $http({
            method: 'GET',
            url: '/categories/' + id + '/subcategories'
        });
    };

    let getMarkers = () => {
        return $http({
            method: 'GET',
            url: '/markers'
        });
    };

    let getCurrency = () => {
        return $http({
            method: 'GET',
            url: '/currencies'
        });
    };

    return {
        getCategories,
        getSubcategories,
        getMarkers,
        getCurrency
    }
};

advert.$inject = [
    '$http'
];

angular.module('app').factory('advert', advert);