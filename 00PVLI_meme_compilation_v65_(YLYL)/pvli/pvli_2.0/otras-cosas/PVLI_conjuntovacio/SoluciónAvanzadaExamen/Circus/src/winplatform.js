/**
 * Plataforma final con la que gana el jugador
 * @extends Phaser.GameObjects.Image
 */
export default class WinPlatform extends Phaser.GameObjects.Image {
    /**
	* Constructor
	* @params Phaser.Scene scene - Escena en la que aparece el objeto
	* @params Number x - Posición X
	* @params Number y - Posición Y
	*/
	constructor(scene, x, y) {
        super(scene, x, y, "platform");
		
		this.setScale(3,3);
		
        this.scene.add.existing(this);
		
		this.scene.physics.add.existing(this);
        		
    }
    
    preUpdate(t,dt) {
		
    }
    
}