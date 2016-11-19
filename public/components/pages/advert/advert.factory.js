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

    };

    let getCurrency = () => {

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