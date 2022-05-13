<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./asset/style.css">
    <script src="./asset/scripts/timer.js"></script>
    <script src="./asset/scripts/navigation.js"></script>
    <title>O'clock | chrono</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="home.php"><?php require "./asset/images/icon_horloge.svg"?><span class="navFullChar">Horloge</span></a></li>
                <li><a href="reveil.php"><?php require "./asset/images/icon_reveil.svg" ?><span class="navFullChar">Reveil</span></a></li>
                <li><a href="chrono.php"><?php require "./asset/images/icon_timer.svg"?><span class="navFullChar">Minuteur</span></a></li>
                <li><a href="timer.php"><?php require "./asset/images/icon_chrono.svg" ?><span class="navFullChar">Chrono</span></a></li>
                
            </ul>
        </nav>
    </header>
    <main>
        <section class="round">
        <p>00:00:00:000</p>
            <ul></ul>
        </section>
        <section class="commande timerCommande">
            <button id="play"><i class="fas fa-play"></i></button>
            <button id="register"><i class="fas fa-flag"></i></button>
            <button type="submit" id="redo"><i class="fas fa-redo"></i></button>
        </section>
    </main>
</body>
</html>