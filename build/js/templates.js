angular.module("HousePointsApp").run(["$templateCache",function(r){r.put("404.html",'<div class="not-found-page">\r\n    <h1>Page not found</h1>\r\n    <i class="fa fa-lg fa-warning"></i>The page you are looking for has either moved or doesn\'t exist.\r\n</div>'),r.put("Unauthorized.html",'<div class="unauthorized-page">\r\n    <h1>Unauthorized Access</h1>\r\n    <i class="fa fa-warning"></i>Unfortunately, you are not authorized to access this page.\r\n</div>'),r.put("Register/register.html",'<div class="register-section-container" layout="column" layout-align="center center">\r\n    <section class="register-section">\r\n        <form class="form register-form" id="registerform" name="registerform" novalidate\r\n              ng-submit="registerVm.submit(registerform.$valid, registerVm.user)">\r\n            <h2>Register</h2>\r\n            <fieldset>\r\n                <span class="error-message" ng-if="registerVm.error">{{registerVm.error.message}}</span>\r\n\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group class="md-pink-theme">\r\n                        <label for="email">Email</label>\r\n                        <md-input type="email" id="email" name="email" required maxlength="50"\r\n                                  ng-model="registerVm.user.email" ng-model-options="{ debounce: 200 }"\r\n                                  email-available-validator=""></md-input>\r\n                        <i ng-if="registerform.email.$pending" class="fa fa-spin fa-spinner"></i>\r\n                        <i class="fa fa-close invalid"></i>\r\n                        <i class="fa fa-check valid"></i>\r\n                    </md-input-group>\r\n                        <span class="error-message email-error"\r\n                              ng-if="registerform.$submitted && (registerform.email.$error.required || registerform.email.$error.email)">Please enter a valid email address.</span>\r\n                        <span class="error-message email-error"\r\n                              ng-if="registerform.$submitted && (registerform.email.$error.emailAvailable)">The email address is already registered.</span>\r\n\r\n                </div>\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group class="md-pink-theme">\r\n                        <label for="name">Name</label>\r\n                        <md-input type="text" id="name" name="name" required maxlength="50"\r\n                                  ng-model="registerVm.user.name"></md-input>\r\n                    </md-input-group>\r\n\r\n                    <span class="error-message name-error"\r\n                          ng-if="registerform.$submitted && registerform.name.$error.required">Please enter a name.</span>\r\n                </div>\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group class="md-pink-theme">\r\n                        <label for="password">Password</label>\r\n                        <md-input type="password" id="password" name="password" required maxlength="50"\r\n                                  ng-model="registerVm.user.password"></md-input>\r\n                    </md-input-group>\r\n                    <span class="error-message password-error"\r\n                          ng-if="registerform.$submitted && registerform.password.$error.required">Please enter a password.</span>\r\n                </div>\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group class="md-pink-theme">\r\n                        <label for="passwordRepeat">Confirm Password</label>\r\n                        <md-input type="password" id="passwordRepeat" name="passwordRepeat" required maxlength="50"\r\n                                  ng-model="registerVm.user.passwordRepeat"></md-input>\r\n                    </md-input-group>\r\n                    <span class="error-message password-error"\r\n                          ng-if="registerform.$submitted && registerform.passwordRepeat.$error.required">Please confirm the password.</span>\r\n                    <span class="error-message password-error"\r\n                          ng-if="registerform.$submitted && registerform.passwordRepeat.$valid && registerVm.user.passwordRepeat !== registerVm.user.password">Password doesn\'t match.</span>\r\n                </div>\r\n                <div layout="row" layout-align="center center">\r\n                    <md-button type="submit" class="md-raised md-primary button">Register</md-button>\r\n                </div>\r\n            </fieldset>\r\n        </form>\r\n    </section>\r\n</div>'),r.put("login/login.html",'<div class="login-section-container" layout="column" layout-align="center center">\r\n    <section class="login-section">\r\n        <form class="form login-form" id="loginform" name="loginform" novalidate\r\n              ng-submit="loginVm.submit(loginform.$valid, loginVm.user)">\r\n            <h2>Login</h2>\r\n            <fieldset>\r\n                <span class="error-message" ng-if="loginVm.error">{{loginVm.error.message}}</span>\r\n\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group tabindex="-1" class="md-pink-theme">\r\n                        <label for="email">Email</label>\r\n                        <md-input type="email" id="email" name="email" required maxlength="50"\r\n                                  ng-model="loginVm.user.email"></md-input>\r\n                    </md-input-group>\r\n                    <span class="error-message email-error" ng-if="loginform.$submitted && loginform.email.$invalid">Please enter a valid email address.</span>\r\n                </div>\r\n                <div class="field" layout="column" layout-align="center center">\r\n                    <md-input-group tabindex="-1" class="md-pink-theme">\r\n                        <label for="password">Password</label>\r\n                        <md-input type="password" id="password" name="password" required maxlength="50"\r\n                                  ng-model="loginVm.user.password"></md-input>\r\n                    </md-input-group>\r\n                    <span class="error-message password-error"\r\n                          ng-if="loginform.$submitted && loginform.password.$error.required">Please enter a password.</span>\r\n                </div>\r\n                <div layout="row" layout-align="center center">\r\n                    <md-button type="submit" class="md-raised md-primary button">Login</md-button>\r\n                </div>\r\n            </fieldset>\r\n        </form>\r\n        <div class="register"> or <a ui-sref="register">Sign up</a> if you are a new user</div>\r\n    </section>\r\n</div>'),r.put("main/main.html",'\r\n<parent-view ng-if="mainVm.showParentView" class="parent-view"></parent-view>\r\n\r\n<child-view ng-if="mainVm.showChildView" class="child-view"></child-view>\r\n\r\n<admin-view ng-if="mainVm.showAdminView" class="admin-view"></admin-view>'),r.put("Common/NavBar/NavBar.html",'<header class="navbar">\r\n    <div class="container" layout="row" layout-sm="column">\r\n        <div class="navbar-header clearfix" layout="row" flex>\r\n            <h1 flex><a ui-sref="main">Kidzy</a></h1>\r\n\r\n            <div ng-if="navBarVm.Auth.isLoggedIn()">\r\n                <span class="user-info">{{ ::navBarVm.Auth.getCurrentUser().name}}</span>\r\n                <span hide-gt-sm class="nav-toggle" ng-click="navBarVm.isCollapsed = !navBarVm.isCollapsed">\r\n                     <i class="fa fa-lg fa-bars"></i>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <nav ng-class="{ \'collapsed\': navBarVm.isCollapsed}" ng-if="navBarVm.Auth.isLoggedIn()">\r\n            <ul class="items">\r\n                <li class="main">\r\n                    <a ui-sref="main" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true">Home</a>\r\n                </li><li class="log" ng-if="navBarVm.Auth.hasRole(\'admin\')">\r\n                    <a ui-sref="log" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true" >Log</a>\r\n                </li><li class="logout">\r\n                    <a href="#" ng-click="navBarVm.logout()">Logout</a>\r\n                </li>\r\n            </ul>\r\n        </nav>\r\n\r\n    </div>\r\n</header>'),r.put("log/log.html",'<div class="log">\r\n\r\n    <input type="text" ng-model="logVm.search.message" placeholder="Filter by Messages"/>\r\n    <input type="text" ng-model="logVm.search.caller" placeholder="Filter by Caller"/>\r\n\r\n    <input type="button" class="button" value="Clear Log" ng-click="logVm.logger.clear()"/>\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                <td></td>\r\n                <td>Message</td>\r\n                <td>Caller</td>\r\n                <td>Time (mm:ss.sss)</td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr class="log-entry" data-ng-repeat="log in logVm.logger.messageLog | filter:logVm.search track by $index">\r\n                <td>{{ $index + 1 }}</td>\r\n                <td class="message">{{ log.message }}</td>\r\n                <td>{{ log.caller }}</td>\r\n                <td>{{ log.time | date:\'mm:ss.sss\'}}</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n\r\n'),r.put("main/adminView/adminView.html",'<h2>Admin</h2>\r\n\r\n{{ adminVm.users.length }} users retrieved!!\r\n<div class="usersList">\r\n    <ul>\r\n        <li class="user user-animate" data-ng-repeat="user in adminVm.users track by $index">\r\n            <aj-user user="user"></aj-user>\r\n        </li>\r\n    </ul>\r\n</div>\r\n\r\n'),r.put("main/child/child.html",'<div>\r\n    <a ui-sref="kids.display({kidId: kid._id})">\r\n        <span class="name">{{ kid.name | capitalize }}</span>\r\n    </a>\r\n</div>'),r.put("main/childView/childView.html","<div>Child</div>"),r.put("main/parentView/parentView.html",'<div class="parent-view">\r\n    <md-button class="md-raised md-primary add-kid" aria-label="Add Kid" ui-sref="kids.add">\r\n        <i class="fa fa-plus"></i>\r\n        <span>Add Child</span>\r\n    </md-button>\r\n\r\n    <div class="kidsList">\r\n        <ul>\r\n            <li class="child" data-ng-repeat="kid in kidsVm.kids track by $index">\r\n                <child kid="kid"></child>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n'),r.put("Common/directives/loader/loader.html","<div class=\"loading-container\" min-loader-display=\"300\">\r\n    <div class='loader'>\r\n        <div class='circle loaderBall'></div>\r\n        <div class='circle loaderBall1'></div>\r\n        <div class='circle loaderBall2'></div>\r\n        <div class='circle loaderBall3'></div>\r\n        <div class='circle loaderBall4'></div>\r\n        <div class='circle loaderBall5'></div>\r\n        <div class='circle loaderBall6'></div>\r\n    </div>\r\n</div>"),r.put("main/adminView/user/user.html",'<div class="user-row" layout="row" layout-align="center center">\r\n    <div class="left" layout="column" flex>\r\n        <h4>{{ user.name | capitalize }}</h4>\r\n        <span>{{ user.email }}</span>\r\n    </div>\r\n    <div>\r\n        <span>{{ user.role | capitalize}}</span>\r\n    </div>\r\n    <div class="actions">\r\n        <i class="fa fa-trash" title="delete"></i>\r\n    </div>\r\n</div>')}]);