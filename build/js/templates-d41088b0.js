angular.module("HousePointsApp").run(["$templateCache",function(r){r.put("NavBar/NavBar.html",'<header class="navbar flex">\r\n    <div class="container">\r\n        <div class="navbar-header clearfix">\r\n            <h1 class="left">Kidzy</h1>\r\n            <div class="right" ng-if="navBarVm.Auth.isLoggedIn()">\r\n                <span class="user">{{ ::navBarVm.Auth.getCurrentUser().name}}</span>\r\n            <span class="nav-toggle visible-mobile" ng-click="navBarVm.isCollapsed = !navBarVm.isCollapsed">\r\n                 <i class="fa fa-lg fa-bars"></i>\r\n            </span>\r\n            </div>\r\n        </div>\r\n        <nav ng-class="{ \'collapsed\': navBarVm.isCollapsed}"  ng-if="navBarVm.Auth.isLoggedIn()">\r\n            <ul class="items">\r\n                <li class="main">\r\n                    <a ui-sref="main" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true">Main</a>\r\n                </li>\r\n                <li class="admin" ng-if="navBarVm.Auth.hasRole(\'admin\')">\r\n                    <a ui-sref="admin" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true">Admin</a>\r\n                </li>\r\n                <li class="logout">\r\n                    <a href="#" ng-click="navBarVm.logout()">Logout</a>\r\n                </li>\r\n            </ul>\r\n        </nav>\r\n\r\n    </div>\r\n</header>'),r.put("admin/admin.html",'<h2>Admin</h2>\r\n\r\n{{ adminVm.users.length }} users retrieved!!\r\n<div class="usersList">\r\n    <ul>\r\n        <li data-ng-repeat="user in adminVm.users track by $index">\r\n            <aj-user user="user"></aj-user>\r\n        </li>\r\n    </ul>\r\n</div>\r\n\r\n'),r.put("admin/user.html",'<div class="user-row">\r\n    <div class="left">\r\n        <span>{{ user.name | capitalize }}</span>\r\n        <span>{{ user.email }}</span>\r\n    </div>\r\n    <div class="right">\r\n        <span>{{ user.role | capitalize}}</span>\r\n    </div>\r\n    <div class="actions">\r\n        <i class="fa fa-trash" title="delete"></i>\r\n    </div>\r\n</div>'),r.put("main/main.html","<h2>Main</h2>\r\n<div>{{ ::'Hello ' + mainVm.Auth.getCurrentUser().name }}</div>"),r.put("login/login.html",'<section class="login-section">\r\n    <form class="form login-form" id="loginform" name="loginform" novalidate ng-submit="loginVm.submit(loginform.$valid, loginVm.user)">\r\n        <h2>Login</h2>\r\n        <fieldset>\r\n            <span class="error-message" ng-if="loginVm.error">{{loginVm.error.message}}</span>\r\n            <div class="field">\r\n                <input type="email" id="email" name="email" placeholder="Email" required maxlength="50" ng-model="loginVm.user.email"/>\r\n                <span class="error-message email-error" ng-if="loginform.$submitted && loginform.email.$invalid">Please enter a valid email address.</span>\r\n            </div>\r\n            <div class="field">\r\n                <input type="password" id="password" name="password" placeholder="Password" required maxlength="50" ng-model="loginVm.user.password"/>\r\n                <span class="error-message password-error" ng-if="loginform.$submitted && loginform.password.$error.required">Please enter a password.</span>\r\n            </div>\r\n            <input type="submit" class="button"/>\r\n        </fieldset>\r\n    </form>\r\n</section>')}]);