'use strict';

let advertStatistics = ($http) => {
    let getTopTags = (user) => {
        return $http({
            method: "GET",
            url: '/adverts/mostAdvertsTags',
            headers: {
                'Authorization': 'Basic ' + user.login + ':' + user.password
            }
        });
    };

    let getTopSubcategories = (user) => {
        return $http({
            method: "GET",
            url: '/categories/subcategories/mostAdverts',
            headers: {
                'Authorization': 'Basic ' + user.login + ':' + user.password
            }
        });
    };

    return {
        getTopTags,
        getTopSubcategories
    };
};

advertStatistics.$inject = [
    '$http'
];

angular.module('app').factory('advertStatistics', advertStatistics);