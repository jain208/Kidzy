!function(){"use strict";angular.module("HousePointsApp",["ui.router","ngCookies","restangular","ngAnimate","LocalStorageModule","ngAria","ngMaterial"]).constant("StateErrorCodes",{Unauthenticated:"User not authenticated",Unauthorized:"Unauthorized"}).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$animateProvider","$compileProvider",function(e,t,r,n,o,i){function s(e,t,r,n){var o=t.defer();return r.getAuthToken()?e.isLoggedInPromise().then(function(){n.logMessage({message:"logging out",caller:"app - isAlreadyLoggedIn"}),e.logout(),o.resolve()},function(){o.resolve()}):o.resolve(),o.promise}function a(e,t,r,n){var o=t.defer(),i=this.self;return e.isLoggedInPromise()?e.isLoggedInPromise().then(function(e){i&&i.role?i.role===e.user.role?o.resolve(e.user.role):(n.logMessage({message:"not authorized to the page.",caller:"app - isAuthenticated"}),o.reject({message:r.Unauthorized,next:"unauthorized"})):o.resolve(e.user.role)},function(){n.logMessage({message:"Loggedin promise returned error",caller:"app - isAuthenticated"}),o.reject({message:r.Unauthenticated,next:"login"})}):(n.logMessage({message:"not logged in",caller:"app - isAuthenticated"}),o.reject({message:r.Unauthenticated,next:"login"})),o.promise}o.classNameFilter(/animate/),i.debugInfoEnabled(!1),e.state("main",{url:"/",templateUrl:"main/main.html",controller:"MainController as mainVm",controllerAs:"mainVm",resolve:{isAuthenticated:a}}).state("unauthorized",{url:"/unauthorized",templateUrl:"Unauthorized.html"}).state("404",{url:"/notFound",templateUrl:"404.html"}).state("login",{url:"/login",templateUrl:"login/login.html",controller:"LoginController as loginVm",controllerAs:"loginVm",resolve:{isAlreadyLoggedIn:s}}).state("register",{url:"/register",templateUrl:"Register/register.html",controller:"RegisterController as registerVm",controllerAs:"registerVm",resolve:{isAlreadyLoggedIn:s}}).state("log",{url:"/log",templateUrl:"log/log.html",controller:"LogController as logVm",controllerAs:"logVm"}).state("kids",{"abstract":!0,url:"/child",template:"<ui-view/>"}).state("kids.add",{url:"/add",templateUrl:"main/AddChild/add-child.html",controller:"addChildController as childCtrl",controllerAs:"childCtrl"}).state("kids.display",{url:"/:childId",template:"<div>Child Details - To do</div>"}),t.otherwise("/notFound"),r.html5Mode({enabled:!0,requireBase:!1}),n.interceptors.push("authInterceptor"),s.$inject=["AuthService","$q","StorageService","logger"],a.$inject=["AuthService","$q","StateErrorCodes","logger"]}]).run(["$rootScope","StateErrorCodes","$state",function(e,t,r){e.$on("$stateChangeError",function(e,t,n,o,i,s){s.next&&r.transitionTo(s.next)})}])}(),function(e){"use strict";e.directive("emailAvailableValidator",["$q","$timeout","UserService","logger",function(e,t,r,n){return{restrict:"A",require:"ngModel",link:function(t,o,i,s){s.$asyncValidators.emailAvailable=function(t){var o=e.defer();return r.checkUser(t).then(function(e){n.logMessage({message:"isAvailable: "+e.available,caller:"emailAvailableValidator"}),e.available?o.resolve():o.reject()}),o.promise}}}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.controller("RegisterController",["UserService","$state","AuthService","logger",function(e,t,r,n){function o(o,i){o&&e.createUser(i).then(function(){n.logMessage({message:"redirecting to main",caller:"RegisterController.submit"}),r.login(i).then(function(){t.go("main")})},function(){n.logMessage({message:"error creating user",caller:"RegisterController.submit"})})}function i(){s.user={email:"",password:"",name:""},s.error=void 0}var s=this;s.user={},s.submit=o,i()}])}(angular.module("HousePointsApp")),function(e){"use strict";e.controller("LogController",["logger",function(e){var t=this;t.logger=e}])}(angular.module("HousePointsApp")),function(e){"use strict";e.controller("LoginController",["AuthService","$state",function(e,t){function r(r,n){r&&e.login(n).then(function(){t.go("main")},function(e){o.error=e})}function n(){o.user={email:"",password:""},o.error=void 0}var o=this;o.user={},o.submit=r,o.Auth=e,n()}])}(angular.module("HousePointsApp")),function(e){"use strict";function t(e){var t=this;t.Auth=e,t.showAdminView=t.Auth.hasRole("admin"),t.showChildView=t.Auth.hasRole("child"),t.showParentView=t.Auth.hasRole("parent")}e.controller("MainController",t),t.$inject=["AuthService"]}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("ajNavbar",["AuthService","$state",function(e,t){return{restrict:"EA",templateUrl:"Common/NavBar/NavBar.html",controller:function(){var r=this;r.isCollapsed=!0,r.Auth=e,r.logout=function(){r.Auth.logout(),r.isCollapsed=!0,t.go("login")}},controllerAs:"navBarVm"}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.filter("capitalize",function(){return function(e){if(!e)return"";var t=e.substring(0,1).toUpperCase();return t+e.substring(1)}})}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("AuthService",["$http","$q","UserService","StorageService","logger",function(e,t,r,n,o){function i(){return d.hasOwnProperty("role")}function s(e){return d&&c.isLoggedIn()?d.role===e:!1}function a(){o.logMessage({caller:"AuthService.init",message:"calling StorageService.getAuthToken"}),n.getAuthToken()&&(g=r.getLoggedInUser(),g.then(function(e){d=e.user}))}function l(){o.logMessage({caller:"AuthService.logout"}),d={},g=void 0,n.removeAuthToken()}function u(i){o.logMessage({caller:"AuthService.login"});var s=t.defer();return e.post("/auth/local",i).success(function(e){n.putAuthToken(e.token),g=r.getLoggedInUser(),g.then(function(e){d=e.user,s.resolve()},function(e){s.reject(e)})}).error(function(e){o.logMessage({caller:"AuthService.login",message:"auth/local rejected"}),n.removeAuthToken(),s.reject(e)}),s.promise}var c,g,d={};return c={login:u,logout:l,getCurrentUser:function(){return d},setCurrentUser:function(e){d=e},isLoggedIn:i,isLoggedInPromise:function(){return g},hasRole:s},a(),c}])}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("KidsService",["Restangular","$q",function(e,t){function r(e){var r=t.defer();return e&&angular.isObject(e)||r.reject("Invalid parameters passed"),o.post(e).then(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}function n(){var e=t.defer();return o.get("").then(function(t){e.resolve(t.kids)},function(t){e.reject(t)}),e.promise}var o=e.all("api/kids"),i={getAll:n,addKid:r};return i}])}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("logger",function(){function e(e){var t=new r(e);n.messageLog.push(t)}function t(){n.messageLog=[]}function r(e){this.message=e.message||"",this.type=e.type||"",this.caller=e.caller||"",this.time=new Date}var n={};return n.messageLog=[],n.logMessage=e,n.clear=t,n})}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("StorageService",["localStorageService","logger",function(e,t){function r(){return t.logMessage({message:"StorageService.getAuthToken"}),e.get("token")}function n(){t.logMessage({message:"StorageService.removeAuthToken"}),e.remove("token")}function o(r){t.logMessage({message:"StorageService.putAuthToken"}),null!==r&&void 0!==r&&e.set("token",r)}var i={getAuthToken:r,removeAuthToken:n,putAuthToken:o};return i}])}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("UserService",["Restangular","capitalizeFilter","$q",function(e,t,r){function n(){return l.one("me").get()}function o(e){var t=r.defer();return l.post(e).then(function(){t.resolve()},function(){t.reject()}),t.promise}function i(){return l.getList()}function s(e){return l.one("checkUser",e).get()}var a=e.withConfig(function(e){e.addResponseInterceptor(function(e,r,n){var o=e;return"get"===r&&"me"===n&&(o.user.name=t(o.user.name)),"getList"===r&&(o=e.users),o})}),l=a.all("api/users");return{getLoggedInUser:n,getAllUsers:i,checkUser:s,createUser:o}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.factory("authInterceptor",["$rootScope","$q","StorageService","$location",function(e,t,r,n){return{request:function(e){return e.headers=e.headers||{},r.getAuthToken()&&(e.headers.Authorization="Bearer "+r.getAuthToken()),e},responseError:function(e){return 401===e.status?(n.path("/login"),t.reject(e)):t.reject(e)}}}])}(angular.module("HousePointsApp")),function(e){e.controller("addChildController",["$state",function(e){"use strict";var t=this;t.child={name:"Vatsal"},t.submit=function(){e.go("main")}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("child",function(){return{restrict:"E",templateUrl:"main/child/child.html",scope:{kid:"="}}})}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("childView",function(){return{restrict:"E",templateUrl:"main/childView/childView.html"}})}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("adminView",function(){return{restrict:"E",templateUrl:"main/adminView/adminView.html",controller:["UserService",function(e){var t=this;t.users=[],e.getAllUsers().then(function(e){_.forEach(e,function(e){t.users.push(e)})})}],controllerAs:"adminVm"}})}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("parentView",["$state",function(e){return{restrict:"E",templateUrl:"main/parentView/parentView.html",controller:["KidsService",function(t){var r=this;r.kids=[],r.viewDetails=function(t){e.go("kids.display",{childId:t.data._id})},t.getAll().then(function(e){_.forEach(e,function(e){r.kids.push(e)})})}],controllerAs:"kidsVm"}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("loader",["$rootScope","$timeout","logger",function(e,t,r){return{restrict:"A",replace:!0,templateUrl:"Common/directives/loader/loader.html",link:function(n,o,i){var s,a=i.minLoaderDisplay||300;n.data={startTime:void 0};var l=e.$on("$stateChangeStart",function(){n.data.startTime=new Date,o.removeClass("ng-hide")}),u=e.$on("$stateChangeSuccess",function(e,i,l,u){r.logMessage({message:"from "+u.name+" to "+i.name,caller:"loader - $stateChangeSuccess"});var c=new Date-n.data.startTime;r.logMessage({message:"state Transition time: "+c+" ms",caller:"loader - $stateChangeSuccess"});var g=a-c;g=g>0?g:0,s=t(function(){o.addClass("ng-hide")},g)}),c=e.$on("$stateChangeError",function(){o.addClass("ng-hide")});n.$on("destroy",function(){r.logMessage({message:"unregistering",caller:"loader - destroy"}),l(),u(),c(),t.cancel(s)})}}}])}(angular.module("HousePointsApp")),function(e){"use strict";e.directive("ajUser",function(){return{restrict:"E",replace:!0,scope:{user:"="},templateUrl:"main/adminView/user/user.html"}})}(angular.module("HousePointsApp"));