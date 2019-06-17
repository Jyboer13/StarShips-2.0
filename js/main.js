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
  time: 7000,
  enemyFrequencyOccurrence: 1500,
  enemyFrequencyShooting: 1000,
  enemyShipHealth: 300,
  enemyBulletDamage: 50,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy.png",

  bigEnemyyFrequencyShooting: 300,
  bigEnemyShipHealth: 1000,
  bigEnemyBackGroundURL: "./images/Enemy-removebg.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 400,
  bigEnemyBulletSpeed: -20,
}

let level2 = { //создание уровня. Настройки передаются как объект
  time: 5000,
  enemyFrequencyOccurrence: 1500,
  enemyFrequencyShooting: 1000,
  enemyShipHealth: 300,
  enemyBulletDamage: 50,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy2.png",

  bigEnemyyFrequencyShooting: 300,
  bigEnemyShipHealth: 1000,
  bigEnemyBackGroundURL: "./images/Enemy-removebg.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 100,
  bigEnemyBulletSpeed: -20,
}

let level3 = { //создание уровня. Настройки передаются как объект
  time: 10000,
  enemyFrequencyOccurrence: 1500,
  enemyFrequencyShooting: 1000,
  enemyShipHealth: 300,
  enemyBulletDamage: 50,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy3.png",

  bigEnemyyFrequencyShooting: 200,
  bigEnemyShipHealth: 1000,
  bigEnemyBackGroundURL: "./images/enemy4.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 100,
  bigEnemyBulletSpeed: -20,
}

let levelsList = [level1, level2, level3];


let currentLevel;
let currentLevelNumber = 1;

let makeNewLevelCallBack = ()=>{
  currentLevelNumber++;
  makeNewLevel(levelsList[currentLevelNumber - 1]);
}

let makeNewLevel = (newLevel)=>{
  currentLevel = new Level(newLevel, makeNewLevelCallBack);
}

makeNewLevel(level1);




let playerShip = currentLevel.makeShip({//создание корабля игрока. Настройки передаются как объект
  type: "PlayerShip",
  backGroundURL: "./images/MainShip.png",
  playerShipHealth: 1000,
  playerBulletDamage: 100,
  playerBulletSpeed: 20,
  speed: 30
});