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
      this.load.image('background', 'images/background.png');
      this.load.image('bullet', 'images/bullet.png');

      
      // Sprites
      this.load.spritesheet('twinbee', 'images/twinbee.png', { frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('winbee', 'images/winbee.png', { frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('enemy', 'images/enemy.png', { frameWidth: 16, frameHeight: 16 });

      this.load.spritesheet('greenbell', 'images/greenbell.png', { frameWidth: 16, frameHeight: 16 });
       
	// Audio
	this.load.audio("explosion", "sounds/explosion.wav");
    }
  
    /**
     * Creación de la escena. Creamos todas las animaciones que usaremos y pasamos a la escena del menú
     */
    create() {
      this.anims.create({
        key: 'twinbee_idle',
        frames: this.anims.generateFrameNames('twinbee', { start: 0, end: 0 }),
        frameRate: 0,
        repeat: 0
      });

      this.anims.create({
        key: 'twinbee_left',
        frames: this.anims.generateFrameNames('winbee', { start: 1, end: 1 }),
        frameRate: 0,
        repeat: 0
      });
      this.anims.create({
        key: 'twinbee_right',
        frames: this.anims.generateFrameNames('winbee', { start: 2, end: 2 }),
        frameRate: 0,
        repeat: 0
      });

      this.anims.create({
        key: 'winbee_idle',
        frames: this.anims.generateFrameNames('winbee', { start: 0, end: 0 }),
        frameRate: 0,
        repeat: 0
      });

      this.anims.create({
        key: 'winbee_left',
        frames: this.anims.generateFrameNames('winbee', { start: 1, end: 1 }),
        frameRate: 0,
        repeat: 0
      });
      this.anims.create({
        key: 'winbee_right',
        frames: this.anims.generateFrameNames('winbee', { start: 2, end: 2 }),
        frameRate: 0,
        repeat: 0
      });

      this.anims.create({
        key: 'enemy_idle',
        frames: this.anims.generateFrameNames('enemy', { start: 0, end: 3 }),
        frameRate: 0,
        repeat: 0
      });
      
      
      
      this.scene.start('title');
    }
  }