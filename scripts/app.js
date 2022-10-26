let gameSearch = document.querySelector('#game-search');
let gamesHtml = document.querySelectorAll('.game-card');

let games;

const request = new XMLHttpRequest();

request.onload =  function() {
    games = JSON.parse(this.responseText).videogame;
}

request.open('get', 'get-games.php', true);
request.send();

gameSearch.addEventListener('input', () => {
    if (gameSearch.value === '') {
        for (const game of gamesHtml) {
            game.style.display = 'block';
        }
        return;
    }

    for (const game of gamesHtml) {
        if (game.id.toLowerCase().includes(gameSearch.value.toLowerCase())) {
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
            field.value = game.id;

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

function sortAlphabetically() {
    games.sort(function(a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if(nameA < nameB){return -1;}
        if(nameA > nameB){return 1;}
        return 0;
    });

    sort();
}

function sortRating() {
    games.sort((m1, m2) => (m1.metacritic < m2.metacritic) ? 1 : (m1.metacritic > m2.metacritic) ? -1 : 0);

    sort();
}

function sort () {
    let inner = '';

    for (const game of games) {
        const card = document.createElement('div');
        card.className = 'col-3 mb-3 game-card';

        inner += `
            <div id="${game.name}" class="col-3 mb-3 game-card">
                <div class="card h-100">
                    <img src="${game.boxArt}" alt="Game Art" class="card-img-top h-100">
                    <div class="card-body"><h4 class="card-title">${game.name}</h4>
                        <p class="card-text">Date Released: ${game.date}</p>
                        <p class="card-text">Genre: ${game.genre}</p>
                        <p class="card-text">Metacritic Rating: ${game.metacritic}</p>
                        <p class="d-none game-name">${game.name}<p>
                    </div>
                </div>
            </div>`;
    }

    const cards = document.querySelector('#cards');
    cards.innerHTML = inner;

    gamesHtml = document.querySelectorAll('.game-card');
    addGameOnClick();
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

addGameOnClick();