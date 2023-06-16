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

    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.image('hook', 'tip.png');
    this.load.spritesheet('playeranim',
      'NicePng_sprite-png_2007324.png',
      { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('guy', 'guy1400.png',
      { frameWidth: 200, frameHeight: 342 });

    this.load.spritesheet('botones', 'botones.png', {
      frameWidth: 240,
      frameHeight: 48
    });

    //JETPAC
    this.load.image('fuel', 'fuel.png');
    this.load.image('spaceship', 'spaceship.png');
    this.load.image('jetpac_tiles', 'tileset.png');
    this.load.image('dungeontiles', 'dungeon_tiles.png');
    this.load.image('black_tiles', 'Black.png');
    this.load.spritesheet('player', 'jetpac.png',
      { frameWidth: 17, frameHeight: 24 });
    this.load.spritesheet('explosion', 'explosion.png',
      { frameWidth: 24, frameHeight: 17 });
    this.load.spritesheet('meteor', 'meteor.png',
      { frameWidth: 16, frameHeight: 14 });

    //BEE
    this.load.image('flower', 'flower64x64.png');

    this.load.spritesheet('bee', 'bee.png',
      { frameWidth: 100, frameHeight: 55 });

    this.load.image('green', 'green_1000.png');
    this.load.image('skyline', 'skyline_1000.png');

    //Cargamos los fondos
    this.load.image('sky', 'sky-clouds.jpg');
    this.load.image('mountains', 'mountains1000.png');
    this.load.image('menuprincipal', 'menuprincipal.png');

    this.load.image('spritesheet_ball', 'spritesheet_ball.png');
    this.load.image('ball', 'ball.png');

    this.load.spritesheet('balls_sprite',
      'spritesheet_cruz.png',
      { frameWidth: 32, frameHeight: 32 });

    //Sonido
    this.load.setPath('assets/audio/');
    this.load.audio('explosion', 'explosion.wav');
    this.load.audio('explosion2', 'explosion.mp3');
    this.load.audio('drop', 'drop.wav');
    this.load.audio('pick', 'pick.wav');
    this.load.audio('win', 'win.wav');
    this.load.audio('lose', 'lose.wav');

    //Tiled
    this.load.setPath('assets/map/');
    this.load.image('dungeontiles', 'dungeon_tiles.png');
    this.load.tilemapTiledJSON('mapa', 'mapa.json');
    this.load.tilemapTiledJSON('dungeonHidden', 'midungeon_paredoculta.json');
    this.load.tilemapTiledJSON('large_map', 'large_map.json');
    this.load.tilemapTiledJSON('balls_map', 'balls_map.json');
    this.load.tilemapTiledJSON('map', 'space_map.json');
    this.load.audio('explosion', 'explosion.wav');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create()
  {
    this.scene.start('mainmenu');
  }
}