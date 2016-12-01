'use strict';

let advertUpdate = ($http) => {
    let getAdvert = (advertId) => {
        return $http({
            method: 'GET',
            url: '/adverts/' + advertId
        });
    };

    let sendForm = (data, advertId) => {
        return $http({
            method: 'PUT',
            url: '/adverts/' + advertId,
            data: data,
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    return {
        getAdvert,
        sendForm
    };
};

advertUpdate.$inject = [
    '$http'
];

angular.module('app').factory('advertUpdate', advertUpdate);