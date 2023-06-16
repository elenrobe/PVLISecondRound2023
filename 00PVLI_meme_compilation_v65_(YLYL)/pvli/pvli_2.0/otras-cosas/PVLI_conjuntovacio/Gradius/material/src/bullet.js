export default class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y)
    {
        super(scene, x, y, 'asfasf');
        this.speed = 70;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(this.speed);
        this.setScale(0.4,0.2);
        this.scene.bullets.add(this);
    }
    preUpdate(t,dt)
    {
        
        super.update(t,dt);
        this.x+= this.scene.scenespeed;
        if(this.x>this.scene.cameras.main.scrollX + this.scene.sys.canvas.width)
        {
            this.scene.bullets.remove(this);
            this.destroy();
        }
        
    }
}