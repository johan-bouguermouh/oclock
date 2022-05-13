<?php header("Feature-Policy: autoplay *")?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./asset/style.css">
    <script src="./asset/scripts/alarme.js"></script>
    <script src="./asset/scripts/modifyAlarm.js"></script>
    <script src="./asset/scripts/addAlarm.js"></script>
    <script src="./asset/scripts/navigation.js"></script>
    <title>O'clock | Accuiel</title>

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
        <div class="wrappprReveil">
            <button id="buttonGoForm"><i class="fa-solid fa-plus"></i> Ajouer une alarme</button>
            <form class="hidden" action="" methode="GET" id="addAwakening">
                <button id="exitForm"><i class="fa-solid fa-xmark"></i></button>

                <label for="titre">Titre</label>
                <input id="titre" type="text" name="titre">

                <fieldset>
                    <legend for="heure">Heure du réveille:</legend>
                    <div class="comboboxSelectTime">
                        <select aria-label="définir l'heure à laquelle le réveille sonnera" id="heure" name="heure" size="12" value="00">
                            <option value="00">00</option>
                        </select>
                    </div>
                    <label for="minutes">:</label>

                    <div class="comboboxSelectTime">
                        <select aria-label="définir les minutes auxquels le réveille sonnera" id="minutes" name="minutes" size="60" value="00">
                            <option value="00">00</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                <legend for="sonnerie">Choisir votre sonnerie</legend>
                    <select aria-label="sélectionner le type de sonneries lors de l'alerte du réveille" name="sonnerie" id="sonnerie">
                        <option value="default">Par default</option>
                        <option value="harder">harder</option>
                        <option value="zen">zen</option>
                    </select>
                    <button id="playSong"><i class="fa-solid fa-circle-play"></i></button>
                </fieldset>
                
                <fieldset>
                <legend>Récurence</legend>
                <select aria-label="sélectionner la récurence à laquelle le reveille sonnera" name="recurence" id="recurence">
                    <option value="once">Une seul fois</option>
                    <option value="customDate">A une date précise</option>
                    <option value="alwaysWeek">Pendant la semaine</option>
                    <option value="always">tout les jours</option>
                    <option value="customRecursiv">tous les :</option>
                </select>

                <input class="hidden" id="customDate" aria-label="choisir la date en question" name="customDate" type="date" id="meeting-time">

                <select aria-label="sélectionner le jour où le réveille sonnera" class="hidden" name="customRecursiv" id="customRecursiv">
                    <option value="undefined">jour</option>
                    <option value="Mon">Lundi</option>
                    <option value="Tue">Mardi</option>
                    <option value="Wed">Mercredi</option>
                    <option value="Thu">Jeudi</option>
                    <option value="Fri">Vendredi</option>
                    <option value="Sat">Samedi</option>
                    <option value="Sun">dimanche</option>
                </select>
                </fieldset>

                <label for="story">Laisser vous un message :</label>
                <textarea id="story" name="story"
                        rows="5" cols="33" placeholder="Réveille pour.."></textarea>
                <input type="submit" class="submitButton" id="validate" value="Enregistrer">
                
                <div>
                    <!-- <input type="submit" class="secondarybutton hidden" id="modify" value="Modifier"> -->
                    <input type="button" class="submitButton hidden" id="delete" value="Suprimer">
                </div>

            </form>
            <ul id="listAlarm">
            </ul>
            
            <button id="deletAllAlarm">Tout supprimer</button>
        </div>
    </main>
</body>
</html>