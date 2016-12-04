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
            url: '/adverts/randomTags?amount=10'
        });
    };

    let getAdvertsByCategory = (url) => {
        return $http({
            method: 'GET',
            url: url
        });
    };

    let getAdvertsBySubcategory = (page, subcategoryId, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit + '&subcategoryId=' + subcategoryId
        });
    };

    let getAdvertsByTag = (page, tagName, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit + '&tagName=' + tagName
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