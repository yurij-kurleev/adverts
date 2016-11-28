'use strict';

angular.module('app').factory('ui', () => {
	let toggleClass = (blockId, classForToggle) => {
		let block = document.getElementById(blockId);
		block.classList.toggle(classForToggle);
	};

	let toggleMenu = () => {
		toggleClass('nav-menu', 'nav-menu_active');
		toggleClass('change-on-menu-open', 'move-left-on-menu-open');
	};

	let scrollTo = (target, time = 300) => {
	    target = "#" + target;
	    $('html, body').animate({scrollTop: $(target).offset().top}, time);
	    return false;
	};

	let toggleError = (blockId) => {
        let block = document.getElementById(blockId);
        if(block.style.display == "block"){
            block.style.display = "none";
        }
        else{
            block.style.display = "block";
            setTimeout(() => {block.style.display = "none"}, 10000);
        }
    };

    let toggleAuthDialog = () => {
		let menu = document.getElementById('popup-form');
		let layer = document.getElementById('dark-layout');
		console.log(menu.style.display);
		console.log(layer.style.display);
		if(!menu.style.display || menu.style.display == "none"){
			menu.style.display = "block";
			layer.style.display = "block";
		} else{
			menu.style.display = "none";
			layer.style.display = "none";
		}
	};

	let setTagSize = () => {

	};

	return {
		toggleClass: toggleClass,
		toggleMenu: toggleMenu,
		scrollTo: scrollTo,
        toggleError: toggleError,
		toggleAuthDialog: toggleAuthDialog,
	}
});