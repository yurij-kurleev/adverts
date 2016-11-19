'use strict';

let auth = ($cookies, $http) => {
    let unauthorize = () => {
        $cookies.remove('user');
    };

    let authorize =  (data) => {
        let user = {};
        $http({
            method: 'GET',
            url: '/users/login',
            headers: {
                'Authorization': 'Basic ' + data.login + ':' + data.password
            }
        }).success((response)=>{
            user = response;
            user.login = data.login;
            user.password = data.password;
            $cookies.putObject('user', response);
        })
        .error((response) => {
            console.log(response);
        });
    };

    return {
        unauthorize,
        authorize
    };
};

auth.$inject = ['$cookies', '$http', 'ui'];
angular.module('app').factory('auth', auth);