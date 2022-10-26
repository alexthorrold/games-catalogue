<?php
if (file_exists('catalog.xml')) {
    $games = simplexml_load_file('catalog.xml');
} else {
    exit('Failed to open catalog.xml');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Catalog of Videogames">
    <meta name="keywords" content="Video games, catalog, rating">
    <meta name="author" content="Sam Evans, Alex Thorrold, Logan Ogle">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Videogame Catalog</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body class="d-flex flex-column min-vh-100">
<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand">Games Catalogue</a>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a id="nav-alphabetical" class="nav-link" href="#">Sort Alphabetically</a>
            </li>
            <li class="nav-item">
                <a id="nav-rating" class="nav-link" href="#">Sort by Rating</a>
            </li>
            </ul>
        </div>
        <form class="d-flex" role="search">
        <input id="game-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        </form>
    </div>
</nav>
<main class="container mt-5">
    <div id="cards" class="row">
        <?php foreach ($games->children() as $game): ?>
            <div id="<?php echo "$game->name" ?>" class="col-3 mb-3 game-card">
                <div class="card h-100">
                    <img src="<?php echo "$game->boxArt"?>" alt="Game Art" class="card-img-top h-100">
                    <div class="card-body">
                        <h4 class="card-title"><?php echo "$game->name" ?></h4>
                        <p class="card-text">Date Released: <?php echo "$game->date" ?></p>
                        <p class="card-text">Genre: <?php echo "$game->genre" ?></p>
                        <p class="card-text">Metacritic Rating: <?php echo "$game->metacritic" ?></p>
                        <p class="d-none game-name"><?php echo "$game->name" ?><p>
                    </div>
                </div>
            </div>
        <?php endforeach ?>
    </div>
</main>
<footer class="footer bg-dark py-3 mt-auto">
    <div class="container">
        <span class="text-muted">&copy Games Catalogue 2022</span>
    </div>
</footer>

  <button> <a href="details.php"> details.php </a></button>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
<script src="scripts/app.js" type="text/javascript"></script>
</body>
</html>