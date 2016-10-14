'use strict';

let registerFactory = ($http) => {
	// /geolocation/countries
	// /geolocation/regions
	// /picture
	let getCountries = () => {
		return $http({
			method: 'GET',
			url: '/geolocation/countries'
		});
	}
	let countriesPromise = getCountries();

	let getRegions = () => {
		return $http({
			method: 'GET',
			url: '/geolocation/regions'
		});
	}
	let regionsPromise = getRegions();


	let sendForm = () => {
		return $http({
			method: 'POST',
			url: '/picture'
		});
	}
	let sendFormPromise = sendForm();

	return {
		countriesPromise: countriesPromise,
		getRegions: getRegions,
		sendForm: sendForm
	}
}

registerFactory.$inject = ['$http'];

angular.module('app').factory('registerFactory', registerFactory);