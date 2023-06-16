
import Player from "./player.js";

export default class Level extends Phaser.Scene
{
    constructor() {
		super({ key: 'level' });
	}
    preload()
    {
        this.load.image('spaceship', 'assets/sprites/spaceship.png');
    }
    
    create()
    {
        // Creas el bound antes que al player para que el player coja bien la referencia del mundo
        this.physics.world.setBounds(5,5,this.sys.canvas.width-10, this.sys.canvas.height-10);
        this.player = new Player(this, this.sys.canvas.width/2, this.sys.canvas.height/2,50);
        this.disc=null;
        this.physics.add.overlap(this.player,this.disc, ()=>{
            console.log('hi');
            if(this.disc.ricochet)
            {
                this.disc.destroy();
                this.disc=null;
                this.player.shotsFired=true;
            }
        });
        //el booleano body es el cuerpo que choca y con body.gameObject se obtiene el objeto
        this.physics.world.on('worldbounds', (body)=>{
            if(body.gameObject===this.disc)
            {
                this.disc.ricochet=true;
            }
        });
    }
}