'use strict';

const express = require('express');

const app = express();

const port = 1000;
app.listen(port, () => {
	console.log('server listening at http://localhost:' + port);
});

/*******
* Routes *
********/

/** others **/
	app.use(express.static(__dirname+"/public"));

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
				name: 'Rashka'
			}
		]
		response.send(countries);
	});