'use strict';

let auth = ($cookies) => {
    let unauthorize = () => {
        $cookies.remove('user');
    };

    return {
        unauthorize: unauthorize
    };
};

auth.$inject = ['$cookies'];
angular.module('app').factory('auth', auth);