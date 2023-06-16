import Character from '../objetos/character.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'maingame' });
	}
	
	preload(){
		// Cargamos el Tilemap (JSON)
		this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/example.json');

		// Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
		this.load.image('patronesTilemap', 'assets/Tilemap/testtiles32x32_castle.png');
		
		// Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('character', 'assets/character.png');

		// Recurso para las monedas (Spreetsheet con 6 frames);
		this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		
		// Animación para las monedas
		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
			frameRate: 16,
			repeat: -1
		});
	
		// Objeto tilemap
		this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});
		
		// Objeto el tileset. 
		// addTilesetImage recibe la propiedad "name" del tileset a usar (ver .json, propiedad "tilesets":[... "name":"castillo32x32" ... ] como primer parámetro
		// y la imagen del tileset
		const tileset1 = this.map.addTilesetImage('castillo32x32', 'patronesTilemap');
		
		// creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('CapaSuelo', tileset1);
		
		this.wallLayer = this.map.createLayer('CapaMuro', tileset1);
		this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones
		
		this.baseColumnLayer = this.map.createLayer('CapaColumnas', tileset1);
		this.baseColumnLayer.setCollision(19); // Los tiles de esta capa tienen colisiones
		
		
		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		let coins = this.map.createFromObjects('Objetos', {name: "coin", key: 'coin' });
		this.anims.play('spin', coins);
		
		let coinsGroup = this.add.group();
		coinsGroup.addMultiple(coins)
		coins.forEach(obj => {
			this.physics.add.existing(obj);
		});
		
		this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:"character"});
		let player = this.mov[0];


		// Ponemos la cámara principal de juego a seguir al jugador
		this.cameras.main.startFollow(player);
		
		// Decimos que capas tienen colision entre ellas
		this.physics.add.collider(player, this.wallLayer);
		this.physics.add.collider(player, coinsGroup, this.aux);
		this.physics.add.collider(coinsGroup, this.wallLayer);
		
		this.physics.add.collider(player, this.baseColumnLayer);
		this.physics.add.collider(coinsGroup, this.baseColumnLayer);
		
		// Creamos la última capa que representa objetos por los que el jugador pasa por detrás.
		this.topColumnLayer = this.map.createLayer('CapaAlto', tileset1);

		/*
			Animación básica de la moneda con Tweens
		*/
			// Tween 
			/*
			let tween = this.tweens.add({
			    targets: coins,
			    scale: 0.8,
			    duration: 1000,
			    ease: 'Sine.easeInOut',
			    yoyo: true,
			    repeat: -1,
			    delay: 1000
			})*/

			// Tween Timeline
			/*
			let timeline = this.tweens.createTimeline({loop:-1});

			timeline.add({
				targets: coins,
			    scale: 0.8,
			    duration: 1000,
			    ease: 'Sine.easeInOut',
			    yoyo: true,
			    delay: 100
			});
			timeline.add({
				targets: coins,
				scaleX: 0,
			    duration: 500,
			    ease: 'Sine.easeInOut',
			    repeat: 0,
			    yoyo: true,
			    delay: 0,
			    repeat: 3,
			});
			timeline.play();
			*/
		
	}

	aux(){
		console.log("coin")
	}

	update(time, dt){

	}

}
