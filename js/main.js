document.onkeydown = (event)=>{ //управление кораблем игрока. Движение влево, вправо, стрельба.
  switch (event.keyCode) {
    case 37:
      playerShip.shipMove('left');
      break;
    case 39:
      playerShip.shipMove('right');
      break;
    case 38:
      playerShip.shipShot();
      break;  
    default:
      break;
  }
}

let level1 = { //создание уровня. Настройки передаются как объект
  time: 20000,
  enemyFrequencyOccurrence: 1500,
  enemyFrequencyShooting: 1000,
  enemyShipHealth: 300,
  enemyBulletDamage: 50,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy.png",

  bigEnemyyFrequencyShooting: 300,
  bigEnemyShipHealth: 5000,
  bigEnemyBackGroundURL: "./images/Enemy-removebg.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 400,
  bigEnemyBulletSpeed: -20,
}

let level2 = { //создание уровня. Настройки передаются как объект
  time: 25000,
  enemyFrequencyOccurrence: 1200,
  enemyFrequencyShooting: 750,
  enemyShipHealth: 400,
  enemyBulletDamage: 100,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy2.png",

  bigEnemyyFrequencyShooting: 300,
  bigEnemyShipHealth: 7500,
  bigEnemyBackGroundURL: "./images/Enemy-removebg.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 600,
  bigEnemyBulletSpeed: -25,
}

let level3 = { //создание уровня. Настройки передаются как объект
  time: 30000,
  enemyFrequencyOccurrence: 1000,
  enemyFrequencyShooting: 500,
  enemyShipHealth: 600,
  enemyBulletDamage: 150,
  enemySpeed: 3,
  enemyBulletSpeed: -13,
  enemyBackGroundURL: "./images/enemy3.png",

  bigEnemyyFrequencyShooting: 150,
  bigEnemyShipHealth: 10000,
  bigEnemyBackGroundURL: "./images/enemy4.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 800,
  bigEnemyBulletSpeed: -30,
}

let levelsList = [level1, level2, level3];
let playerShip;
let currentLevelScore = document.getElementById('info').children[1].children[1];

let currentLevel;
let currentLevelNumber = 1;
currentLevelScore.innerHTML = currentLevelNumber;

let makeNewLevelCallBack = ()=>{
  currentLevelNumber++;
  makeNewLevel(levelsList[currentLevelNumber - 1]);
  currentLevelScore.innerHTML = currentLevelNumber;
}

let makeNewLevel = (newLevel)=>{
  currentLevel = new Level(newLevel, makeNewLevelCallBack);
}

let startGame = ()=>{
  makeNewLevel(level1);
  start.style.display = 'none';
  playerShip = currentLevel.makeShip({//создание корабля игрока. Настройки передаются как объект
    type: "PlayerShip",
    backGroundURL: "./images/MainShip.png",
    playerShipHealth: 1000,
    playerBulletDamage: 100,
    playerBulletSpeed: 20,
    speed: 30
  });
}

let start = document.getElementById('start');

start.addEventListener('click', startGame);