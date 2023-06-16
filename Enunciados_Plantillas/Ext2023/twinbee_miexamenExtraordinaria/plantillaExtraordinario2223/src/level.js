import Player from './player.js';
import Enemy from './enemy.js';
// import Floor from './floor.js';
// import Fire from './fire.js';
// import Platform from './winplatform.js';
// import HUD from './scoreHUD.js';

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
		this.initBG = 300; // Posición inicial del fondo
		this.bgSize = 800; // Tamaño horizontal de cada imagen que compone el fondo
        this.playerNum;

        this.bgSpeed = 0.5; //velocidad a la que se mueve el background
        this.background;
        this.bgLength
        this.player, this.player2;

        this.enemyColdown = 50;
        this.enemyTimer = 0;
        this.win = false;
        this.lose = false;

	}
	
	/**
	* Configuramos la puntuación y los metros a recorrer en base a la dificultad elegina en el Menú de juego.
	*/
	init (data) {
		this.playerNum = data.players;
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        
        this.win = false;
        this.lose = false;
        this.currentScore = this.add.text(this.game.config.width/2, 100, "", { fontFamily: 'gummy, monospace', fontSize: 48, color: '#ffffff' });

        this.currentScore.setOrigin(0.5, 0.5).setAlign("center");

        this.background = this.addBg(this.initBG)
        // this.add.image(0,0,'background').setOrigin(0,0);
        this.bgLength = this.background.height - 256 - 100;//altura de la imagen menos la altura de la pantalla + offset

       	/** Player **/
        if(this.playerNum === 1)
		this.player = new Player(this, 256/2, 256 - 30, 1);

        if(this.playerNum === 2){
		this.player = new Player(this, 256/2, 256 - 30, 1);
		this.player2 = new Player(this, 256/2, 256 - 30, 2);
        }

        this.allEnemies = this.add.group();



	}
	
	/**
	* Método update donde se tiene en cuenta la posición de la cámara para dibujar el fondo y los metros avanzados
	*/	
	update(){
        if(this.background.y <= this.bgLength) //mientras la pos sea mayor que la altura de la imagen menos la altura de la pantalla + offset
		    this.background.y += this.bgSpeed;
        else this.win = true;



          this.manageEnemies();


          //SI TERMINA EL JUEGO
            if(this.win || this.lose){
                this.destroyAllEnemies();

                if(this.win)
                    this.currentScore.text = "ganaste";
                else
                    this.currentScore.text = "moriste";
                 let tween = this.tweens.add({
                        targets: this.currentScore,
                        alpha: 0,
                        duration: 3000,
                        ease: 'Linear',
                        yoyo: true,
                        repeat: 0,
                        delay: 0
                    });
                tween.on('complete', () => this.scene.start('title'));
            } 
            
        }
            
        
	/**
	* Método que añade una imagen al fondo del nivel
	* @params Number x - posición x donde debe añadirse la imagen de fondo.
	*/
	addBg(x){
		let bg = this.add.image(0, 0, "background").setOrigin(0,0.8);
		bg.setDepth(-10)
		return bg;
	}
	
    addEnemy(){
        this.rnd= Phaser.Math.Between(16, 240);

        let enemy = new Enemy(this, this.rnd, 0);

        this.allEnemies.add(enemy);
    }

    destroyAllEnemies(){
       this.allEnemies.destroy();
    }

    manageEnemies(){
        if(!this.win && !this.lose){
            if(this.enemyTimer < this.enemyColdown){
                this.enemyTimer++;
            }
            else{
                this.enemyTimer = 0;
                this.addEnemy();
            }
        }
       
    }
    hasEnded(){
        return this.win && this.lose;
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
		player.die()
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