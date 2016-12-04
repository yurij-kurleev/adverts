'use strict';

let advertTag = ($http) => {
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

advertTag.$inject = [
    '$http'
];

angular.module('app').factory('advertTag', advertTag);