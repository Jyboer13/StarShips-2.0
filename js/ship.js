class PlayerShip{
	constructor(ship) {
		this._makeShip(ship);
	}

	_makeShip(ship){
		this.element = document.createElement('div');
    this.element.setAttribute("health", ship.playerShipHealth);
    this.element.classList.add("playerShip");
    this.element.focus();
    this.element.style.backgroundImage = `url(${ship.backGroundURL})`;
    
    let playerShipHealthLine = document.createElement('progress');
    playerShipHealthLine.setAttribute('value', ship.playerShipHealth);
    playerShipHealthLine.setAttribute('max', ship.playerShipHealth);
    this.element.appendChild(playerShipHealthLine);

    mainWindow.appendChild(this.element);
    this.speed = ship.speed;
    this.bulletSpeed = ship.playerBulletSpeed;
    this.bulletDamage = ship.playerBulletDamage;  
	}

  shipMove(direction){
    let currentCords = this.element.getBoundingClientRect();    
    switch (direction) {
      case 'left':
        let currentLeft = currentCords.left;
        if (currentLeft <= -100) return;
        this.element.style.left = currentLeft - this.speed + 'px';
        break;
      case 'right':
        let currentRight = currentCords.left;
        if (currentRight >= document.documentElement.clientWidth) return;
        this.element.style.left = currentRight + this.speed + 'px';
        break;	
      default:
        break;
    }
  }
  shipShot(){
    let shipBullet = new Bullet(this.element);    
    shipBullet.damage = this.bulletDamage;
    shipBullet.speed = this.bulletSpeed;
    for (let i = 0; i < mainWindow.children.length; i++) {
      if (mainWindow.children[i].classList.contains("bigEnemyShip")) {
        shipBullet.bulletFly("bigEnemyShip");
        return;
      }      
    }
    shipBullet.bulletFly("enemyShip");
    return shipBullet;
  }
}

