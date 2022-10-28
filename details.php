<?php
if (file_exists('catalog.xml')) {
    $games = simplexml_load_file('catalog.xml');
} else {
    exit('Failed to open catalog.xml');
}

$gameName = $_POST["name"];


$gameImage = "";
$game = null;

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
        <a href="index.php" class="navbar-brand">Games Catalogue</a>
    </div>
</nav>
<main class="container mt-5">
    <div class="card mb-3">
        <div class="row g-0">
            <img src="<?php echo "$gameImage"?>" class="img-fluid rounded-start" alt "Videogame image">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                  <h5 class="card-title"> Card title </h5>
                  <p>  Test text    </p>
                </div>
            </div>
        </div>
    </div>
</main>
<footer class="footer bg-dark py-3 mt-auto">
    <div class="container">
        <span class="text-muted">&copy Games Catalogue 2022</span>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
<script src="scripts/app.js" type="text/javascript"></script>
</body>
</html>