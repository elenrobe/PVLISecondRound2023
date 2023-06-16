/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title2 extends Phaser.Scene {
	/**
	 * Escena de texto cargado con fuentes por BitmapFonts locales.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title2' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * En este caso el bitmap de la fuente
	 * Es necesario el .png con la apariencia del texto y además el .xml que nos dirá donde se encuentra cada carácter
	 */
	preload(){
		this.load.image('castle', 'assets/castle.gif');
		this.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');

	}
	
	/**
	* Creación de los textos
	*/
	create() {
		this.add.image(0, 0, 'castle').setOrigin(0, 0);

		this.textButton(this.cameras.main.centerX, 70, '1.-Browser Text Example', 'title');
		this.textButton(this.cameras.main.centerX, 140, '2.-BitMaps Example', 'title2', true);
		this.textButton(this.cameras.main.centerX, 210, '3.-GoogleFont Example', 'title3');
		this.textButton(this.cameras.main.centerX, 280, '4.-Local TTF Example', 'title4');


	}

	textButton(x, y, message, sceneKey, selected=false){
				
		let text = this.add.bitmapText(x, y, 'desyrel', message, 64);
		text.setOrigin(0.5,0.5);
		text.setFontSize(50);

		//Cambiamos el color de texto si estamos en la escena con ese tipo de texto.
		if(selected){
			 text.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
		}

		text.setInteractive();
		text.on('pointerdown', ()=>{
			this.scene.start(sceneKey);
		})

		//this.cameras.main.pan(300, 300);
		//text.setScrollFactor(0,0)
	}

}