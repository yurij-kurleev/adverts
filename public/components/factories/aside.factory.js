'use strict';

let aside = ($http) => {
    let getCategories = () => {
        return $http({
            method: 'GET',
            url: '/categories'
        });
    };

    let getSubcategories = (categoryId) => {
        return $http({
            method: 'GET',
            url: '/categories/' + categoryId + '/subcategories'
        });
    };

    let getTags = () => {
        return $http({
            method: 'GET',
            url: ''
        });
    };

    let getAdvertsByCategory = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    let getAdvertsBySubcategory = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    let getAdvertsByTag = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    return {
        getCategories,
        getSubcategories,
        getTags,
        getAdvertsByCategory,
        getAdvertsBySubcategory,
        getAdvertsByTag
    };
};

aside.$inject = [
    '$http'
];

angular.module('app').factory('aside', aside);