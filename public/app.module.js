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
		.when('/profile', {
			templateUrl: 'components/pages/profile/profile.html',
			controller: 'profileController'
		})
		.when('/add-advert', {
			templateUrl: 'components/pages/advert/add-advert.html',
			controller: 'advertController'
		})
		.otherwise({
			redirectTo: '/home'
		});
};
routesConfig.$inject = ['$routeProvider', '$cookiesProvider'];

app.config(routesConfig);