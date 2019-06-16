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
      debugger;
      break;  
    default:
      break;
  }
}

let level1 = new Level({ //создание уровня. Настройки передаются как объект
  time: 20000,
  enemyFrequencyOccurrence: 2000,
  enemyFrequencyShooting: 1000,
  enemyShipHealth: 300,
  enemyBulletDamage: 50,
  enemySpeed: 2,
  enemyBulletSpeed: -10,
  enemyBackGroundURL: "./images/enemy.png",

  bigEnemyyFrequencyShooting: 1000,
  bigEnemyShipHealth: 1000,
  bigEnemyBackGroundURL: "./images/Enemy-removebg.png",
  bigEnemySpeed: 5,  
  bigEnemyBulletDamage: 100,
  bigEnemyBulletSpeed: -20,
});



let playerShip = level1.makeShip({//создание корабля игрока. Настройки передаются как объект
  type: "PlayerShip",
  backGroundURL: "./images/MainShip.png",
  playerShipHealth: 1000,
  playerBulletDamage: 100,
  playerBulletSpeed: 20,
  speed: 30
});