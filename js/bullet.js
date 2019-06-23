let Score = document.getElementById('info').children[0].children[1];

class Bullet{
  constructor(ship) {
    this.parentShip = ship;
    
    this.makeBullet(this.parentShip);    
  }
  makeBullet(parentShip){
    let parentShipCoords = parentShip.getBoundingClientRect();
    this.bulletElement = document.createElement('div');
    this.bulletElement.style.width = 5 + 'px';
    this.bulletElement.style.height = 20 + 'px';
    this.bulletElement.style.position = 'absolute';
    this.bulletElement.style.left = parentShipCoords.left + (this.parentShip.clientWidth / 2 - this.bulletElement.clientWidth / 2) + 'px';
    mainWindow.appendChild(this.bulletElement);
    
    switch (this.parentShip.className) {
      case "playerShip":        
        this.bulletElement.style.backgroundColor = "green";
        this.bulletElement.style.top = parentShipCoords.top + 'px';
        break;
      case "enemyShip":        
        this.bulletElement.style.backgroundColor = "red";
        this.bulletElement.style.top = parentShipCoords.bottom + 'px';
        break;
      case "bigEnemyShip":        
        this.bulletElement.style.backgroundColor = "red";
        this.bulletElement.style.top = parentShipCoords.bottom + 'px';
        this.bulletElement.style.width = 20 + 'px';
        this.bulletElement.style.height = 50 + 'px';
        break;     
      default:
        break;
    }
  }
  bulletFly(myEnemyClass){
    let bulletMoveTime = setInterval(()=>{
      let bulletCords = this.bulletElement.getBoundingClientRect();
      let enemies = document.getElementsByClassName(myEnemyClass);     

      if (myEnemyClass == "enemyShip" || myEnemyClass == "bigEnemyShip") {        
        for (let i = 0; i < enemies.length; i++) {  
          
          if (enemies[i].getBoundingClientRect().bottom >= bulletCords.top && 
            enemies[i].getBoundingClientRect().left <= bulletCords.left && 
            enemies[i].getBoundingClientRect().right >= bulletCords.right)
          { 
						enemies[i].setAttribute("enemyHealth", enemies[i].getAttribute("enemyHealth") - playerShip.bulletDamage);
						enemies[i].firstChild.setAttribute("value", enemies[i].getAttribute("enemyHealth"));
            if(enemies[i].getAttribute("enemyHealth") <= 0){
              enemies[i].setAttribute("removed", true);
              let currentScore = +Score.innerHTML;
              Score.innerHTML = currentScore + +enemies[i].getAttribute("enemyScroreWeight");
              enemies[i].remove();
            }
            this.bulletElement.remove();
            clearInterval(bulletMoveTime);
            return;
          }
        }
      }

      if (myEnemyClass == "playerShip") {
        for (let i = 0; i < enemies.length; i++) {    
          if (enemies[i].getBoundingClientRect().top <= bulletCords.bottom && 
            enemies[i].getBoundingClientRect().left <= bulletCords.left && 
            enemies[i].getBoundingClientRect().right >= bulletCords.right)
          {            
            enemies[i].setAttribute("health", enemies[i].getAttribute("health") - this.damage);
            enemies[i].firstChild.setAttribute("value", enemies[i].getAttribute("health"));
            if(enemies[i].getAttribute("health") <= 0){
              enemies[i].setAttribute("removed", true);
              confirm('Вы проиграли. \n Начать заново(OK) или закрыть окно с игрой(Cancel/Отменна)?') ? window.location.reload() : window.close();
              enemies[i].remove();
              return;              
            }
            if(this.parentShip.removed) clearInterval(bulletMoveTime);    
            this.bulletElement.remove();
            clearInterval(bulletMoveTime);
            return;
          }
        }
      }
      
			if(bulletCords.top <= 0 && myEnemyClass == "enemyShip" || 
			bulletCords.top >= document.body.clientHeight && myEnemyClass == "playerShip" ||
			bulletCords.top <= 0 && myEnemyClass == "bigEnemyShip"
			) {
        if(this.parentShip.removed) clearInterval(bulletMoveTime);
        this.bulletElement.remove();
        clearInterval(bulletMoveTime);
      }

      this.bulletElement.style.top = bulletCords.top - this.speed + 'px';
      
    }, 17);
  }
}
