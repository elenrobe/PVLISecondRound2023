import Player from "./player.js";
import Meteor from "./meteor.js";
import Spaceship from "./spaceship.js";
import Fuel from "./fuel.js";

export default class Space extends Phaser.Scene 
{
  /**
   * Constructor de la escena
   */
  constructor() 
  {
    super({ key: 'space' });
  }

  create(paramNivel)
  {
    this.cdMeteors = paramNivel.cdMeteors;
    this.numFuel = paramNivel.numFuel;

    this.explosion = this.sound.add('explosion');
    this.pick = this.sound.add('pick');
    this.drop = this.sound.add('drop');
    this.win = this.sound.add('win');
    this.lose = this.sound.add('lose');

    this.loadMap();

    this.player = new Player(this, 50, 150);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.walls, this.onWallCollision);

    this.newFuel();

    this.meteors = this.add.group();

    this.myTimeout = this.time.addEvent({
      delay: this.cdMeteors,                // ms
      callback: this.createMeteor,
      args: [],
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.meteors, this.walls, this.onWallCollision);
    this.physics.add.collider(this.meteors, this.platforms, this.explodeMeteor);

    this.spaceship = new Spaceship(this, 165, 159, this.numFuel);
    this.physics.add.collider(this.spaceship, this.player, this.spaceship.loadFuel);
    this.physics.add.collider(this.spaceship, this.platforms);

    this.physics.add.collider(this.meteors, this.player, this.explodePlayer);
  }

  loadMap()
  {
    const mapd = this.make.tilemap({ key: 'map' });
    const tilesetd = mapd.addTilesetImage('jetpac_tiles');
    const tileset2 = mapd.addTilesetImage('black_tiles');
    this.walls = mapd.createStaticLayer('paredes', tileset2, 0, 0);
    this.platforms = mapd.createStaticLayer('suelo', tilesetd, 0, 0);

    this.walls.setCollisionByProperty({ collision: true });
    this.platforms.setCollisionByProperty({ collision: true });

    //this.debugDraw(this.walls, this);
    //this.debugDraw(this.platforms, this);
  }

  createMeteor()
  {
    let x = Phaser.Math.Between(0, 230);
    let y = Phaser.Math.Between(-10, 10);

    console.log(`Meteor ${x},${y}`);
    let meteor = new Meteor(this, x, y);

    this.meteors.add(meteor);
  }

  newFuel()
  {
    let randX = Phaser.Math.Between(0, 245);
    let randY = Phaser.Math.Between(0, 180);
    this.fuel = new Fuel(this, randX, randY);
    this.physics.add.collider(this.player, this.fuel, this.pickUpFuel);
  }

  pickUpFuel(player, fuel)
  {
    player.pickUpFuel(player, fuel);
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

  onWallCollision(p, w)
  {
    const margen = 17;
    if (p.x < margen)
      p.x = p.scene.scale.width - margen;
    if (p.x > p.scene.scale.width - margen)
    {
      console.log("saliendo por la derecha");
      p.x = margen;
    }

    if (p.speedX != 0)
      p.body.setVelocityX(p.speedX);
  }

  explodeMeteor(meteor, platform)
  {
    meteor.scene.explosion.play(); //???
    meteor.explode();
  }

  explodePlayer(meteor, player)
  {
    player.scene.lose.play();
    meteor.explode();
    player.destroy();
    meteor.scene.timeoutToMenu();
    // meteor.scene.scene.pause('space');
  }

  timeoutToMenu()
  {
    this.myTimeout = this.time.addEvent({
      delay: 2000,                // ms
      callback: this.toMenu,
      args: ['menu'],
      callbackScope: this,
      loop: false
    });
  }

  toMenu()
  {
    console.log("to menu");
    this.scene.start('menu');
  }
}