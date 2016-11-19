'use strict';

let register = ($http) => {
	// /geolocation/countries
	// /geolocation/regions
	// /picture
	let getCountries = () => {
		return $http({
			method: 'GET',
			url: '/geolocation/countries'
		});
	};

	let getRegions = (id) => {
		return $http({
			method: 'GET',
			url: '/geolocation/countries/' + id + '/regions'
		});
	};

	let sendForm = (data) => {
		data.image = window.fileBase64Data;
		return $http({
			method: 'POST',
			//url: '/users',
			url: '/register',
			data: data
		});
	};

	return {
		getCountries: getCountries,
		getRegions: getRegions,
		sendForm: sendForm
	}
};

register.$inject = ['$http'];

angular.module('app').factory('register', register);