import PlayerAnimations from './playerAnimations.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class TiledScene extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'tiledscene' });
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
    /*
        this.physics.world.setBounds(
          0, 0, // x, y
          1000, 1000 // width, height
          )*/
    const speed = 100;

    const backgroundImage = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    backgroundImage.setScale(4, 4);
    const enableNivel1 = false;


    const mapd = this.make.tilemap({ key: 'mapa' });
    const tilesetd = mapd.addTilesetImage('map_pattern', 'dungeontiles');
    this.walls = mapd.createStaticLayer('Paredes', tilesetd, 0, 0);
    this.plataformas = mapd.createStaticLayer('Plataformas', tilesetd, 100, -200);
    //this.platforms2.setCollisionByExclusion(-1);
    this.walls.setCollisionByProperty({ collision: true });
    this.plataformas.setCollisionByProperty({ collision: true });

    this.debugDraw(this.walls, this);
    this.debugDraw(this.plataformas, this);

    this.player = new PlayerAnimations(this, this.scale.width / 2, this.scale.height - 50);

    this.physics.add.collider(this.player, this.walls, this.onWallCollide);
    this.physics.add.collider(this.player, this.plataformas);
    console.log('Establecido collider 2');

    //CAMARAS
    // this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    // this.cameras.main.setViewport(0, 0, 400, 400);
    // this.cameras.main.startFollow(this.player);
    //this.configCameraForScroll();

  }

  onWallCollide(p, w)
  {
    const margen = 50;
    if (p.x < margen)
      p.x = p.scene.scale.width - margen - 10;
    if (p.x > p.scene.scale.width - margen)
    {
      console.log("saliendo por la derecha");
      p.x = margen + 10;
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

