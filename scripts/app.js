let gameSearch = document.querySelector('#game-search');
let gamesHtml = document.querySelector('#cards').children;
gamesHtml = Array.prototype.slice.call(gamesHtml, 0);

for (const game of gamesHtml) {
    game.name = game.querySelector(`#${game.id}-name`).innerText;
    game.date = game.querySelector(`#${game.id}-date`).innerText;
    game.genre = game.querySelector(`#${game.id}-genre`).innerText;
    game.metacritic = parseInt(game.querySelector(`#${game.id}-rating`).innerText);
}

gameSearch.addEventListener('input', () => {
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

function addGameOnClick() {
    for (const game of gamesHtml) {
        const gameInner = game.querySelector('.card');

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

function reverseOrder() {
    gamesHtml.reverse();
    appendGames();
}

function toDateObject(str) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    try {
        const split = str.split(' ');

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

function sort(sortFunction) {
    gamesHtml.sort(sortFunction);
    appendGames();
}

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