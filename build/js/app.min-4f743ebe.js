!function(){"use strict";angular.module("HousePointsApp",["ui.router","ngCookies"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(o,e,l){o.state("main",{url:"/",templateUrl:"main/main.html",controller:"mainController as mainVm"}).state("login",{url:"/login",templateUrl:"login/login.html",controller:"loginController as loginVm"}),e.otherwise("/"),l.html5Mode({enabled:!0,requireBase:!1})}])}();
!function(o){"use strict";o.factory("AuthService",["$http","$q","$cookieStore",function(o,t,e){function n(){e.remove("token"),u=!1}function r(r){var c=t.defer();return o.post("/auth/local",r).success(function(o){e.put("token",o.token),u=!0,c.resolve(o)}).error(function(o){n(),c.reject(o)}),c.promise}var u=!1;return{login:r,logout:n,isLoggedIn:function(){return u}}}])}(angular.module("HousePointsApp"));
!function(o){"use strict";o.controller("mainController",[function(){var o=this;o.message="Hello from controller"}])}(angular.module("HousePointsApp"));
!function(o){"use strict";o.controller("loginController",["AuthService","$state",function(o,n){function t(){i.user={email:"",password:""}}var i=this;t(),i.submit=function(t,i){t&&(console.log(t),console.log(i),o.login(i).then(function(){n.go("main")}))}}])}(angular.module("HousePointsApp"));