let gameSearch = document.querySelector('#game-search');
let gamesHtml = document.querySelector('#cards').children;
gamesHtml = Array.prototype.slice.call(gamesHtml, 0);

// Assigns values from XML to all games, acquired from values stored in spans in HTML
for (const game of gamesHtml) {
    game.name = game.querySelector(`#${game.id}-name`).innerText;
    game.date = game.querySelector(`#${game.id}-date`).innerText;
    game.genre = game.querySelector(`#${game.id}-genre`).innerText;
    game.metacritic = parseInt(game.querySelector(`#${game.id}-rating`).innerText);
}

/**
 * Displays games that contain value of input whenever input changes in search bar
 */
gameSearch.addEventListener('input', () => {
    // Displays all games if there is no input in search bar
    if (gameSearch.value === '') {
        for (const game of gamesHtml) {
            game.style.display = 'block';
        }
        return;
    }

    for (const game of gamesHtml) {
        if (game.name.toLowerCase().includes(gameSearch.value.toLowerCase())) {
            game.style.display = 'block';
        }
        else {
            game.style.display = 'none';
        }
    }
});

/**
 * Adds various on-click functionality for games
 */
function addGameOnClick() {
    for (const game of gamesHtml) {
        const gameInner = game.querySelector('.card');

        // Creates a hidden form and immediately submits it with a post request to details.php
        // to get details page for the game clicked
        gameInner.addEventListener('click', () => {
            const form = document.createElement('form');
            form.style.display = 'none';

            form.action = 'details.php';
            form.method = 'post';

            const field = document.createElement('input');
            field.type = 'hidden';
            field.name = 'name';
            field.value = game.name;

            form.appendChild(field);

            document.body.appendChild(form);
            form.submit();
        });

        gameInner.addEventListener('mouseover', () => {
            document.body.style.cursor = 'pointer';
        });

        gameInner.addEventListener('mouseout', () => {
            document.body.style.cursor = 'auto';
        });
    }
}

/**
 * Reverses the order games are displayed
 */
function reverseOrder() {
    gamesHtml.reverse();
    appendGames();
}

/**
 * Converts a given string to a date object
 * @param str String to be converted
 * @returns {Date} Given string as a date object
 */
function toDateObject(str) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    try {
        const split = str.split(' ');

        // Runs catch code to return a new date of 00/00/0000 if string given is not valid
        if (split.length !== 3) {
            throw '';
        }

        let day = parseInt(split[0]);
        let month = months.indexOf(split[1]) + 1;
        let year = parseInt(split[2]);

        if (month === 0) {
            month = 1;
        }

        return new Date(year, month, day);
    }
    catch {
        return new Date(0, 0, 0);
    }
}

/**
 * Passes alphabetical sort function to sort() method
 */
function sortAlphabetically() {
    sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
}

/**
 * Passes rating sort function to sort() method
 */
function sortRating() {
    sort((m1, m2) => {
        if (m1.metacritic < m2.metacritic) {
            return 1;
        }

        if (m1.metacritic > m2.metacritic) {
            return -1;
        }

        return 0;
    });
}

/**
 * Passes release date sort function to sort() method
 */
function sortReleaseDate() {
    sort((a, b) => {
        const dateA = toDateObject(a.date);
        const dateB = toDateObject(b.date);

        if (dateA < dateB) {
            return -1;
        }

        if (dateA > dateB) {
            return 1;
        }

        return 0;
    });
}

/**
 * Sorts game divs using a given sort function and appends new ordering to page
 * @param sortFunction
 */
function sort(sortFunction) {
    gamesHtml.sort(sortFunction);
    appendGames();
}

/**
 * Appends games to parent
 */
function appendGames() {
    const parent = document.querySelector('#cards');
    parent.innerHTML = '';

    for (const game of gamesHtml) {
        parent.appendChild(game);
    }
}

const sortAlphabeticalLink = document.querySelector('#nav-alphabetical');
sortAlphabeticalLink.addEventListener('click', e => {
    e.preventDefault();
    sortAlphabetically();
});

const sortRatingLink = document.querySelector('#nav-rating');
sortRatingLink.addEventListener('click', e => {
    e.preventDefault();
    sortRating();
});

const sortReleaseDateLink = document.querySelector('#nav-date');
sortReleaseDateLink.addEventListener('click', e => {
    e.preventDefault();
    sortReleaseDate();
});

const sortOrderLink = document.querySelector('#nav-order');
sortOrderLink.addEventListener('click', e => {
    e.preventDefault();
    reverseOrder();
});

addGameOnClick();