
export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sprite) {
      super(scene, x, y, 'enemy');
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
      this.y -= this.height;

      this.movesbyTween = true;
      this.speed = 100;


      this.createTweenMovement(x);
      this.play('enemy_idle');

     
    }

    preUpdate(t, dt) {
      super.preUpdate(t, dt);
   
      if(this.scene.physics.overlap(this.scene.player, this, (o1, o2) => { o1.gameOver = true; o1.destroy(); this.scene.lose = true; }));
      if(this.scene.physics.overlap(this.scene.player2, this, (o1, o2) => { o1.gameOver = true; o1.destroy(); this.scene.lose = true;}));

      this.body.setVelocity(0, this.speed);

   // this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);

    }

  
    createTweenMovement(x)
    {
      this.rndDuration= Phaser.Math.Between(500, 800);
      this.rndX=Phaser.Math.Between(x, x+100);
      if(this.movesbyTween)
      {
        this.tweenMovement= this.scene.tweens.add({
        targets: this,
        x: this.rndX, 
        duration: this.rndDuration,
        ease: 'Linear',
        yoyo: true,
        repeat: -1,
        delay: 0 //Time to start
        });
      }
    }
  
}
  