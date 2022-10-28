<?php
if (file_exists('catalog.xml')) {
    $games = simplexml_load_file('catalog.xml');
} else {
    exit('Failed to open catalog.xml');
}

$gameName = $_POST["name"];

$gameImage = "";
$game = null;

foreach ($games->children() as $g) {
    if ($g->name == $gameName) {
        $game = $g;
        break;
    }
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
    <link href="stylesheets/main.css" rel="stylesheet">
</head>
<body class="d-flex flex-column min-vh-100">
<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a href="index.php" class="navbar-brand">Games Catalogue</a>
    </div>
</nav>
<main class="container mt-5">
    <div class="row">
        <div class="col-6">
            <div class="card mb-3">
                <img src="<?php echo "$game->boxArt" ?>" alt="<?php echo "$game->name Box Art" ?>" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title"><?php echo $game->name ?></h4>
                    <p class="card-text"><?php echo $game->description ?></p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="me-auto">
                            <div class="fw-bold">Date Released</div>
                            <?php echo $game->date ?>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="me-auto">
                            <div class="fw-bold">Genre</div>
                            <?php echo $game->genre ?>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="me-auto">
                            <div class="fw-bold">Metacriting Rating</div>
                            <?php echo $game->metacritic ?>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-6">
            <?php foreach ($game->reviews->children() as $review): ?>
                <?php
                $color = "high-score";
                $bgColor = "high-score-bg";

                if ($review->score < 70) {
                    $color = "mid-score";
                    $bgColor = "mid-score-bg";
                }

                if ($review->score < 50) {
                    $color = "low-score";
                    $bgColor = "low-score-bg";
                }
                ?>
                <div class="card mb-3">
                    <div class="card-body <?php echo $bgColor ?>">
                        <h5 class="card-title mb-3">
                            <span class="<?php echo $color ?> p-2 rounded"><?php echo $review->score ?></span>
                            &nbsp&nbsp<?php echo $review->reviewer ?>
                        </h5>
                        <div class="card-text"><?php echo $review->body ?></div>
                    </div>
                    <div class="card-footer">
                        <?php echo $review->date ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
<!--    <div class="card mb-3">-->
<!--        <div class="row g-0">-->
<!--            <img src="--><?php //echo "$gameImage"?><!--" class="img-fluid rounded-start" alt "Videogame image">-->
<!--        </div>-->
<!--        <div class="col-md-8">-->
<!--            <div class="card-body">-->
<!--                  <h5 class="card-title"> Card title </h5>-->
<!--                  <p>  Test text    </p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</main>
<footer class="footer bg-dark py-3 mt-auto">
    <div class="container">
        <span class="text-muted">&copy Games Catalogue 2022</span>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>