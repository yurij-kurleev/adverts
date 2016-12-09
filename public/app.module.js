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
		.when('/adverts/categories/:categoryId/:pageId', {
			templateUrl: 'components/pages/advert-category/advert-category.html',
			controller: 'advertCategoryController'
		})
		.when('/adverts/:categoryId/subcategories/:subcategoryId/:pageId', {
			templateUrl: 'components/pages/advert-subcategory/advert-subcategory.html',
			controller: 'advertSubcategoryController'
		})
        .when('/adverts/tags/:tagName/:pageId', {
            templateUrl: 'components/pages/advert-tag/advert-tag.html',
            controller: 'advertTagController'
        })
        .when('/adverts/search/:title/:pageId', {
            templateUrl: 'components/pages/advert-search/advert-search.html',
            controller: 'advertSearchController'
        })
		.when('/admin/markers/:pageId', {
			templateUrl: '',
			controller: ''
		})
		.when('/about', {
			templateUrl: 'components/pages/about/about.html',
			controller: 'aboutController'
		})
		.otherwise({
			redirectTo: '/adverts/1'
		});
};
routesConfig.$inject = ['$routeProvider', '$cookiesProvider'];

app.config(routesConfig);