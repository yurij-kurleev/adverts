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
	}

	let getRegions = () => {
		return $http({
			method: 'GET',
			url: '/geolocation/regions'
		});
	}

	let sendForm = (data) => {
		data.file = window.fileBase64Data;
		console.log(data);
		$http({
			method: 'POST',
			url: '/register',
			data: data
		})
		.success((response) => {
			console.log(response);
		})
	}

	return {
		getCountries: getCountries,
		getRegions: getRegions,
		sendForm: sendForm
	}
}

register.$inject = ['$http'];

angular.module('app').factory('register', register);