export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        // Elementos
        this.player = new Phaser.GameObjects.Sprite(scene, 0, -20, 'clown').setScale(3, 3);
        this.lion = new Phaser.GameObjects.Sprite(scene, 0, 40, 'lion').setScale(3, 3);
        this.setSize(this.lion.width * 3 - 15, this.player.height * 3 + this.lion.height * 3 - 10);
        this.add(this.player);
        this.add(this.lion);

        // Añadir a la escena y físicas
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Controles
        this.controlRIGHT = this.scene.input.keyboard.addKey('RIGHT');
        this.controlLEFT = this.scene.input.keyboard.addKey('LEFT');
        this.controlUP = this.scene.input.keyboard.addKey('UP');

        // Variables
        this.initialX = x;
        this.speed = 150;
        this.jumpSpeed = 400;
        this.isMoving = false;
        this.lastDir = 0;

        // Añadir al grupo de colisiones
        this.group = this.scene.add.group();
		this.group.add(this);
		this.group.add(this.player);

        // Sonidos de perder y su evento
		this.deadSound = this.scene.sound.add('failure');
		this.deadSound.once("complete", ()=> {
            this.scene.scene.start('menu');
        });
		
        // Sonido de ganar y su evento
		this.winSound = this.scene.sound.add('final');
		this.winSound.once("complete", ()=> {
				this.scene.events.emit('registerScore');
		});
		
        // Sonido de saltar
		this.jumpSound = this.scene.sound.add("jump")
    }

    preUpdate(t, dt) {
        this.player.preUpdate(t, dt);

        // Si el jugador está vivo
        if (!this.scene.end) {
            this.lion.preUpdate(t, dt);

            let dir = 0;
		    //Salto
            if (this.controlUP.isDown && this.body.onFloor() ){
                this.body.setVelocityY(-this.jumpSpeed);
		    	this.jumpSound.play();
            }
        
		    // Movimiento lateral
		    if (this.controlLEFT.isDown) {
                this.isMoving = true;
                dir = -1;
            }
            else if (this.controlRIGHT.isDown) {
                this.isMoving = true;
                dir = 1;
            } else {
                this.isMoving = false;
            }
		
		    // Calculamos la velocidad de movimiento en el eje X
		    if (this.body.onFloor()){
			    this.lastDir = dir;
			    let speed = dir == 1 ? this.speed : this.speed - 100;
			    this.body.setVelocity(dir * speed, this.body.velocity.y);
		    } else {
			    let speed = this.lastDir == 1 ? this.speed : this.speed - 100;
			    this.body.setVelocity(this.lastDir * speed, this.body.velocity.y);
		    }

            // Ejecutamos la animación que corresponde
            this.playAnimation();

            // El jugador no puede ir más a la izquierda de la posición 0
            if (this.x <= this.initialX){
                this.setPosition(this.initialX, this.y);
            }
        }
    }

    // Lógica de animaciones
    playAnimation() {
        if (this.body.onFloor()) {
            if (this.isMoving) {
                this.lion.play('lionWalk', true);
				this.player.setFrame(1);
            } else {
                this.lion.setFrame(2);
				this.player.setFrame(0);
            }
        } else {
            this.lion.setFrame(0);
			this.player.setFrame(1);
        }
    }

    onDeath() {
        this.body.setAllowGravity(false);
        this.deadSound.play();
        this.body.setVelocity(0); this.body.destroy();
        this.lion.setFrame(3); this.player.setFrame(4);
    }

    win(plataform) {
        this.winSound.play();
        this.body.destroy();
        this.lion.destroy();
        this.x = plataform.x;
        this.y = plataform.y - 50;
        this.player.play('clownWin');
    }
}