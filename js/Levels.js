const mainWindow = document.getElementById('main');//блок, в котором происходят все действия игры

randomInteger = (min, max) => { //функция получения случайных целых чисел
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

class Level { //главный класс игры - уорвень. С помощью него создаются новые уровни с помощью описания их настроек в аргументе "levelSettings"
  constructor(levelSettings, makeNewLevelCallBack) {

    this._makeNewLevelCallBack = makeNewLevelCallBack;


    this._time = levelSettings.time; //время всего уровня - до вылета главного большого противника

    this._enemyFrequencyOccurrence = levelSettings.enemyFrequencyOccurrence; //частота появления противников 
    this._enemyFrequencyShooting = levelSettings.enemyFrequencyShooting; //частота стрельбы противников 

    this._enemyShipHealth = levelSettings.enemyShipHealth; //значение "здоровья" противников 
    this._enemySpeed = levelSettings.enemySpeed; //значение скорости противников 
    this._enemyScroreWeight = this._enemyShipHealth; //значение "цены" очков за уничтожение противника

    this._enemyBulletDamage = levelSettings.enemyBulletDamage; //значение урона пули противников
    this._enemyBulletSpeed = levelSettings.enemyBulletSpeed;  //значение скорости пули противников
    this._enemyBackGroundURL = levelSettings.enemyBackGroundURL; //изображение противника

    /////////////////////////////////////////////Большой Противник////////////////////////////////////////////////////////////////

    this._bigEnemyyFrequencyShooting = levelSettings.bigEnemyyFrequencyShooting;
    this._bigEnemyShipHealth = levelSettings.bigEnemyShipHealth;
    this._bigEnemyScroreWeight = this._bigEnemyShipHealth;

    this._bigEnemyBackGroundURL = levelSettings.bigEnemyBackGroundURL;
    this._bigEnemySpeed = levelSettings.bigEnemySpeed;

    this._bigEnemyBulletDamage = levelSettings.bigEnemyBulletDamage;
    this._bigEnemyBulletSpeed = levelSettings.bigEnemyBulletSpeed;

    let enemiesTime = setInterval(() => { //постоянное появление противников с частотой, заданной заранее
      this._makeEnemyShip();
    }, this._enemyFrequencyOccurrence);

    setTimeout(() => {//ограничение времени появления противников
      clearInterval(enemiesTime);      
    }, this._time);
    setTimeout(this._makeBigEnemyShip.bind(this),this._time + 5000);
  }
  
  makeShip(ship) { //создание корабля игрока. Метод общедоступный и вызывается единажды
    return this._makePlayerShip(ship);
  }
  _makePlayerShip(ship) {
    let playerShip = new PlayerShip(ship); //создание корабля игрока с помощью отдельного класса
    return playerShip;
  }

  _makeEnemyShip() { // создание кораблей противников 
    let enemyShip = {};
    enemyShip.element = document.createElement('div');
    enemyShip.element.classList.add("enemyShip");
    enemyShip.element.style.backgroundImage = `url(${this._enemyBackGroundURL})`;
    enemyShip.element.style.left = randomInteger(0, mainWindow.clientWidth - 100) + 'px';
    enemyShip.element.setAttribute("enemyHealth", this._enemyShipHealth);
    enemyShip.element.setAttribute("enemyScroreWeight", this._enemyScroreWeight);
    mainWindow.appendChild(enemyShip.element);
    this._enemyMoving(enemyShip);

    let enemyShipHealthLine = document.createElement('progress');
    enemyShipHealthLine.setAttribute('value', this._enemyShipHealth);
    enemyShipHealthLine.setAttribute('max', this._enemyShipHealth);
    enemyShip.element.appendChild(enemyShipHealthLine);

    let enemyShootimg = () => { //один выстрел противника 
      enemyShip.enemyBullet = new Bullet(enemyShip.element); // создание пуль противников отдельным классом 
      enemyShip.enemyBullet.speed = this._enemyBulletSpeed;
      enemyShip.enemyBullet.damage = this._enemyBulletDamage;
      enemyShip.enemyBullet.bulletFly("playerShip");
    }

    let _enemiesShootingTime = setInterval(() => { //постоянная сттрельба противников 
      if (enemyShip.element.getAttribute("removed")) { 
        clearInterval(_enemiesShootingTime);
        return;
      }
      enemyShootimg();
    }, 1000);
  }

  _enemyMoving(enemy) { //движение противника вниз
    let enemyMovingTime = setInterval(() => { //постоянное движение противника вниз
      let enemyTopCoords = enemy.element.getBoundingClientRect();      
      let playerShipCoords = playerShip.element.getBoundingClientRect();      

      if (
        playerShipCoords.top <= enemyTopCoords.bottom && //проверка на сближение кораблей игрока и противника
        Math.abs(playerShipCoords.left - enemyTopCoords.left) <= enemy.element.clientWidth &&  
        Math.abs(playerShipCoords.right - enemyTopCoords.right) <= enemy.element.clientWidth
        ) 
      {
        playerShip.element.setAttribute('health', playerShip.element.getAttribute('health') - enemy.element.getAttribute("enemyHealth")); // нанесение урона кораблю игрока при столкновении
        playerShip.element.firstChild.setAttribute("value", playerShip.element.getAttribute("health"));
        let currentScore = +Score.innerHTML;
        Score.innerHTML = currentScore + +enemy.element.getAttribute("enemyScroreWeight");
        enemy.element.setAttribute("removed", true); // уничтожение корабля противника при столкновении
        enemy.element.remove();
        
        return;
      }

      if (enemyTopCoords.top >= document.body.clientHeight - 100) { //выход противника за пределы экрана
        clearInterval(enemyMovingTime);
        enemy.element.setAttribute("removed", true);
        // enemy.removed = true;
        enemy.element.remove();
        return false;
      }
      enemy.element.style.top = enemyTopCoords.top + this._enemySpeed + 'px';
    }, 17);
  }

  _makeBigEnemyShip(){
    let bigEnemyShip = {};
    bigEnemyShip.element = document.createElement('div');
    bigEnemyShip.element.classList.add("bigEnemyShip");
    bigEnemyShip.element.style.backgroundImage = `url(${this._bigEnemyBackGroundURL})`;
    bigEnemyShip.element.setAttribute("enemyHealth", this._bigEnemyShipHealth);
    bigEnemyShip.element.setAttribute("enemyScroreWeight", this._bigEnemyShipHealth);
    mainWindow.appendChild(bigEnemyShip.element);

    let enemyShipHealthLine = document.createElement('progress');
    enemyShipHealthLine.setAttribute('value', this._bigEnemyShipHealth);
    enemyShipHealthLine.setAttribute('max', this._bigEnemyShipHealth);
    bigEnemyShip.element.appendChild(enemyShipHealthLine);

    let bigEnemyShootimg = () => { //один выстрел противника 
      bigEnemyShip.bigEnemyBullet = new Bullet(bigEnemyShip.element); // создание пуль противников отдельным классом 
      bigEnemyShip.bigEnemyBullet.speed = this._bigEnemyBulletSpeed;
      bigEnemyShip.bigEnemyBullet.damage = this._bigEnemyBulletDamage;
      bigEnemyShip.bigEnemyBullet.bulletFly("playerShip");
    }

    let _enemiesShootingTime = setInterval(() => { //постоянная сттрельба противников 
      if (bigEnemyShip.element.getAttribute("removed")) { 
        clearInterval(_enemiesShootingTime);
        this._makeNewLevelCallBack();
        return;
      }
      bigEnemyShootimg();
    }, this._bigEnemyyFrequencyShooting);

    let bigEnemyMoveDown = ()=>{
      let bigEnemyCoordsTop = parseInt(getComputedStyle(bigEnemyShip.element).top);
      if(bigEnemyCoordsTop >= 100) clearInterval(bigEnemyMoveDownTime);
      bigEnemyShip.element.style.top = bigEnemyCoordsTop + 5 + 'px';

    }

    let bigEnemyMoveDownTime = setInterval(()=>{
      bigEnemyMoveDown();
    }, 17);

    let bigEnemyContinueMove = ()=> {
      let left;
      let right;
    
      let moveRight = ()=> {
        let bigEnemyCoordsLeft = bigEnemyShip.element.getBoundingClientRect().left;
    
        if (bigEnemyCoordsLeft > mainWindow.clientWidth){
          clearInterval(right);
          left = setInterval(()=> {
            moveLeft();
          }, 17);
          return;
        } 
    
        bigEnemyShip.element.style.left = bigEnemyCoordsLeft + this._bigEnemySpeed + 'px';
      }
    
      let moveLeft = ()=> {
        let bigEnemyCoordsLeft = bigEnemyShip.element.getBoundingClientRect().left;
    
        if (bigEnemyCoordsLeft < -200){
          clearInterval(left);
          right = setInterval(()=> {
            moveRight()
          }, 17);
          return;
        } 
    
        bigEnemyShip.element.style.left = bigEnemyCoordsLeft - this._bigEnemySpeed + 'px';
      }
    
      right = setInterval(()=> {
        moveRight()
      }, 17);
    }

    bigEnemyContinueMove()
  }
}