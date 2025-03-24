let scene, camera, renderer;
let sun, space;
let ListPlanets = [], ListPlanets2 = [], ListSatellites = [], ListAsteroids = [], ListAsteroids2 = [];
let mercure, Mercure, venus, Venus, earth, Earth, moon, Moon, mars, Mars,
    jupiter, Jupiter, io, Io, callisto, Callisto, ganymede, Ganymede, europa, Europa,
    saturne, Saturne, uranus, Uranus, neptune, Neptune;
let counter = 0, portion = 0;
let cameraTarget = new THREE.Vector3(0, 0, 0);
let cameraPosition = new THREE.Vector3(0, 45, 600); //On définit la position de la caméra dans l'espace
let cameraSpeed = 0;
let dateSaisie, running;
var currentIndex = 13;
var run = true;
var runTimeSpeedOutput = document.getElementById("runTimeSpeed");

function pauseAnimation() {
    run = false;
}

function startAnimation() {
    run = true;
}

function resetAnimation() {
    run = false;
    counter = 0;
    currentIndex = 13;
}


var TimeSpeed = [];
TimeSpeed[0] =  [-1, 0, 0, 0, 0, 0];
TimeSpeed[1] =  [0, -3, 0, 0, 0, 0];
TimeSpeed[2] =  [0, -1, 0, 0, 0, 0];
TimeSpeed[3] =  [0, 0, -7, 0, 0, 0];
TimeSpeed[4] =  [0, 0, -2, 0, 0, 0];
TimeSpeed[5] =  [0, 0, -1, 0, 0, 0];

TimeSpeed[6] =  [0, 0, 0, 6, 0, 0];
TimeSpeed[7] =  [0, 0, 0, 3, 0, 0];
TimeSpeed[8] =  [0, 0, 0, 1, 0, 0];
TimeSpeed[9] =  [0, 0, 0, 0, -30, 0];
TimeSpeed[10] = [0, 0, 0, 0, -15, 0];
TimeSpeed[11] = [0, 0, 0, 0, -1, 0];
TimeSpeed[12] = [0, 0, 0, 0, 0, -1];

TimeSpeed[13] = [0, 0, 0, 0, 0, 1];
TimeSpeed[14] = [0, 0, 0, 0, 1, 0];
TimeSpeed[15] = [0, 0, 0, 0, 15, 0];
TimeSpeed[16] = [0, 0, 0, 0, 30, 0];
TimeSpeed[17] = [0, 0, 0 , 1, 0, 0];
TimeSpeed[18] = [0, 0, 0 , 3, 0, 0];
TimeSpeed[19] = [0, 0, 0 , 6, 0, 0];

TimeSpeed[20] = [0, 0, 1 , 0, 0, 0];
TimeSpeed[21] = [0, 0, 2 , 0, 0, 0];
TimeSpeed[22] = [0, 0, 7 , 0, 0, 0];
TimeSpeed[23] = [0, 1, 0 , 0, 0, 0];
TimeSpeed[24] = [0, 3, 0 , 0, 0, 0];
TimeSpeed[25] = [1, 0, 0 , 0, 0, 0];


var TimeSpeedx = [];
TimeSpeedx[0] = "x -1 an/s";
TimeSpeedx[1] = "x -3 mois/s";
TimeSpeedx[2] = "x -1 mois/s";
TimeSpeedx[3] = "x -1 semaine/s";
TimeSpeedx[4] = "x -2 jours/s";
TimeSpeedx[5] = "x -1 jour/s";

TimeSpeedx[6] = "x -6 heures/s";
TimeSpeedx[7] = "x -3 heures/s";
TimeSpeedx[8] = "x -1 heure/s";
TimeSpeedx[9] = "x -30 minutes/s";
TimeSpeedx[10] = "x -15 minutes/s";
TimeSpeedx[11] = "x -1 minute/s";
TimeSpeedx[12] = "x -1 seconde";

TimeSpeedx[13] = "Temps réel";
TimeSpeedx[14] = "x 1 minute/s";
TimeSpeedx[15] = "x 15 minutes/s";
TimeSpeedx[16] = "x 30 minutes/s";
TimeSpeedx[17] = "x 1 heure/s";
TimeSpeedx[18] = "x 3 heures/s";
TimeSpeedx[19] = "x 6 heures/s";

TimeSpeedx[20] = "x 1 jour/s";
TimeSpeedx[21] = "x 2 jours/s";
TimeSpeedx[22] = "x 1 semaine/s";
TimeSpeedx[23] = "x 1 mois/s";
TimeSpeedx[24] = "x 3 mois/s";
TimeSpeedx[25] = "x 1 an/s";


function TimeSpeedDown() {
    if (currentIndex > 0) { currentIndex--; }
}

function TimeSpeedUp() {
    if (currentIndex < 25) { currentIndex++; }
}

function toggleMenu() {
    var encadre = document.getElementById("encadre");
    var toggleBtn = document.getElementById("toggleBtn");

    if (encadre.style.display === "none") {
        encadre.style.display = "block";
        toggleBtn.textContent = "-";
    } else {
        encadre.style.display = "none";
        toggleBtn.textContent = "+";
    }
}

function soumettreInformations() {
    var annee = document.getElementById("annee").value;
    var jour = document.getElementById("jour").value;
    var mois = document.getElementById("mois").value;
    dateSaisie = mois + ' ' + jour + ', ' + annee;
    run = false;
    counter = 0;
    currentIndex = 6;
}

function updateJours() {
    var mois = document.getElementById("mois").value;
    var jourMenu = document.getElementById("jour");
    jourMenu.innerHTML = "";

    var joursDansMois = 31;

    if (mois === "Février") {
        joursDansMois = 28;
    } else if (mois === "Avril" || mois === "Juin" || mois === "Septembre" || mois === "Novembre") {
        joursDansMois = 30;
    }
    for (var i = 1; i <= joursDansMois; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        jourMenu.appendChild(option);
    }
}

function RealTime() {
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Les mois commencent à 0, donc nous ajoutons 1 pour obtenir le mois actuel
    const day = currentDate.getDate();

    dateSaisie = `${month} ${day}, ${year}`;
    run = true;
    currentIndex = 6;
}

init();
animate();