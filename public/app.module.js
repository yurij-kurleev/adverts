'use strict';

const app = angular.module('app', ['ngRoute', 'ngCookies']);

// Routes
let routesConfig = ($routeProvider) => {
	$routeProvider.
		when('/adverts/:pageId', {
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
		.when('/advert/add', {
			templateUrl: 'components/pages/advert-add/add-advert.html',
			controller: 'advertAddController'
		})
		.when('/adverts/more/:id', {
			templateUrl: 'components/pages/advert-more/more.html',
			controller: 'advertMoreController'
		})
		.when('/adverts/edit/:id', {
			templateUrl: 'components/pages/advert-update/update.html',
			controller: 'advertUpdateController'
		})
		.when('/profile/edit/:id', {
			templateUrl: 'components/pages/profile-edit/update.html',
			controller: 'profileEditController'
		})
		.otherwise({
			redirectTo: '/adverts/1'
		});
};
routesConfig.$inject = ['$routeProvider', '$cookiesProvider'];

app.config(routesConfig);