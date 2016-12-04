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
		if(!menu.style.display || menu.style.display == "none"){
			menu.style.display = "block";
			layer.style.display = "block";
		} else{
			menu.style.display = "none";
			layer.style.display = "none";
		}
	};

	let setTagSize = (tagId, amount) => {
		let tag = document.getElementById(tagId);
        let fontSize = "";
		if(amount <= 1){
		    fontSize = "1rem";
        }
        if(amount > 1 && amount <= 4){
            fontSize = "1.5rem";
        }
        if(amount > 4){
            fontSize = "2rem";
        }
        tag.style.fontSize = fontSize;
	};

	let toggleDeleteModal = () => {
        let modal = document.getElementById('modal-delete');
        let layer = document.getElementById('delete-layout');
        if(!modal.style.display || modal.style.display == "none"){
            console.log(1);
            modal.style.display = "flex";
            layer.style.display = "block";
        } else{
            console.log(2);
            modal.style.display = "none";
            layer.style.display = "none";
        }
    };

	return {
		toggleClass,
		toggleMenu,
		scrollTo,
        toggleError,
		toggleAuthDialog,
        setTagSize,
        toggleDeleteModal
	}
});