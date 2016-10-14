'use strict';

angular.module('app').factory('file', () => {
	let convertFileToBinary = (inputFileId) => {
		let file = document.getElementById(inputFileId).files[0];
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		let binaryData;
		fileReader.onloadend = (e) => {
			binaryData = e.target.result;
			console.log(binaryData);
			// send your binary data via $http or $resource or do anything else with it
		}
	};

	return {
		convertFileToBinary: convertFileToBinary
	}
});