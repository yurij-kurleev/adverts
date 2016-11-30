'use strict';

let advertMore = ($http) => {
    let getAdvert = (advertId) => {
        return $http({
            method: 'GET',
            url: '/adverts/' + advertId
        });
    };

    let addView = (url) => {
        $http({
            method: 'PUT',
            url: url
        });
    };

    return {
        getAdvert,
        addView
    };
};
advertMore.$inject = [
    '$http'
];

angular.module('app').factory('advertMore', advertMore);