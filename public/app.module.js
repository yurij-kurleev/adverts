'use strict';

const app = angular.module('app', ['ngRoute', 'ngCookies']);

// Routes
let routesConfig = ($routeProvider) => {
	$routeProvider.
		when('/home', {
			templateUrl: 'components/pages/home/home.html',
			controller: 'homeController'
		})
		.when('/register', {
			templateUrl: 'components/pages/register/register.html',
			controller: 'registerController'
		})
		.when('/user', {
			templateUrl: 'components/pages/user/user.html',
			controller: 'userController'
		})
		.otherwise({
			redirectTo: '/home'
		});
};
routesConfig.$inject = ['$routeProvider', '$cookiesProvider'];

app.config(routesConfig);