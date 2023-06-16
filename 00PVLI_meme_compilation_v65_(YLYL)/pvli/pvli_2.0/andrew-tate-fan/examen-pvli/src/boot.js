/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload()
  {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación

    this.load.setPath('assets/sprites/spritesheets/');
    this.load.spritesheet('playeranim',
      'player_spritesheet.png',
      { frameWidth: 7, frameHeight: 12 });

    this.load.spritesheet('lady_spritesheet', 'lady_spritesheet.png',
      { frameWidth: 7, frameHeight: 14 });

    this.load.spritesheet('enemy_spritesheet', 'enemy_spritesheet.png', 
    {frameWidth: 9, frameHeight: 13 });

    this.load.spritesheet('explosion_spritesheet', 'explosion_spritesheet.png',
    { frameWidth: 15, frameHeight: 15 });

    this.load.setPath('assets/sprites/');
    this.load.spritesheet('bomb', 'sprites.png',
    { frameWidth: 9, frameHeight: 9 });

    //Sonido
    this.load.setPath('assets/sounds/');
    this.load.audio('explosion', 'explosion.wav');
    this.load.audio('pick', 'pick.wav');
    this.load.audio('win', 'win.wav');
    this.load.audio('lose', 'lose.wav');
    this.load.audio('shoot', 'shoot.wav');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create()
  {
    this.scene.start('menu');
  }
}