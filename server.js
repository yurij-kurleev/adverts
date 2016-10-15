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
				_id: 'c1',
				name: 'Australia'
			},
			{
				_id: 'c2',
				name: 'USA'
			},
			{
				_id: 'c3',
				name: 'Brazil'
			}
		]
		response.send(countries);
	});

/** register **/
	app.post('/register', (request, response) => {
		console.log(request.body);
		response.send('OK');
	});