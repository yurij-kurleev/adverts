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

    let getMarks = () => {
        return $http({
            method: 'GET',
            url: '/marks'
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
        getMarks,
        getCurrency
    }
};

advert.$inject = [
    '$http'
];

angular.module('app').factory('advert', advert);