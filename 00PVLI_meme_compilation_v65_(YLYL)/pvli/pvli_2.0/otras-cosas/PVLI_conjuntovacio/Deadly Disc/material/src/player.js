
import Disc from "./disc.js";

export default class Player extends Phaser.GameObjects.Sprite
{
constructor(scene,x,y, speed)
    {
        super(scene, x, y, 'spaceship');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.lastDirectionX = 1;
        this.lastDirectionY=0; 
        this.shotsFired=false;

        this.speed = speed;

        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.spaceKey = this.scene.input.keyboard.addKey('space'); 
        this.setScale(1,0.5);
        // si no, no colisiona con el mundo
        this.body.setCollideWorldBounds(true);
    }

    preUpdate(t,dt)
    {
        super.preUpdate(t, dt);
        var self = this;
		// Mientras pulsemos la tecla 'A' movelos el personaje en la X
		if(this.aKey.isDown){
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
            this.lastDirectionX=-1;
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.dKey.isDown){
			this.body.setVelocityX(this.speed);
            this.lastDirectionX=1;
		}
		// Si pulsado 'S' detendremos o reanudaremos la animación de 'idle' según su estado actual
		if(this.sKey.isDown){
            this.body.setVelocityY(this.speed);
            this.lastDirectionY=1;
		}

		// Si pulsamos 'W' haremos que el personaje salte
		// Mientras saltamos no podremos volver a saltar ni atacar
		// Comprobamos si estamos sobre un "suelo";
		if(this.wKey.isDown){
            this.body.setVelocityY(-this.speed);
            this.lastDirectionY=-1;
		}
        //Ataque
        if(this.spaceKey.isDown && !this.shotsFired)
        {
            this.shotsFired=true;
            new Disc(this.scene,this.x,this.y,100,this.lastDirectionX,this.lastDirectionY,this);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.shotsFired)
        {

            this.scene.disc.ricochet=true;
        }

        if(Phaser.Input.Keyboard.JustUp(this.aKey)||Phaser.Input.Keyboard.JustUp(this.dKey))
        {
            this.body.setVelocityX(0);
            this.lastDirectionX=0;
        }
        if(Phaser.Input.Keyboard.JustUp(this.sKey)||Phaser.Input.Keyboard.JustUp(this.wKey))
        {
            this.body.setVelocityY(0);
            this.lastDirectionY=0;
        }
       
        this.elapsedShoot+=dt;
        this.body.velocity.normalize().scale(50);
    }
}
