'use strict';

window.fileBase64Data = 'no file';

let convertFileToBase64 = (inputFileId) => {
	let file = document.getElementById(inputFileId);
	let fileReader = new FileReader();
	fileReader.readAsDataURL(file.files[0]);

	fileReader.onloadend = (e) => {
		window.fileBase64Data = e.target.result;
		console.log('file uploaded and converted to base64');
	}
}
