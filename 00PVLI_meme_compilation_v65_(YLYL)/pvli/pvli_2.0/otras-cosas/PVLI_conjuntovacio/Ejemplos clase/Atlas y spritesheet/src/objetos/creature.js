export default class Creature extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, skin, frames) {
		super(scene, x, y, 'creaturesAtlas');

		this.scene.add.existing(this); // Añadimos el objeto que creamos a la escena

		// Creamos las animaciones de nuestro personaje
		this.scene.anims.create({
		  key: 'andar'+skin, 
		  frames: this.scene.anims.generateFrameNames('creaturesAtlas', {
																			prefix:skin, 
																			end: frames, 
																			zeroPad: 4 
																		}), 
		  repeat: -1 
		});

		this.play('andar'+skin);

	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);
		
	}
}