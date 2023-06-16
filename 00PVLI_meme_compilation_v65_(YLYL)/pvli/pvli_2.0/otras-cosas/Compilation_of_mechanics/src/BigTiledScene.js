import PlayerAnimations from './playerAnimations.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class BigTiledScene extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'bigtiledscene' });
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
    // Para coger el tamaño del canvas: BCS
    //let { width, height } = this.sys.game.canvas;    
    //    console.log(`Tamaño del canvas: ${width}, ${height})`);

    const speed = 100;

    this.backgroundImage = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.backgroundImage.setScale(3, 3);


    const mapd = this.make.tilemap({ key: 'large_map' });
    const tilesetd = mapd.addTilesetImage('tiles', 'dungeontiles');
    this.walls = mapd.createStaticLayer('paredes', tilesetd, 0, 0);
    this.objetos = mapd.createStaticLayer('objetos', tilesetd, 0, 0);
    //this.platforms2.setCollisionByExclusion(-1);
    this.walls.setCollisionByProperty({ collision: true });
    this.objetos.setCollisionByProperty({ collision: true });

    this.debugDraw(this.walls, this);
    this.debugDraw(this.objetos, this);

    //Mundo más grande que canvas
    let width = this.walls.width;
    let height = this.walls.height;

    this.physics.world.setBounds(
      0, 0, // x, y
      width, height // width, height
    )

    this.player = new PlayerAnimations(this, width / 2, height);



    this.physics.add.collider(this.player, this.walls, this.onWallCollide);
    this.physics.add.collider(this.player, this.objetos);
    console.log('Establecido collider 2');

    //CAMARAS
    // this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
    // this.cameras.main.setViewport(0, 0, 400, 400);
    // this.cameras.main.startFollow(this.player);
    this.configCameraForScroll();

  }

  onWallCollide(p, w)
  {
    /*    const margen= 50;
        if (p.x < margen)
          p.x= p.scene.scale.width - margen - 10;
        if (p.x > p.scene.scale.width - margen){
          console.log("saliendo por la derecha");
          p.x= margen+ 10;
        }
      */
  }

  //Configuración de la camara principal :BCS 
  configCameraForScroll()
  {

    let { width, height } = this.sys.game.canvas;
    //Para que no se salga de los límites del mundo
    console.log(`Tamaño del canvas: (${width}, ${height})`);
    console.log(`Tamaño del scale: (${this.scale.width}, ${this.scale.height})`);

    this.cameras.main.setBounds(0, 0, this.walls.width, this.walls.height);

    //this.cameras.main.setViewport(0, 0, 600, 500);
    //Para que siga al jugador
    this.cameras.main.startFollow(this.player);
    console.log(`startFollow`);
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

