'use strict';

let register = ($http, $cookies) => {
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
		data.file = window.fileBase64Data;
		//console.log(data);
		$http({
			method: 'POST',
			url: '/register',
			data: data
		})
		.success((response) => {
			$cookies.putObject('user', response);
		})
		.error(() => {
			//
		})
	};

	return {
		getCountries: getCountries,
		getRegions: getRegions,
		sendForm: sendForm
	}
};

register.$inject = ['$http', '$cookies'];

angular.module('app').factory('register', register);