'use strict';

let profileEdit = ($http) => {
    let getCountries = () => {
        return $http({
            method: 'GET',
            url: '/geolocation/countries'
        });
    };

    let getRegions = (id) => {
        return $http({
            method: 'GET',
            url: '/geolocation/countries/' + id + '/regions'
        });
    };

    let sendForm = (data, url) => {
        return $http({
            method: 'PUT',
            url: url,
            data: data,
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    return {
        getCountries,
        getRegions,
        sendForm
    }
};

profileEdit.$inject = ['$http'];

angular.module('app').factory('profileEdit', profileEdit);