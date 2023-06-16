import Knight from '../objetos/knight.js';
import Creature from '../objetos/creature.js';

/**
 * Escena para cargar animaciones.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'animation' });
	}
	
	preload(){
		this.load.spritesheet('knight', 'assets/Knight/knight.png', {frameWidth: 72, frameHeight: 86})
		this.load.atlas('creaturesAtlas', 'assets/Sea/seacreatures.png', 'assets/Sea/seacreatures.json')
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		
		//let knight = new Knight(this, 300, 100);

		new Creature(this, 100, 100, 'stingray', 23);
		new Creature(this, 300, 100, 'crab1', 25);
		new Creature(this, 500, 100, 'greenJellyfish', 39);
	}

}
