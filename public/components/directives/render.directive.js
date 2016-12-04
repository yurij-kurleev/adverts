'use strict';

let postRender = ($timeout) => {
    return {
        restrict : 'A',
        terminal : true,
        transclude : true,
        link : function(scope) {
            $timeout(scope.setTagSize, 0);  //Calling a scoped method
        }
    };
};

postRender.$inject = [
    '$timeout'
];

angular.module('app').directive('postRender', postRender);