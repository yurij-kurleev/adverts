'use strict';

let home = ($http) => {
    let getAdvertsByPage = (page, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit
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
        getAdvertsByPage,
        deleteAdvert
    };
};

home.$inject = [
    '$http'
];
angular.module('app').factory('home', home);