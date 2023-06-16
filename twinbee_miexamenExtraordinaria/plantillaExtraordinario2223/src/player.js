import Bullet from './bullet.js';

/**
 * Personaje que controla el jugador
 * Está compuesto por un payaso y un león.
 * @extends Phaser.GameObjects.Container
 */
export default class Player extends Phaser.GameObjects.Container {
    /**
	* Constructor
	*/
	constructor(scene, x, y, numPlayer = 1) {
        super(scene, x, y);
		
		// El jugador es un contenedor que contiene un payaso y un león
		//scene, x, y, sprite lion,  frame (opcional)
		this.numPlayer = numPlayer;

		this.playerSprite, this.playerIdle, this.playerLeft, this.playerRight;
		//SPRITES
		if(numPlayer === 1){
			this.playerSprite = 'twinbee';
			this.playerIdle = 'twinbee_idle';
			this.playerLeft = 'twinbee_left';
			this.playerRight = 'twinbee_right';

		}
		else{
			this.playerSprite = 'winbee';
			this.playerIdle = 'winbee_idle';
			this.playerLeft = 'winbee_left';
			this.playerRight = 'winbee_right';
		}

		this.nave = new Phaser.GameObjects.Sprite(scene,0,1,this.playerSprite,0).setOrigin(0.5,0.5);
		this.add(this.nave);

		this.setSize(this.nave.width, this.nave.height);

		
		
		// Añadimos el contenedor a la escena y a las físicas
        this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
		// //para que no se choque
		this.body.setCollideWorldBounds();

		// Iniciamos las animaciones del león y el payaso
        this.nave.play(this.playerIdle);
        
		// Input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
		
		this.a = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.s = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		//CONTROLES
		this.keys=this.scene.input.keyboard.addKeys('SPACE,ENTER,P');

		this.up; this.down, this.left, this.right, this.shootKey; //teclas segun jugador

		this.teclas();
		
			
		// Velocidad de movimiento y salto
        this.speed = 160;
		this.backspeed = 100;
		this.jumpForce = 420;
		

		this.bulletLaunched = false;

		// última dirección en la que se estaba moviendo el jugador
		this.lastDir = 0;
		
		// Flag de si el juego ha finalizado
		this.gameOver = false;
				

		

    }
    
	/**
	* Preupdate
	* Gestionamos el input y movimiento del jugador.
	*/
    preUpdate(t,dt) {
		if(this.nave != null)
			this.nave.preUpdate(t,dt);
		if(this.gameOver){
			return;
		}
		
		// Ejecutamos la animación que corresponde
        this.playAnimation();
		
        let dir = 0;

		//this.teclas(); //mirar qué teclas

		
		//Movimiento hacia arriba o abajo
        if (this.up.isDown){
			this.isMoving = true;
            this.body.setVelocityY(-this.speed);
			//this.jumpSound.play()
        } 
		else if (this.down.isDown){
			this.isMoving = true;
            this.body.setVelocityY(this.speed);
			//this.jumpSound.play()
        } 
		else {
            this.isMoving = false;
			this.body.setVelocityY(0);

        }
        
        
		// Movimiento lateral
		if (this.left.isDown) {
            this.isMoving = true;
            this.flipX = true;
            dir=-1;
        }
        else if (this.right.isDown) {
            this.isMoving = true;
            this.flipX = false;
            dir = 1;
        } else {
            this.isMoving = false;
        }


		
		
		// Calculamos la velocidad de movimiento en el eje X
		// if(this.body.onFloor()){
			this.lastDir = dir;
			let speed = dir == 1 ? this.speed : this.backspeed;
			//la ? significa
			// if (dir == 1) {
			// 	speed = this.speed;
			//   } else {
			// 	speed = this.backspeed;
			//   }
			this.body.setVelocity(dir * speed, this.body.velocity.y);
		

		//BOUNDS
		// El jugador no puede ir más a la izquierda de la posición 0
        if (this.x <= 0){
            this.setPosition(0, this.y);
        }


		//DISPARO

		if(Phaser.Input.Keyboard.JustDown(this.shootKey) && !this.bulletLaunched){
			new Bullet(this.scene, this.x, this.y);
			this.bulletTimer();




		}
    }
    
  bulletTimer() {
    this.bulletLaunched = true;
    this.scene.time.addEvent({
      delay: 200,
      callback: this.changeBulletTimer,
      callbackScope: this
    });
  }
  changeBulletTimer() {
    this.bulletLaunched = false;
  }

  teclas(){
	
		
	if(this.numPlayer === 1){

		this.up = this.cursors.up;
		this.down = this.cursors.down;
		this.left = this.cursors.left;
		this.right = this.cursors.right;
		this.shootKey = this.keys.SPACE;



	}
	if(this.numPlayer === 2){
		
		this.up = this.w;
		this.down = this.s;
		this.left = this.a;
		this.right = this.d;
		this.shootKey = this.keys.ENTER;

	}

  }
	/**
	* Método que ejecuta la animación correspondiente según si el jugador está en movimiento y/o saltando.
	*/
    playAnimation() {
        // if (this.body.onFloor()) {
            if (this.isMoving) {
                this.nave.play('lion_run', true);
            } else {
                this.nave.play('lion_idle', true);
        	   }
        // } else {
        //     this.nave.play('lion_jump', true);
        // }
    }
	
	/**
	* Método que se ejecuta cuando el jugador muere.
	*/
	die(){
		if(this.gameOver == false){
			this.gameOver=true;
			this.body.setVelocity(0,0);
			this.body.setAllowGravity(false);
			// this.nave.play('lion_dead');
			// this.deadSound.play();
			// this.scene.scene.pause(this.scene)
		}
	}
	
	/**
	* Método que devuelve true si el jugador está muerto
	*/
	isDead(){
		return this.gameOver;
	}
		
	/**
	* Método a ejecutar cuando el jugador ha llegado a la plataforma final.
	* @params Object platform - Plataforma final que indica el final del nivel
	*/
	win(platform){
		if(this.gameOver == false){
			this.gameOver=true;
						
			//Ya no necesitamos body
			this.body.setVelocity(0,0);
			this.body.destroy();
			
			// Eliminamos al león :( ya que no aparece en la plataforma al ganar
			// this.remove(this.nave);
			// this.nave.destroy();
			// this.nave = null;
			
			// Nos situamos encima de la plataforma
			this.x = platform.x+platform.width/4;
			this.y = platform.y-platform.height-this.height*0.8;
			
			this.winSound.play();
			
			// Lanzamos un evento de hacer llegado al final
			this.scene.events.emit('playerwin');
		}
	}
}