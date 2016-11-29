'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8080;
app.listen(port, () => {
	console.log('server listening at http://localhost:' + port);
});

/*******
* Routes *
********/

/** others **/
	app.use(express.static(__dirname+"/public"));
	app.use(bodyParser.json());

/** countries **/
	app.get('/geolocation/countries', (request, response) => {
		let countries = {
			_embedded: {
				countries: [
					{
						id: 'c1',
						name: 'Australia'
					},
					{
						id: 'c2',
						name: 'USA'
					},
					{
						id: 'c3',
						name: 'Brazil'
					}
				]
			}
		};
		response.send(countries);
	});

/** regions **/

app.get('/geolocation/countries/c1/regions', (request, response) => {
	let regions = {
		_embedded: {
			regions: [
				{
					id: 'r1',
					name: 'Sidney'
				},
				{
					id: 'r2',
					name: 'Washington DC'
				},
				{
					id: 'r3',
					name: 'Kuala-Lumpur'
				}
			]
		}
	};
	response.send(regions);
});

/** register **/
	app.post('/users', (request, response) => {
		let user = {
			name: "Bogdan",
			surname: "Fedoronchuk",
			phone: "752 25 50",
			email: "haistler97@ukr.net",
			registrationDate: "2016-11-19T12:31:22",
			regionName: "Одесская область",
			countryName: "Украина",
			admin: false,
			_links:{
				self:{
					href: "http://localhost:8080/users/1"
				},
				image: {
					href: "/public/img/nastol.com.ua-118626.jpg"
				}
			},
			id: 1
		};
		response.send(user);
	});

/** login **/
app.get('/users/login', (request, response) => {
	let user = {
		name: "Bogdan",
		surname: "Fedoronchuk",
		phone: "752 25 50",
		email: "haistler97@ukr.net",
		registrationDate: "2016-11-19T12:31:22",
		regionName: "Одесская область",
		countryName: "Украина",
		admin: false,
		_links:{
			self:{
				href: "http://localhost:8080/users/1"
			},
			image: {
				href: "/public/img/nastol.com.ua-118626.jpg"
			}
		},
		id: 1
	};
	response.send(user);
});

/** categories **/
app.get('/categories', (request, response) => {
	let categories = {
		_embedded: {
			categories: [
				{
					name: "Автомобили",
					_links: {
						self: {
							href: "http://localhost:8080/categories/1"
						}
				},
					id: "1"
				},
				{
					name: "Промшленность",
					_links: {
						self: {
							href: "http://localhost:8080/categories/2"
						}
					},
					id: "2"
				}
			]
		},
		_links: {
			self: {
				href: "http://localhost:8080/categories"
			}
		}
	};
	response.send(categories);
});

/** subcategories **/
app.get('/categories/1/subcategories', (request, response) => {
	let subcategories = {
		_embedded: {
			subcategories: [
				{
					name: "Легковые",
					_links: {
						self: {
							href: "http://localhost:8080/categories/1/subcategories/1"
						}
					},
					id: "1"
				},
				{
					name: "Грузовые",
					_links: {
						self: {
							href: "http://localhost:8080/categories/1/subcategories/2"
						}
					},
					id: "2"
				}
			]
		},
		_links: {
			self: {
				href: "http://localhost:8080/categories/1/subcategories"
			}
		}
	};
	response.send(subcategories);
});

/** currencies **/
app.get('/currencies', (request, response) => {
	let currencies = {
		_embedded: {
			currencies: [
				{
					abbreviation: "грн",
					_links: {
						self: {
							"href": "http://localhost:8080/currencies/1"
						}
					},
					id: 1
				},
				{
					abbreviation: "долл",
					_links: {
						self: {
							href: "http://localhost:8080/currencies/2"
						}
					},
					id: 2
				}
			]
		},
		_links: {
			self: {
				href: "http://localhost:8080/currencies"
			}
		}
};
	response.send(currencies);
});

/** marks **/
app.get('/markers', (request, response) => {
	let markers = {
		_embedded: {
			markers: [
				{
					name: "Срочно",
					_links: {
						self: {
							"href": "http://localhost:8080/markers/1"
						}
					},
					id: 1
				},
				{
					name: "Дёшево",
					_links: {
						self: {
							href: "http://localhost:8080/markers/2"
						}
					},
					id: 2
				}
			]
		},
		_links: {
			self: {
				href: "http://localhost:8080/markers"
			}
		}
	};
	response.send(markers);
});

/** register **/
app.post('/adverts', (request, response) => {
	response.send("OK");
});

/** get one advert-add **/
app.get('/adverts/1', (request, response) => {
	let adverts = {
		"_embedded": {
			"adverts": [
				{
					"advertId": 4,
					"title": "Second ad",
					"description": "My description",
					"addTime": "2016-11-23T13:56:27",
					"views": 0,
					"tags": [
						{
							"name": "б/у",
							"id": 1
						},
						{
							"name": "зарубежный",
							"id": 2
						}
					],
					"price": 6546546,
					"_links": {
						"self": {
							"href": "http://localhost:8080/adverts/4"
						},
						"image": {
							"href": "http://localhost:8080/adverts/4/image"
						}
					},
					"owner": {
						"name": "Bodya",
						"surname": "Fedoronchuk",
						"phone": "752 25 50",
						"email": "haistler@ukr.net",
						"id": 1
					},
					"region": {
						"name": "Одесская область",
						"id": 1
					},
					"country": {
						"name": "Украина",
						"id": 1
					},
					"category": {
						"name": "Автомобили",
						"id": 1
					},
					"subcategory": {
						"name": "Легковые",
						"id": 1
					},
					"marker": {
						"name": "Срочно",
						"id": 1
					},
					"currency": {
						"abbreviation": "долл",
						"id": 3
					}
				}
			]
		},
		"_links": {
			"firstPage": {
				"href": "http://localhost:8080/adverts?page=1&size=1"
			},
			"currentPage": {
				"href": "http://localhost:8080/adverts?page=3&size=1"
			},
			"lastPage": {
				"href": "http://localhost:8080/adverts?page=4&size=1"
			}
		}
	};
	response.send(adverts);
});

