
export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite) {
      super(scene, x, y, 'bullet');
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setAllowGravity(false);

      this.speed = 700;
      this.jumpSound = this.scene.sound.add("explosion")

     
    }

    preUpdate(t, dt) {
      super.preUpdate(t, dt);
   
      this.bulletAnims();
      if(this.scene.physics.overlap(this.scene.allEnemies, this, (o1, o2) => { o1.destroy();}));
      this.jumpSound.play();

      this.body.setVelocity(0,-this.speed);
      if(this.y <= 0) {
        console.log("bala fuera de pantalla");

        this.destroy();}

   // this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);

    }

    //Animacion
    bulletAnims()
    {
    //   if (this !== undefined) {
    //     if (this.body.velocity.x >= 0) this.setFlipX(0);
    //     else this.setFlipX(-1);
    //   }
    }
}
  