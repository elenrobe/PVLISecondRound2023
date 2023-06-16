import Wall from './walls.js';
import Ball from './ball.js';
import Player from './player.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('Wall', './resources/Wall.png');
    this.load.image('ball', './resources/ball.png');
  }

  create() {
    new Wall(this, 0, 775, 'Wall', 2800,75);
    new Wall(this, 0, 25, 'Wall', 2800,75);
    new Wall(this, 1400, 25, 'Wall', 75,1600);
    new Wall(this, 0, 75, 'Wall', 75,1600);

    this.firstBall = new Ball(this , 500 , 500, 'ball', 150,Phaser.Math.Between(-20,20),Phaser.Math.Between(-20,20),2);
    this.collisionsLeft = 7;


    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on('down',()=>{
      if(this.seconds < 0 )this.scene.restart('main');
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, 800, 600, 'Wall', this.cursors);

    //Tiempo
    this.seconds = 30;
    this.time.addEvent({ delay: 1000, callback: this.updateCounter, callbackScope: this, loop: true });

    //Texto
    this.newText = this.add.text(200, this.cameras.main.y + 10,'Quedan ' + this.collisionsLeft + ' y ' + this.seconds + ' segundos.', { fontFamily: 'Arial', fontSize: 45, color: '#ffffff ' });

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

    if(bodyB.gameObject !== null  && bodyA.gameObject !== null && ((bodyB.gameObject.body.label === 'ball' && bodyA.gameObject.body.label === 'player')||(bodyA.gameObject.body.label === 'ball' && bodyB.gameObject.body.label === 'player'))){
        this.collisionsLeft--;
        console.log(this.collisionsLeft);
        this.newText.setText('Quedan ' + this.collisionsLeft + ' y ' + this.seconds + ' segundos.');

        if(bodyA.gameObject.body.label === 'ball' ){

          console.log(bodyA.gameObject);
          let Newsize = bodyA.gameObject.returnSize()/2;
          let CollisionsLeft = bodyA.gameObject.returnDestructions() -1;
              
          if(CollisionsLeft >= 0){
            new Ball(this, bodyA.gameObject.x, bodyA.gameObject.y,'ball', Newsize,Phaser.Math.Between(-20,20), 
            Phaser.Math.Between(-20,20), CollisionsLeft);
            new Ball(this, bodyA.gameObject.x, bodyA.gameObject.y,'ball', Newsize,Phaser.Math.Between(-20,20), 
            Phaser.Math.Between(-20,20), CollisionsLeft);}
            bodyA.gameObject.destroy();
          }

        else{
          let Newsize = bodyB.gameObject.returnSize()/2;
          let CollisionsLeft =bodyB.gameObject.returnDestructions() -1;

          if(CollisionsLeft >= 0){
            console.log('a');
            new Ball(this, bodyB.gameObject.x, bodyB.gameObject.y,'ball', Newsize,Phaser.Math.Between(-20,20), 
            Phaser.Math.Between(-20,20), CollisionsLeft);
            new Ball(this, bodyB.gameObject.x, bodyB.gameObject.y,'ball', Newsize,Phaser.Math.Between(-20,20), 
            Phaser.Math.Between(-20,20), CollisionsLeft);}
            bodyB.gameObject.destroy();
          }
        }
    }, this);
  }

  updateCounter(){
    this.seconds--;
    if(this.seconds <= 0 ){
      this.matter.world.enabled = false;
      this.collisionText(0);
    }
    else this.collisionText(this.seconds);
  }

  collisionText(seconds){
    this.newText.setText('Quedan ' + this.collisionsLeft + ' y ' + seconds + ' segundos.');
  }

  update(time, delta) {    
  }
}