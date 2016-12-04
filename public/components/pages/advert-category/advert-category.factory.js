'use strict';

let advertCategory = ($http) => {
    let getAdvertsByCategory = (page, categoryId, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit + '&categoryId=' + categoryId
            //url: '/adverts/page/1'
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
        getAdvertsByCategory,
        deleteAdvert
    };
};

advertCategory.$inject = [
    '$http'
];

angular.module('app').factory('advertCategory', advertCategory);