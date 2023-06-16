import PlayerAnimations from './playerAnimations.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class TiledSceneHidden extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'tiledscenehidden' });
  }


  choque(o1, o2)
  {
    console.log('Han chocado');
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create()
  {

    this.physics.world.setBounds(
      -100, 0, // x, y
      1000, this.scale.height - 10 // width, height
    )
    const speed = 100;

    const backgroundImage = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    backgroundImage.setScale(4, 4);
    const enableNivel1 = false;


    const mapd = this.make.tilemap({ key: 'dungeonHidden' });
    const tilesetd = mapd.addTilesetImage('dungeon', 'dungeontiles');
    this.walls = mapd.createStaticLayer('mywalls', tilesetd, 0, 0);
    //this.platforms2.setCollisionByExclusion(-1);
    this.walls.setCollisionByProperty({ collides: true });
    this.portales = mapd.createStaticLayer('portales', tilesetd, 0, 0);
    this.portales.setCollisionByProperty({ collides: true });
    this.debugDraw(this.portales, this);

    this.player = new PlayerAnimations(this, this.scale.width / 2, this.scale.height - 50);

    this.physics.add.collider(this.player, this.portales, this.onPortalCollide);
    console.log('Establecido collider 2');

    this.cameras.main.setViewport(-50, 0, 400 + 50, 400);
    //this.configCameraForScroll();

  }

  onPortalCollide(p, w)
  {
    const margen = p.width;
    console.log("Collide " + p.x + " margen=" + margen);

    if (p.x < p.scene.scale.width / 2)
    {
      console.log("saliendo por la izquierda");
      p.x = p.scene.scale.width + 50;
    }
    else if (p.x > p.scene.scale.width / 2)
    {
      console.log("saliendo por la derecha");
      p.x = 0 + margen;
    }

  }

  //Configuración de la camara principal  
  configCameraForScroll()
  {
    let { width, height } = this.sys.game.canvas;
    //Para que no se salga de los límites del mundo
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    this.cameras.main.setViewport(0, 0, 600, 500);
    //Para que siga al jugador
    this.cameras.main.startFollow(this.player);
  }


  debugDraw(layer, scene)
  {
    const debugGraphics = scene.add.graphics().setAlpha(0.7)
    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    })
  }
}

