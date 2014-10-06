!function(){"use strict";angular.module("HousePointsApp",["ui.router","ngCookies"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(e,o,t,r){e.state("main",{url:"/",templateUrl:"main/main.html",controller:"mainController as mainVm"}).state("login",{url:"/login",templateUrl:"login/login.html",controller:"loginController as loginVm"}),o.otherwise("/"),t.html5Mode({enabled:!0,requireBase:!1}),r.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(e,o,t,r){return{request:function(e){return e.headers=e.headers||{},t.get("token")&&(console.log("token added"),e.headers.Authorization="Bearer "+t.get("token")),e},responseError:function(e){return 401===e.status?(r.path("/login"),t.remove("token"),o.reject(e)):o.reject(e)}}}])}();
!function(o){"use strict";o.factory("AuthService",["$http","$q","$cookieStore",function(o,t,e){function n(){e.remove("token"),u=!1}function r(r){var c=t.defer();return o.post("/auth/local",r).success(function(o){e.put("token",o.token),u=!0,c.resolve(o)}).error(function(o){n(),c.reject(o)}),c.promise}var u=!1;return{login:r,logout:n,isLoggedIn:function(){return u}}}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.factory("UserService",function(){function e(){return $http.get("api/users/me")}return{getLoggedInUser:e}})}(angular.module("HousePointsApp"));
!function(o){"use strict";o.controller("loginController",["AuthService","$state",function(o,n){function t(){i.user={email:"",password:""}}var i=this;t(),i.submit=function(t,i){t&&(console.log(t),console.log(i),o.login(i).then(function(){n.go("main")}))}}])}(angular.module("HousePointsApp"));
!function(o){"use strict";o.controller("mainController",[function(){var o=this;o.message="Hello from controller"}])}(angular.module("HousePointsApp"));