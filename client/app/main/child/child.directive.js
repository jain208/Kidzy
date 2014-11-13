(function (app) {
    'use strict';
    app.directive('child', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/child/child.html',
            scope: {
                kid: '='
            }
        };
    });
})(angular.module('HousePointsApp'));