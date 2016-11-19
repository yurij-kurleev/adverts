'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;
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
		let countries = [
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
		];
		response.send(countries);
	});

/** regions **/

app.get('/geolocation/countries/c1/regions', (request, response) => {
	let regions = [
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
	];
	response.send(regions);
});

/** register **/
	app.post('/users', (request, response) => {
		console.log(request.body);
		response.send('OK');
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
				href: "http://localhost:8080/users/1/image"
				}
	},
	id: 1
	};
	response.send(user);
});