'use strict';

let advertSearch = ($http) => {
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

advertSearch.$inject = [
    '$http'
];

angular.module('app').factory('advertSearch', advertSearch);