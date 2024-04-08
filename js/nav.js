if (window.innerWidth >= 700) {
    var petsNavClicked = false;
    var recipesNavClicked = false;
    var travelNavClicked = false;

    document.addEventListener('click', function(event) {
        var target = event.target;
        var anchorPets = document.querySelector('.pets-dropdown a');
        var anchorRecipes = document.querySelector('.recipes-dropdown a');
        var anchorTravel = document.querySelector('.travel-dropdown a');


        if (target.matches('.pets-nav a')) {
            event.preventDefault();
            if (!petsNavClicked) {
                showDropdown(target);
                hideDropdown(anchorRecipes);
                hideDropdown(anchorTravel);
                recipesNavClicked = false;
                travelNavClicked = false;
            } else {
                hideDropdown(target);
            }
            petsNavClicked = !petsNavClicked;
        } else if (target.matches('.recipes-nav a')) {
            event.preventDefault();
            if (!recipesNavClicked) {
                showDropdown(target);
                hideDropdown(anchorPets);
                hideDropdown(anchorTravel);
                petsNavClicked = false;
                travelNavClicked = false;
            } else {
                hideDropdown(target);
            }
            recipesNavClicked = !recipesNavClicked;
        } else if (target.matches('.travel-nav a')) {
            event.preventDefault();
            if (!travelNavClicked) {
                showDropdown(target);
                hideDropdown(anchorPets);
                hideDropdown(anchorRecipes);
                petsNavClicked = false;
                recipesNavClicked = false;
            } else {
                hideDropdown(target);
            }
            travelNavClicked = !travelNavClicked;
        }
    });

    document.addEventListener('focusin', function(event) {
        var target = event.target;
        if (target.matches('.nav-button a')) {
            showDropdown(target);
        }
    });

    document.addEventListener('focusout', function(event) {
        var target = event.target;
        if (target.matches('.dropdown a:last-child')) {
            hideDropdown(target);
        }
    });

    document.addEventListener('click', function(event) {
        var target = event.target;

        if (target.matches('.dropdown a')) {
            hideDropdown(target);
        }
    });
    function showDropdown(anchor) {            
        var dropdown = anchor.parentElement.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
            dropdown.style.display = 'grid';
            dropdown.style.alignContents = 'start';
        }

        if (dropdown.classList.contains('pets-dropdown')) {
            dropdown.style.gridArea = '2/2/3/3';
        }


        if (dropdown.classList.contains('recipes-dropdown')) {
            dropdown.style.gridArea = '2/3/3/4';
        }

        if (dropdown.classList.contains('travel-dropdown')) {
            dropdown.style.gridArea = '2/4/3/-1';
        }
    }

    function hideDropdown(anchor) {
        if (anchor.parentElement.classList.contains('nav-button')) {
            anchor.parentElement.nextElementSibling.style.display = 'none';
        }
        if (anchor.parentElement.classList.contains('dropdown')) {
            anchor.parentElement.style.display = 'none';
        }
    }
}