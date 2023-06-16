/**
 * Personaje que controla el jugador
 * Está compuesto por un payaso y un león.
 * @extends Phaser.GameObjects.Container
 */
export default class Player extends Phaser.GameObjects.Container {
    /**
	* Constructor
	*/
	constructor(scene, x, y) {
        super(scene, x, y);
		
		// El jugador es un contenedor que contiene un payaso y un león
		this.lion = new Phaser.GameObjects.Sprite(scene,0,1,'lion',0).setOrigin(0.5,0);
		this.clown = new Phaser.GameObjects.Sprite(scene,0,-this.lion.height/2,'clown',0).setOrigin(0.5,0.5);
		this.add(this.lion);
		this.add(this.clown);
		
		// Damos un tamaño al contenedor basado en el león y el payaso
		// Ancho = ancho león (y menos un poquito para facilitar saltar obstáculos)
		// Alto = alto payaso + alto león (y menos un poquito para facilitar saltar obstáculos)
		this.setSize(this.lion.width-8, this.clown.height+this.lion.height-8);
		
		// Escalamos todos los elementos *3 como se indica en el enunciado
		this.setScale(3,3);
		
		// Añadimos el contenedor a la escena y a las físicas
        this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
				
		// Iniciamos las animaciones del león y el payaso
        this.lion.play('lion_run');
		this.clown.play('player_idle');
        
		// Input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
		// Velocidad de movimiento y salto
        this.speed = 160;
		this.backspeed = 100;
		this.jumpForce = 420;
		
		// última dirección en la que se estaba moviendo el jugador
		this.lastDir = 0;
		
		// Flag de si el juego ha finalizado
		this.gameOver = false;
				
		// Creamos los sonidos de perder, ganar y saltar
		this.deadSound = this.scene.sound.add("fail");
		this.deadSound.once("complete", ()=> this.scene.scene.start('menu'));
		
		// Una vez termina el sonido de ganar, mandamos un evento para registrar la puntuación
		this.winSound = this.scene.sound.add("win");
		this.winSound.once("complete", ()=> {
				this.scene.events.emit('registerScore');
			});
		
		this.jumpSound = this.scene.sound.add("jump")
    }
    
	/**
	* Preupdate
	* Gestionamos el input y movimiento del jugador.
	*/
    preUpdate(t,dt) {
		if(this.lion != null)
			this.lion.preUpdate(t,dt);
		this.clown.preUpdate(t,dt);
		if(this.gameOver){
			return;
		}
		
		// Ejecutamos la animación que corresponde
        this.playAnimation();
		
        let dir = 0;
		//Salto
        if (this.cursors.up.isDown && this.body.onFloor() ){
            this.body.setVelocityY(-this.jumpForce);
			this.jumpSound.play()
        } 
        
		// Movimiento lateral
		if (this.cursors.left.isDown) {
            this.isMoving = true;
            this.flipX = true;
            dir=-1;
        }
        else if (this.cursors.right.isDown) {
            this.isMoving = true;
            this.flipX = false;
            dir = 1;
        } else {
            this.isMoving = false;
        }
		
		// Calculamos la velocidad de movimiento en el eje X
		if(this.body.onFloor()){
			this.lastDir = dir;
			let speed = dir == 1 ? this.speed : this.backspeed;
			this.body.setVelocity(dir * speed, this.body.velocity.y);
		} else {
			let speed = this.lastDir == 1 ? this.speed : this.backspeed;
			this.body.setVelocity(this.lastDir * speed, this.body.velocity.y);
		}
		
		// El jugador no puede ir más a la izquierda de la posición 0
        if (this.x <= 0){
            this.setPosition(0, this.y);
        }
    }
    
	/**
	* Método que ejecuta la animación correspondiente según si el jugador está en movimiento y/o saltando.
	*/
    playAnimation() {
        if (this.body.onFloor()) {
            if (this.isMoving) {
                this.lion.play('lion_run', true);
				this.clown.play('player_idle', true);
            } else {
                this.lion.play('lion_idle', true);
				this.clown.play('player_idle', true);
            }
        } else {
            this.lion.play('lion_jump', true);
			this.clown.play('player_jump', true);
        }
    }
	
	/**
	* Método que se ejecuta cuando el jugador muere.
	*/
	die(){
		if(this.gameOver == false){
			this.gameOver=true;
			this.body.setVelocity(0,0);
			this.body.setAllowGravity(false);
			this.lion.play('lion_dead');
			this.clown.play('player_dead');
			this.deadSound.play();
			this.scene.scene.pause(this.scene)
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
			
			this.clown.play('player_win', true)
			
			//Ya no necesitamos body
			this.body.setVelocity(0,0);
			this.body.destroy();
			
			// Eliminamos al león :( ya que no aparece en la plataforma al ganar
			this.remove(this.lion);
			this.lion.destroy();
			this.lion = null;
			
			// Nos situamos encima de la plataforma
			this.x = platform.x+platform.width/4;
			this.y = platform.y-platform.height-this.height*0.8;
			
			this.winSound.play();
			
			// Lanzamos un evento de hacer llegado al final
			this.scene.events.emit('playerwin');
		}
	}
}