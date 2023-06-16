export default class Floor extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
      super(scene, x, y);
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
  
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
      this.body.width = this.scene.meters / 10 * 800;
      this.body.height = 10;
    }
  }