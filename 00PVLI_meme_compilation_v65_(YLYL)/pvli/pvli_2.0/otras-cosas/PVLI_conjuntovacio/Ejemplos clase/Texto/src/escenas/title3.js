/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title3 extends Phaser.Scene {
	/**
	 * Escena de texto cargado con fuentes cogidas del repositorio de Google.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title3' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * En este caso cargamos el script que nos permitirá usar las fuentes de Google
	 * https://fonts.google.com/
	 */
	preload(){
		this.load.image('castle', 'assets/castle.gif');
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.add.image(0, 0, 'castle').setOrigin(0, 0);
		
		let self = this;
		WebFont.load({
	        google: {
	            families: [ 'Freckle Face'] // familias de fuentes que queremos cargar
	        },
	        active: function () // se llama a esta función cuando las fuentes están cargadas
	        {
	            self.textButton(self.cameras.main.centerX, 70, '1.-Browser Text Example', 'title');
				self.textButton(self.cameras.main.centerX, 140, '2.-BitMaps Example', 'title2');
				self.textButton(self.cameras.main.centerX, 210, '3.-GoogleFont Example', 'title3', true);
				self.textButton(self.cameras.main.centerX, 280, '4.-Local TTF Example', 'title4');
	        }
    	});

	}


	textButton(x, y, message, sceneKey, selected=false){
				
		let text = this.add.text(x, y, message, 
            { fontFamily: 'Freckle Face', fontSize: 50, color: '#ffffff' })
        text.setOrigin(0.5,0.5);

		//Color el color y la sombra del texto si estamos en la escena con ese tipo de texto.
        if(selected){
        	text.setColor('#FF00FF')
        	text.setShadow(10, 10, "#999999", 1, false, true);
        }     

        text.setInteractive();
		text.on('pointerdown', ()=>{
			this.scene.start(sceneKey)
		})

		//this.cameras.main.pan(300, 300);
		//text.setScrollFactor(0,0)
	}

}