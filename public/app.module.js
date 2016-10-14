'use strict';

const app = angular.module('app', ['ngRoute']);

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
		.otherwise({
			redirectTo: '/home'
		});
}
routesConfig.$inject = ['$routeProvider'];

app.config(routesConfig);