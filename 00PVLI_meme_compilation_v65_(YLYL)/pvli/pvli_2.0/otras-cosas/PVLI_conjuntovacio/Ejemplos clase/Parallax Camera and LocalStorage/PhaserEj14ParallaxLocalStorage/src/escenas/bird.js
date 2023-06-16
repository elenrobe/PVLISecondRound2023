export default class Bird extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, distance=0) {
		super(scene, x, y, 'bird');
		this.speed = 40; 
		this.miles = distance;
		this.lastX = x;
		scene.add.existing(this); 
		scene.physics.add.existing(this);

		// Creamos las animaciones de nuestro caballero
		this.scene.anims.create({
			key: 'fly',
			frames: scene.anims.generateFrameNumbers('bird', {start:0, end:5}),
			frameRate: 5,
			repeat: -1
		});

		this.play('fly');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
		this.ctrKey = this.scene.input.keyboard.addKey('SPACE'); //atacar
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		// Vamos contando cuantos pixeles se ha movido el personaje
		this.miles = Math.round((this.miles+Math.abs(this.x - this.lastX))*100)/100;
		this.lastX = this.x;

		// Mientras pulsemos la tecla 'A' movelos el personaje en la X
		if(this.aKey.isDown){
			this.setFlip(true, false)
			this.body.setVelocityX(-this.speed);
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.dKey.isDown && !this.isAttacking){
			this.setFlip(false, false)
			this.body.setVelocityX(this.speed);
		}
	}
}