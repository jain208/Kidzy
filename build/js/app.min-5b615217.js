!function(){"use strict";angular.module("HousePointsApp",["ui.router","ngCookies","restangular","ngAnimate","LocalStorageModule"]).constant("StateErrorCodes",{Unauthorized:"Unauthorized",AlreadyLoggedIn:"AlreadyLoggedIn"}).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(e,o,r,t){function n(e,o,r,t){var n=o.defer();return t.getAuthToken()?e.isLoggedInPromise().then(function(){n.reject(r.AlreadyLoggedIn)},function(){n.resolve()}):n.resolve(),n.promise}function i(e,o,r){var t=o.defer(),n=this.self;return e.isLoggedInPromise()?e.isLoggedInPromise().then(function(e){n&&n.role?n.role===e.user.role?t.resolve():(console.log("not authorized 2"),t.reject(r.Unauthorized)):t.resolve()},function(){console.log("not authorized 3"),t.reject(r.Unauthorized)}):(console.log("not authorized 1"),t.reject(r.Unauthorized)),t.promise}e.state("main",{url:"/",templateUrl:"main/main.html",controller:"mainController as mainVm",resolve:{isAuthenticated:i}}).state("admin",{url:"/admin",templateUrl:"admin/admin.html",controller:"adminController as adminVm",resolve:{isAuthenticated:i},role:"admin"}).state("login",{url:"/login",templateUrl:"login/login.html",controller:"loginController as loginVm",resolve:{isAlreadyLoggedIn:n}}),o.otherwise("/"),r.html5Mode({enabled:!0,requireBase:!1}),t.interceptors.push("authInterceptor"),n.$inject=["AuthService","$q","StateErrorCodes","StorageService"],i.$inject=["AuthService","$q","StateErrorCodes"]}]).run(["$rootScope","StateErrorCodes","$state",function(e,o,r){e.$on("$stateChangeError",function(e,t,n,i,a,l){switch(t.name){case"admin":l===o.Unauthorized&&r.transitionTo("login");break;case"main":l===o.Unauthorized&&r.transitionTo("login");break;case"login":l===o.AlreadyLoggedIn&&r.transitionTo("main")}})}]).factory("authInterceptor",["$rootScope","$q","StorageService","$location",function(e,o,r,t){return{request:function(e){return e.headers=e.headers||{},r.getAuthToken()&&(e.headers.Authorization="Bearer "+r.getAuthToken()),e},responseError:function(e){return 401===e.status?(t.path("/login"),r.removeAuthToken(),o.reject(e)):o.reject(e)}}}])}();
!function(e){"use strict";e.controller("adminController",["AuthService","UserService",function(e,n){var r=this;r.Auth=e,r.users=[],n.getAllUsers().then(function(e){e.forEach(function(e){r.users.push(e)})})}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.directive("ajUser",function(){return{restrict:"E",replace:!0,scope:{user:"="},templateUrl:"admin/user.html"}})}(angular.module("HousePointsApp"));
!function(n){"use strict";n.controller("loginController",["AuthService","$state",function(n,o){function t(t,r){t&&n.login(r).then(function(){o.go("main")},function(n){i.error=n})}function r(){i.user={email:"",password:""},i.error=void 0}var i=this;i.user={},i.submit=t,i.Auth=n,r()}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.controller("mainController",["AuthService",function(t){var n=this;n.Auth=t}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.directive("ajNavbar",["AuthService","$state",function(t,o){return{restrict:"EA",templateUrl:"Common/NavBar/NavBar.html",controller:function(){var r=this;r.isCollapsed=!0,r.Auth=t,r.logout=function(){r.Auth.logout(),r.isCollapsed=!0,o.go("login")}},controllerAs:"navBarVm"}}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.factory("AuthService",["$http","$q","UserService","StorageService",function(e,n,t,r){function o(){return h.hasOwnProperty("role")}function u(e){return h&&g.isLoggedIn()?h.role===e:!1}function i(){r.getAuthToken()&&(f=t.getLoggedInUser(),f.then(function(e){h=e.user}))}function c(){h={},r.removeAuthToken()}function s(o){var u=n.defer();return e.post("/auth/local",o).success(function(e){r.putAuthToken(e.token),f=t.getLoggedInUser(),f.then(function(e){h=e.user,u.resolve()},function(e){u.reject(e)})}).error(function(e){r.removeAuthToken(),u.reject(e)}),u.promise}var g,f,h={};return g={login:s,logout:c,getCurrentUser:function(){return h},setCurrentUser:function(e){h=e},isLoggedIn:o,isLoggedInPromise:function(){return f},hasRole:u},i(),g}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.factory("StorageService",["localStorageService",function(e){function t(){return e.get("token")}function n(){e.remove("token")}function o(t){null!==t&&void 0!==t&&e.set("token",t)}var u={getAuthToken:t,removeAuthToken:n,putAuthToken:o};return u}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.factory("UserService",["Restangular","capitalizeFilter",function(e,t){function r(){return s.one("me").get()}function n(){return s.getList()}var s=e.all("api/users");return e.addResponseInterceptor(function(e,r,n){var s=e;return"get"===r&&"me"===n&&(s.user.name=t(s.user.name)),"getList"===r&&(s=e.users),s}),{getLoggedInUser:r,getAllUsers:n}}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.filter("capitalize",function(){return function(t){if(!t)return"";var n=t.substring(0,1).toUpperCase();return n+t.substring(1)}})}(angular.module("HousePointsApp"));