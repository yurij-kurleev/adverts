'use strict';

let home = ($http) => {
    let getAdvertsByPage = (page, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit
            //url: '/adverts/page/1'
        });
    };

    return {
        getAdvertsByPage
    };
};

home.$inject = [
    '$http'
];
angular.module('app').factory('home', home);