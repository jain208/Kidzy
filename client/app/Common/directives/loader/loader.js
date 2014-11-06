(function (app) {
    'use strict';
    app.directive('loader', function ($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs, ngModel) {
                var hideLoaderTimeout;
                scope.data = {
                    startTime: undefined
                };
                var unregisterStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    console.group('loader - $stateChangeStart');
                    console.log('from ' + fromState.name + " to " + toState.name);
                    var date = new Date();
                    scope.data.startTime = date;
                    console.log('start time');
                    console.log(scope.data.startTime);

                    elem.removeClass('ng-hide');
                    console.groupEnd('$stateChangeStart');

                });
                var unregisterSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    console.group('loader - $stateChangeSuccess');
                    console.log('from ' + fromState.name + " to " + toState.name);
                    console.log('state Transition time: ' + (new Date() - scope.data.startTime) + ' ms');
                    hideLoaderTimeout = $timeout(function() {
                        elem.addClass('ng-hide');
                    }, 300);

                    console.groupEnd('$stateChangeSuccess');
                });

                var unregisterError = $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                    elem.addClass('ng-hide');
                });

                scope.$on('destroy', function() {
                    console.log('unregistering');
                    unregisterStart();
                    unregisterSuccess();
                    unregisterError();
                    $timeout.cancel(hideLoaderTimeout);
                });
            }
        };
    });
})(angular.module('HousePointsApp'));