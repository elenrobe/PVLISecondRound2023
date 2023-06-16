/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/');
	
	// Images
	this.load.image('stars', 'sprites/stars.png');
	this.load.image('background', 'sprites/background.png');
    this.load.image('platform', 'sprites/platform.png');
	
	// Sprites
	this.load.spritesheet('clown', 'sprites/clown.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('fire', 'sprites/fire.png', { frameWidth: 25, frameHeight: 31 });
    this.load.spritesheet('lion', 'sprites/lion.png', { frameWidth: 36, frameHeight: 16 });
	this.load.spritesheet('ring', 'sprites/ring.png', { frameWidth: 26, frameHeight: 80 });
    
	// Audio
	this.load.audio("fail", "sounds/failure.mp3");
    this.load.audio("stage", "sounds/stage.mp3");
    this.load.audio("menu", "sounds/menu.mp3");
	this.load.audio("jump", "sounds/jump.wav");
	this.load.audio("win", "sounds/final.wav");
	this.load.audio("score", "sounds/score.wav");
  }

  /**
   * Creación de la escena. Creamos todas las animaciones que usaremos y pasamos a la escena del menú
   */
  create() {
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNames('clown', { start: 0, end: 0 }),
      frameRate: 0,
      repeat: 0
    });
	
	this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNames('clown', { start: 1, end: 1 }),
      frameRate: 0,
      repeat: 0
    });
	
	this.anims.create({
      key: 'player_win',
      frames: this.anims.generateFrameNames('clown', { start: 2, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
	
	this.anims.create({
      key: 'player_dead',
      frames: this.anims.generateFrameNames('clown', { start: 4, end: 4 }),
      frameRate: 0,
      repeat: 0
    });
  
	this.anims.create({
      key: 'lion_idle',
      frames: this.anims.generateFrameNames('lion', { start: 2, end: 2 }),
      frameRate: 0,
      repeat: 0
    });
	
	this.anims.create({
      key: 'lion_run',
      frames: this.anims.generateFrameNames('lion', { start: 1, end: 2 }),
      frameRate: 7,
      repeat: -1
    });
	
	this.anims.create({
      key: 'lion_jump',
      frames: this.anims.generateFrameNames('lion', { start: 0, end: 0 }),
      frameRate: 0,
      repeat: 0
    });
	
	this.anims.create({
      key: 'lion_dead',
      frames: this.anims.generateFrameNames('lion', { start: 3, end: 3 }),
      frameRate: 0,
      repeat: 0
    });
	
	this.anims.create({
      key: 'fire_jar',
      frames: this.anims.generateFrameNames('fire', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });
		
	this.anims.create({
      key: 'fire_ring',
      frames: this.anims.generateFrameNames('ring', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });
	
	
    this.scene.start('menu');
  }
}