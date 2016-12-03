'use strict';

let advertCategory = ($http) => {
    let getAdvertsByCategory = (page, categoryId, limit = 2) => {
        return $http({
            method: 'GET',
            url: '/adverts?page=' + page + '&size=' + limit + '&categoryId=' + categoryId
        });
    };

    return {
        getAdvertsByCategory
    };
};

advertCategory.$inject = [
    '$http'
];

angular.module('app').factory('advertCategory', advertCategory);