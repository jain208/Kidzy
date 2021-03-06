(function (app) {
    'use strict';
    app.factory('UserService', function (Restangular, capitalizeFilter, $q) {

        var restAngular =
            Restangular.withConfig(function(Configurer) {
                Configurer.addResponseInterceptor(function(data, operation, what) {
                    var response = data;
                    if (operation === 'get' && what === 'me') {
                        response.user.name = capitalizeFilter(response.user.name);
                    }
                    if (operation === 'getList') {
                        response = data.users;
                    }
                    return response;
                });
            });
        var users = restAngular.all('api/users');

        return {
            getLoggedInUser: getLoggedInUser,
            getAllUsers: getAllUsers,
            checkUser: checkUser,
            createUser: createUser
        };

        function getLoggedInUser() {
            return users.one('me').get();
        }

        function createUser(user) {
            var defer = $q.defer();
            users.post(user).then(function resolved() {
                defer.resolve();
            }, function rejected() {
                defer.reject();
            });

            return defer.promise;
        }

        function getAllUsers() {
            return users.getList();
        }

        function checkUser(username) {
            return users.one('checkUser', username).get();
        }
    });
})(angular.module('HousePointsApp'));