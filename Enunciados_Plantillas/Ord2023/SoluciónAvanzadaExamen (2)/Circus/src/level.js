import Player from './player.js';
import Ring from './ring.js';
import Floor from './floor.js';
import Fire from './fire.js';
import Platform from './winplatform.js';
import HUD from './scoreHUD.js';

/**
 * Escena principal del juego. Pantalla lateral en la que aparecen obstáculos, algunos estáticos y otros que se mueven
 * de derecha a izquierda. El jugador debe recorrer una cantidad de metros según la dificultad hasta llegar a una 
 * plataforma que indica el final del nivel.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
	/**
	* Constructor de la escena
	*/
	constructor() {
		super({ key: 'level' });
		this.initBG = -300; // Posición inicial del fondo
		this.bgSize = 800; // Tamaño horizontal de cada imagen que compone el fondo
	}
	
	/**
	* Configuramos la puntuación y los metros a recorrer en base a la dificultad elegina en el Menú de juego.
	*/
	init (data) {
		this.metres = data.metres;
		this.finalPos = data.metres*80;
		this.initScore = data.metres*100;
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		/** Background inicial**/
		this.firstBG = this.addBg(this.initBG)
		this.midBG = this.addBg(this.initBG+this.bgSize)
		this.lastBG = this.addBg(this.initBG+this.bgSize * 2)
		this.bgCount = 1;
		
		/** HUD **/
		this.hud=new HUD(this, this.initScore, this.debug)
				
		/** Final platform **/
		let platform = new Platform(this, this.finalPos+100, 500);
		
		/** Player **/
		this.player = new Player(this, 0, 500);
		
		/** Obstacles **/
		this.obstacles = this.add.group();	
		this.obstacles.add(new Ring(this, 1000, this.game.config.height-350));
		this.obstacles.add(new Ring(this, 1600, this.game.config.height-350));
		
		/** Metres (Pintamos los primeros)**/
		this.drawMetres(-60, this.metres);
		this.drawMetres(740, this.metres-10); // 740 -> posición del anterior + 800 (tamaño del fondo)
		this.drawMetres(1540, this.metres-20); // 1540 -> posición del anterior + 800 (tamaño del fondo)
		
		/** Floor **/
		let floor = new Floor(this, -100, this.game.config.height-120, this.bgSize * (this.metres/10+1) );
		
		/** Collisions **/
		this.physics.add.collider(floor, this.player); 
		this.physics.add.collider(floor, platform); 
		this.physics.add.collider(floor, this.obstacles);
		
		// La detección de colisión del jugador con los obtáculos la hacemos con overlap para evitar que el jugador los empuje
		this.physics.add.overlap(this.player.getBody(), this.obstacles, (player, obstacle) => {
				this.music.stop();
				this.playerDeath(player, obstacle)
			});
		this.physics.add.overlap(this.player.getBody(), platform, (player, plt) => {
				this.music.stop();
				this.win(player, plt);
			});

		/** Camera **/
		this.cameras.main.startFollow(this.player, true, 1, 1, -300, 120); // La cámara sigue al jugador con un deplazamiento
		this.cameras.main.setDeadzone(null, this.game.config.height); // Hacemos que la cámara no pueda moverse a lo alto
		
		// Iniciamos la música del nivel
		this.music = this.sound.add("stage");
		this.music.setLoop(true);
		this.music.play();
	}
	
	/**
	* Método update donde se tiene en cuenta la posición de la cámara para dibujar el fondo y los metros avanzados
	*/	
	update(){
		// Comprobamos si la cámara ha avanzado lo suficiente como para que sea necesario crear un nuevo fondo
		if(this.cameras.main.scrollX >= this.initBG + this.bgSize * this.bgCount){
			this.bgCount += 1;
			this.addBGandDestroy(this.initBG + this.bgSize * (this.bgCount+1))
			// Si hemos avanzado lo suficiente y no hemos llegado al final creamos un nuevo enemigo (jarrón con fuego)
			// y además pintamos los metros que faltan
			if(this.metres - (this.bgCount + 1) * 10 >= 0){
				this.drawMetres(this.bgSize * (this.bgCount+1) - 60, this.metres - (this.bgCount+1) * 10);
				let fire = new Fire(this, this.bgSize * (this.bgCount + 1), 560);
				this.obstacles.add(fire);
			}
		}
	}
	
	/**
	* Método que añade una imagen al fondo del nivel
	* @params Number x - posición x donde debe añadirse la imagen de fondo.
	*/
	addBg(x){
		let bg = this.add.image(x, this.game.config.height, "background").setOrigin(0,1);
		bg.setDepth(-10)
		return bg;
	}
	
	/**
	* Añade una nueva imagen de fondo a la derecha de las ya existentes y elimina la que está más a la izquierda.
	* @params Number x - posición x donde debe añadirse la imagen de fondo.
	*/
	addBGandDestroy(x){
		console.log('x ',x)
		this.firstBG.destroy();
		this.firstBG = this.midBG;
		this.midBG = this.lastBG;
		this.lastBG = this.addBg(x)
	}
	
	/**
	* Evento de muerte del jugador
	* @params Player player - jugador
	* @params Object obstacle - obtáculo que ha colisionado con el jugador
	*/
	playerDeath(player, obstacle){
		this.hud.removeTimersAndListeners();
		if(player.parentContainer !== null){
			if(!player.parentContainer.isDead()){
				player.parentContainer.die()
			}
		} else if(!player.isDead()){
			player.die()
		}
			
	}
	
	/**
	* Evento de ganar
	* @params Player player - jugador
	* @params Platform platform - plataforma que indica el final del nivel
	*/
	win(player, platform){
		this.music.stop();
		player.win(platform);
	}
	
	/**
	* Método auxiliar que indica la posición final del nivel
	* Es usada por los anillos de fuego para calcular cuando deben dejar de aparecer
	*/
	getGoalX(){
		return this.finalPos;
	}
	
	/**
	* Método que dibuja el cartel de los metros recorridos en el nivel
	* @params Number x - posición del cartel
	* @params Number metres - metros recorridos
	*/
	drawMetres(x, metres){
		// Posición Y del cartel
		let y = this.game.config.height-50
		
		// Rectángulos negro con borde rojo
		let r2 = this.add.rectangle(x, y, 120, 50, 0x000000);
		r2.setStrokeStyle(4, 0xff1010);
		
		// Texto con los metros
		let t = this.add.text(x, y, `${metres}M`, { fontFamily: 'arcade_classic', fontSize: 26, color: '#ff1010' });
		t.setOrigin(0.5, 0.5).setAlign("center");
	}
  
}