/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title4 extends Phaser.Scene {
	/**
	 * Escena de texto cargado con archivos TTF locales.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title4' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		this.load.image('castle', 'assets/castle.gif');
	}

	/**
	 * Método auxiliar para cargar la fuente TTF de un archivo local
	 */
	loadFont(name, url) {
		let self = this;
	    let newFont = new FontFace(name, `url(${url})`);
	    newFont.load()
	    // Función que se llamará cuando las fuentes estén cargadas
	    // en este caso, load devuelve lo que llamamos una promesa
	    // más info en: https://developer.mozilla.org/en-US/docs/Web/API/FontFace/load
	    .then(function (loaded) { 
	        document.fonts.add(loaded);
	        self.continueCreate();
	    }).catch(function (error) {
	        return error;
    	});
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.loadFont("Windsong", "assets/fonts/Windsong.ttf");
	}

	/**
	 * Método auxiliar para continuar con la creación de la escena cuando estén las fuentes cargadas
	 */
	continueCreate() {
		this.add.image(0, 0, 'castle').setOrigin(0, 0);
			
        this.textButton(this.cameras.main.centerX, 70, '1.-Browser Text Example', 'title');
		this.textButton(this.cameras.main.centerX, 140, '2.-BitMaps Example', 'title2');
		this.textButton(this.cameras.main.centerX, 210, '3.-GoogleFont Example', 'title3');
		this.textButton(this.cameras.main.centerX, 280, '4.-Local TTF Example', 'title4', true);
	}

	textButton(x, y, message, sceneKey, selected=false){
				
		let text = this.add.text(x, y, message, 
            { fontFamily: 'Windsong', fontSize: 50, color: '#00FFFF' })
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
	}

}