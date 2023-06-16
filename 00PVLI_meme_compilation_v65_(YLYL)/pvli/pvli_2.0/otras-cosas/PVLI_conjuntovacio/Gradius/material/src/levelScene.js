import Player from "./player.js";
import Enemy from "./enemy.js";
export default class Level extends Phaser.Scene {
    constructor() {
		super({ key: 'level' });
	}
    preload()
    {
        this.load.image('background', 'assets/sprites/background.jpg');
        this.load.image('spaceship', 'assets/sprites/ship.png');
        this.nOfBackGrounds = 1;
        this.scenespeed=1;
        this.randomEnemyGenerator= Phaser.Math.Between(3000,7000);
        this.elapsedGeneration = 0;
    }
    create()
    {
       
        this.background1= this.add.image(0, 0, 'background').setOrigin(0,0).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height).setDepth(-10);
        this.background2= this.add.image(this.sys.canvas.width*this.nOfBackGrounds, 0, 'background')
        .setOrigin(0,0).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height).setDepth(-10);
        this.player = new Player(this,50, this.sys.canvas.height/2, 100);

        this.enemies= this.add.group();
        this.bullets = this.add.group();

        this.enemies.add(new Enemy(this,
             this.cameras.main.scrollX+ this.sys.canvas.width, Phaser.Math.Between(0, this.sys.canvas.height)));
        this.physics.add.overlap(this.player, this.enemies, ()=>{
            this.player.destroy();
        } )
        // Aunque sean dos grupos, al meter los parametros en la funcion corresponden al objeto que ha chocado y no al grupo entero
        this.physics.add.overlap(this.bullets, this.enemies, (bullet,enemy)=>{
            this.bullets.remove(bullet);
            this.enemies.remove(enemy);
            bullet.destroy();
            enemy.destroy();
        } )
    }
    update(t,dt)
    {
        this.cameras.main.scrollX+=this.scenespeed;
        this.player.x +=this.scenespeed;
        if(this.cameras.main.scrollX>= this.background1.x + this.sys.canvas.width)
        {
            this.nOfBackGrounds++;
            this.background1.destroy();
            this.background1= this.background2;
            this.background2=this.add.image(this.sys.canvas.width*this.nOfBackGrounds, 0, 'background')
            .setOrigin(0,0).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height).setDepth(-10);
        }
        this.elapsedGeneration+=dt;
        if( this.elapsedGeneration>= this.randomEnemyGenerator)
        {
            this.elapsedGeneration=0;
            this.randomEnemyGenerator= Phaser.Math.Between(3000,7000);
            this.enemies.add(new Enemy(this,
                this.cameras.main.scrollX+ this.sys.canvas.width, Phaser.Math.Between(0, this.sys.canvas.height)));
        }
    }

}