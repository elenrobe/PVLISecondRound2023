import Bird from "./bird.js"
/**
 * Escena con parallax.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'parallax-scene' });
	}
	
	preload(){
		this.load.image('sky', 'assets/background/sky.png');
		this.load.image('cloudsBG', 'assets/background/clouds_bg.png');
		this.load.image('montain', 'assets/background/glacial_mountains.png');
		this.load.image('clouds3', 'assets/background/clouds_mg_3.png');
		this.load.image('clouds2', 'assets/background/clouds_mg_2.png');
		this.load.image('clouds1', 'assets/background/clouds_mg_1.png');

		this.load.audio('music', 'assets/music/FarAway.mp3');

		this.load.spritesheet('bird', 'assets/characters/bird.png', {frameWidth: 64, frameHeight: 64})

		/*
		  Eventos ejecutados al abrir y cerrar la pestaña de juego, los usaremos para guardar y cargar 
		  el progreso del jugador que en este caso es cuantos "Kilometros" ha volado el jugador.
		  https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
		*/
		window.addEventListener("beforeunload", event => {
			window.localStorage.setItem('miles', this.bird.miles);
		    console.log("Before Unload")
		});

		addEventListener("load", event => {
			this.miles =  window.localStorage.getItem('miles')
		    console.log("Window Loaded")
		});
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		/* Música de fondo - Se ejecutará cuando el jugador pulse dentro de la ventana. */
		this.music = this.sound.add('music', {mute: false, volume:1, loop:true, delay: 100})
		this.playing = false;

		/* Creamos el parallax */
		const w = this.scale.width;
		const h = this.scale.height;
 		
 		this.add.image(w*0.5, h*0.5, 'sky').setScrollFactor(0)
		this.createAligned(2,'cloudsBG', 0.2);
		this.createAligned(2,'montain', 0.4);
		this.createAligned(4,'clouds3', 0.6);
		this.createAligned(5,'clouds2', 0.8);
		this.createAligned(5,'clouds1', 1);
		/*
			Importante:
			"Please be aware that scroll factor values other than 1 are not taken in to consideration when calculating physics collisions. 
			Bodies always collide based on their world position, but changing the scroll factor is a visual adjustment to where the textures 
			are rendered, which can offset them from physics bodies if not accounted for in your code."
			Mirar doc: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.ScrollFactor.html
		*/


		/* Creamos el minimap como una cámara nueva con zoom */
		this.minimap = this.cameras.add(0, 0, 200, 80)
			.setZoom(0.2)
			.setName('minimap');

		/* Instanciamos el pájaro (personaje jugable) y hacemos que la cámara principal se centre en él. */
        this.bird = new Bird(this, w/2, h/2, this.miles);
        this.cameras.main.startFollow(this.bird, false, 0.2, 0.2);
	}

	update(time, dt){
		if(this.playing!=true){
			this.music.play();
			this.playing = true;
		}
	}

	/**
	 * Método auxiliar para cargar las imágenes necesarias de nuestro parallax
	 * 
	 */
	createAligned(count, imageKey, srollFactor){
		let x = 0;
		for (let i = 0 ; i < count; i++){
			const m = this.add.image(x, 0, imageKey)
				.setOrigin(0,0)
				.setScrollFactor(srollFactor);
			x += m.width
		}
	}

}
