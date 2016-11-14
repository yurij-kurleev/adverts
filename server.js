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
	app.post('/register', (request, response) => {
		console.log(request.body);
		response.send('OK');
	});