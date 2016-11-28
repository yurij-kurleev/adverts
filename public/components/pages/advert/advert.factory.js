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

    let sendForm = (data) => {
        data.image = window.fileBase64Data;
        return $http({
            method: 'POST',
            url: '/adverts',
            data: data
        });
    };

    return {
        getCategories,
        getSubcategories,
        getMarkers,
        getCurrency,
        sendForm
    }
};

advert.$inject = [
    '$http'
];

angular.module('app').factory('advert', advert);