'use strict';

let auth = ($cookies, $http) => {
    let unauthorize = () => {
        $cookies.remove('user');
    };

    let authorize =  (data) => {
        return $http({
            method: 'GET',
            url: '/users/login',
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        });
    };

    return {
        unauthorize,
        authorize
    };
};

auth.$inject = ['$cookies', '$http', 'ui'];
angular.module('app').factory('auth', auth);