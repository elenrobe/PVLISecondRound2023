export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y)
    {
        super(scene, x, y, 'spaceship');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setAngle(-90);
        this.enemySpeed= 30;
        this.setScale(0.03,0.03);
        this.body.setVelocityX(-this.enemySpeed);
    }

    preUpdate(t,dt)
    {
        super.update(t,dt);
        this.x+= this.scene.scenespeed;
        if(this.x<this.scene.cameras.main.scrollX)
        {
            this.scene.enemies.remove(this);
            this.destroy();
        }
    }
}