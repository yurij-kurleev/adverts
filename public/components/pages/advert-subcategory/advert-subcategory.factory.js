'use strict';

let advertSubcategory = ($http) => {
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
        deleteAdvert
    };
};

advertSubcategory.$inject = [
    '$http'
];

angular.module('app').factory('advertSubcategory', advertSubcategory);