
if (window.innerWidth >= 1000) {
    document.addEventListener('DOMContentLoaded', function() {
        var slider = document.getElementById("slider");
        var clickable = document.querySelectorAll('.clickable-pets, .clickable-travels, .clickable-recipes');
        let focusedImg = null;
        let wasClicked = false;
        const hasTabIndex = document.querySelectorAll('img[tabindex]');
        let tabIndex = 0;

        hasTabIndex.forEach((img, index) => {
            img.setAttribute('tabindex', tabIndex);
        });

        function addImage(element) {
            var img = slider.querySelector('img');
            if (img) {
                img.remove();
            }
            var clonedItem = element.cloneNode(true);
            var classList = clonedItem.classList;
            classList.forEach(function(className) {
                if (className !== 'clickable-pets' && className !== 'clickable-recipes' 
                    && className !== 'clickable-travels') {
                    clonedItem.classList.remove(className);
                }
            });            
            clonedItem.setAttribute('tabindex', '-1'); 
            slider.appendChild(clonedItem);
            slider.style.display = 'block';
        }

        clickable.forEach(function(item) {
            item.addEventListener('click', function(event) {
                addImage(item);
            });

            item.addEventListener('keydown', function(event) {
                if (event.keyCode === 13) {
                    addImage(item);
                    setTimeout(function() {
                        prevButton.focus();
                        focusedImg = item;
                    }, 0);
                }
            });
        });

        function getClickableClassName(element) {
            if (element.classList.contains('clickable-pets')) {
                return '.clickable-pets';
            } else if (element.classList.contains('clickable-recipes')) {
                return '.clickable-recipes';
            }
            return '.clickable-travels';
        }

        function getNumPic(className) {
            if (className === '.clickable-pets') {
                return 11;
            }
            return 15;
        }

        function clicakableArr(className) {
            var clickable = document.querySelectorAll(className);
            var numPic = getNumPic(className);
            var clickableArray = Array.from(clickable);
            if (clickableArray.length > numPic) {
                clickableArray = clickableArray.slice(0, numPic);
            }
            return clickableArray;
        }

        function findIndex(currentImg, clickableArray) {
            var currentSrc = currentImg.getAttribute('src');
            var currentIndex = -1;
            for (var i = 0; i < clickableArray.length; i++) {
                var src = clickableArray[i].getAttribute('src');
                if (src === currentSrc) {
                    currentIndex = i;
                    break;
                }
            }
            return currentIndex;
        }

        function returnPrev(className, currentImg) {
            var clickable = clicakableArr(className);
            var currentIndex = findIndex(currentImg, clickable);
            if (currentIndex > 0) {
                var prevClickableElement = clickable[currentIndex - 1];
                addImage(prevClickableElement);
            }
        }

        function returnNext(className, currentImg) {
            var clickable = clicakableArr(className);
            var currentIndex = findIndex(currentImg, clickable);
            var numPic = getNumPic(className);
            if (currentIndex < numPic - 1) {
                var nextClickableElement = clickable[currentIndex + 1];
                addImage(nextClickableElement);
            }
        }

        var prevButton = document.querySelector('.prev-button');

        prevButton.addEventListener('click', function() {
            var currentImg = slider.querySelector('img');
            var clickableClassName = getClickableClassName(currentImg);
            returnPrev(clickableClassName, currentImg);
        });

        var nextButton = document.querySelector('.next-button');

        nextButton.addEventListener('click', function() {
            var currentImg = slider.querySelector('img');
            var clickableClassName = getClickableClassName(currentImg);
            returnNext(clickableClassName, currentImg);
        });
        
        var closeButton = document.querySelector('.close-slider');

        closeButton.addEventListener('click', function() {
            slider.style.display = 'none';
            wasClicked = true;
        });

        prevButton.addEventListener('focus', function(event) {
            event.preventDefault();
        });
        nextButton.addEventListener('focus', function(event) {
            event.preventDefault();
        });

        closeButton.addEventListener('focus', function(event) {
            event.preventDefault();
        });

        closeButton.addEventListener('blur', function() {
            if (wasClicked) {
                focusedImg.focus();
                wasClicked = false;
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Tab') {
                var sliderDisplay = window.getComputedStyle(slider).getPropertyValue('display');
                if (sliderDisplay !== 'none') {
                    event.preventDefault();
                }
            }

            switch (event.key) {
                case 'ArrowUp':
                    closeButton.focus();
                    break;
                case 'ArrowLeft':
                    prevButton.focus();
                    break;
                case 'ArrowRight':
                    nextButton.focus();
                    break;
                case 'ArrowDown':
                    prevButton.focus();
                    break;
            }
        });
    });
}