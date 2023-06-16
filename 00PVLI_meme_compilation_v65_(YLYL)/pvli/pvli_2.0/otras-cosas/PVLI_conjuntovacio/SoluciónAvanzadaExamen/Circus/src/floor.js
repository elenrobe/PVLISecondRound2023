/**
 * Suelo del nivel
 * @extends Phaser.GameObjects.Sprite
 */
export default class Floor extends Phaser.GameObjects.Sprite {
    /**
	* Constructor
	* @params Phaser.Scene scene - Escena en la que aparece el objeto
	* @params Number x - Posición X
	* @params Number y - Posición Y
	* @params Number width - Ancho del suelo
	*/
	constructor(scene, x, y, width) {
		super(scene, x, y);

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this, true);

		this.body.width = width;
		this.body.height = 10;
	}
}