import Object from './object.js';

export default class TorusScene extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'torusscene' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    this.rect = new Phaser.GameObjects.Rectangle(this, 0, 0, 50, 1000, 0xff0000);
    this.add.existing(this.rect);
    this.physics.add.existing(this.rect);
    this.rect.body.setCollideWorldBounds();

    this.object = new Object(this, 400, 200);

    this.physics.add.collider(this.rect, this.object, this.collisionCallback);  
  }

  collisionCallback(ob1, ob2)
  {
    console.log("hit wall");
    ob2.body.x = ob1.scene.scale.width;  
    ob2.body.velocity.set(-100, 0);
  }
}