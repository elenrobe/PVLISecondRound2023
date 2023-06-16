export default class Disc extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y, speed, directionX, directionY, player)
    {
        super(scene,x,y,'asfasf');
        this.speed= speed;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setVelocity(directionX,directionY);
        this.body.velocity.normalize().scale(this.speed);
        this.ricochet=false;
        this.player=player;
        this.scene.disc=this;
        this.body.setCollideWorldBounds(true,0,0);
        //Esta propiedad tiene que estar activada para disparar el evento de choque
        this.body.onWorldBounds=true;

        this.setScale(0.3,0.3);
        this.scene.physics.add.overlap(this.scene.player,this, ()=>{
            if(this.ricochet)
            {
                this.scene.disc=null;
                this.scene.player.shotsFired=false;
                this.destroy();
            }
        });
    }
    preUpdate(t,dt)
    {
        super.preUpdate(t,dt);
        if(this.ricochet)
        {
            this.body.setVelocity(this.player.x-this.x,this.player.y-this.y);
            this.body.velocity.normalize().scale(this.speed);
        }
    }
}