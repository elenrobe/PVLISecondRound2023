
/**
 * Escena de menú juego. El juego tienes 3 dificultades (Fácil, Medio, Difícil)
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'menu' });
  }

  /**
   * Creación de los elementos de la escena de menú que consiste en 3 botones y un título
   */
  create() {
	// Título de juego
	this.add.image(this.game.config.width/2, 250,"stars").setOrigin(0.5,0.5).setScale(4,4);
	
    this.titulo = this.add.text(this.game.config.width/2, 250, "Circus", { fontFamily: 'arcade_classic, monospace', fontSize: 40, color: '#ffffff' });
    this.titulo.setOrigin(0.5, 0.5).setAlign("center");

	// Botones del menú para jugar
    this.crearBoton(this.game.config.height/2+50, "Easy", 50);
    this.crearBoton(this.game.config.height/2+100, "Normal", 100);
    this.crearBoton(this.game.config.height/2+150, "Hard", 200);
	
	// Iniciamos la música del menú en bucle
	this.music = this.sound.add("menu");
	this.music.setLoop(true);
	this.music.play();
  
  }

  /**
   * Función para crear cada uno de los botones
   * @params Number y - Posición desde abajo del botón
   * @params String text - Texto del botón
   * @params Number metres - Metros a recorrer en el menú (representa la dificultad)
   */
  crearBoton(y, text, metres) {
    let button = this.add.text(this.game.config.width/2, y, text, { fontFamily: 'arcade_classic, monospace', fontSize: 24, color: '#ffffff' });
    button.setOrigin(0.5, 0.5).setAlign("center");
    button.setInteractive();
    button.on("pointerdown", ()=> {
		this.music.stop(); //Es necesario detener la música para que no siga sonando en la siguiente escena
		this.scene.start("level", { metres: metres });
		
	});
    return button;
  }
  
}