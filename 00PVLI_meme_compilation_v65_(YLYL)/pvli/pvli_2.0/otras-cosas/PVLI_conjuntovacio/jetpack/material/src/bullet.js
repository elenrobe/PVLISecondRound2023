export default class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y, dir)
    {
        super(scene,x,y,'error')
        this.speed = dir*70;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(this.speed);
        this.setScale(0.4,0.2);
        //this.scene.bullets.add(this);
    }
    preUpdate(t,dt)
    {
        
        super.update(t,dt);
        if(this.x< 0-this.width || this.x > 677)
        {
            //this.scene.bullets.remove(this);
            this.destroy();
        }
        
    }
}