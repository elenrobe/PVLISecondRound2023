/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
	/**
	 * Escena de texto cargado con fuentes del navegador.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * En este caso solo el fonde
	 */
	preload(){
		this.load.image('castle', 'assets/castle.gif');
	}
	
	/**
	* Creación de los textos
	*/
	create() {
		this.add.image(0, 0, 'castle').setOrigin(0, 0);
		
		this.textButton(this.cameras.main.centerX, 70, '1.-Browser Text Example', 'title', true);
		this.textButton(this.cameras.main.centerX, 140, '2.-BitMaps Example', 'title2');
		this.textButton(this.cameras.main.centerX, 210, '3.-GoogleFont Example', 'title3');
		this.textButton(this.cameras.main.centerX, 280, '4.-Local TTF Example', 'title4');
	}

	textButton(x, y, message, sceneKey, selected=false){
		let text = this.add.text(x, y, message);
		text.setOrigin(0.5,0.5);
		text.setAlign('center');
		
		text.setFont('Arial Black');
		text.setFontSize(40);
		
		//Color del reborde de la letra y grosor si estamos en la escena con ese tipo de texto.
		if(selected){
			text.setStroke('#FF00FF', 4)
			text.setFill('#43d6FF');
			text.setShadow(10, 10, 'rgba(0,0,0,0.5)', 1);
		}

		text.setInteractive();
		text.on('pointerdown', ()=>{
			this.scene.start(sceneKey)
		})

		/*
		Si movemos la cámara es necesario hacer setScrollFactor para evitar que el texto se mueva con ella
		Puedes probarlo descomentando las siguientes líneas:
		*/
		
		// this.cameras.main.pan(300, 300);
		// text.setScrollFactor(0,0)
	}

}