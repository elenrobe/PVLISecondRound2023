import Ball from './ball.js';
import PlayerCross from './playerCross.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class BallsScene extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'ballsscene' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    //FONDO
    this.add.rectangle(0, 0, 640, 640, 0xffffff).setOrigin(0, 0);

    this.numIniBalls = 1;
    this.collisions = this.numIniBalls * 7;
    this.time = 30;
    this.collisionEnabled = true;

    let estilo = {
      fontFamily: 'Play',
      fontSize: '20px',
      color: '#1020DD'
    };
    this.labelTime = this.add.text(34, 34, "", estilo);
    this.labelCollisions = this.add.text(134, 34, "", estilo);

    this.myTimeout = this.sys.time.addEvent({
      delay: 1000,                // ms
      callback: this.updateTime,
      args: [],
      callbackScope: this,
      loop: true
    });

    this.labelTime.text = "Time: " + this.time;
    this.updateCollisions();

    /*
    //CON RECTANGULOS
    this.walls = this.add.group();

    this.walls.add(this.add.rectangle(0, 0, 640, 32, 0x0000ff).setOrigin(0,0));
    this.walls.add(this.add.rectangle(0, 640 - 32, 640, 32, 0x0000ff).setOrigin(0,0));
    this.walls.add(this.add.rectangle(0, 0, 32, 640, 0x0000ff).setOrigin(0,0));
    this.walls.add(this.add.rectangle(640 - 32, 0, 32, 640, 0x0000ff).setOrigin(0,0));


    //ITERAR UN GRUPO
    this.walls.children.iterate(child =>
    {
      this.add.existing(child);
      this.physics.add.existing(child);
    })    
    */

    //CON TILEMAP
    const mapd = this.make.tilemap({ key: 'balls_map' });
    const tilesetd = mapd.addTilesetImage('spritesheet_ball');
    this.walls = mapd.createStaticLayer('paredes', tilesetd, 0, 0);

    this.walls.setCollisionByExclusion(-1, true);
    //this.debugDraw(this.walls, this);

    this.player = new PlayerCross(this, 200, 200);

    this.physics.add.collider(this.player, this.walls);

    this.balls = this.add.group();
    this.createBalls(this.numIniBalls, 1, 300, 300); //Add random

    this.physics.add.collider(this.player, this.balls, this.divideBall);
    this.physics.add.collider(this.walls, this.balls);
  }

  createBalls(numBalls, size, posX, posY)
  {
    for (let i = 0; i < numBalls; i++)
    {
      let ball = new Ball(this, posX + i * 10, posY + i * 10, size);
      this.balls.add(ball);
    }

  }

  updateTime()
  {
    if (this.time > 0)
    {
      this.time--;
      this.labelTime.text = "Time: " + this.time;

      if (this.time == 0)
      {
        this.checkWin();
      }
    }
  }

  updateCollisions()
  {
    this.labelCollisions.text = "Collisions: " + this.collisions;
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

  divideBall(player, ball)
  {
    console.log("collide with ball");

    if (!player.scene.collisionEnabled)
      return;

    player.scene.collisions--;
    player.scene.updateCollisions();

    if (ball.size > 0.25)
    {
      player.scene.collisionEnabled = false;
      ball.scene.createBalls(2, ball.size / 2, ball.x, ball.y);
      ball.destroy();

      player.scene.sys.time.addEvent({
        delay: 1000,                // ms
        callback: player.scene.enableCollision,
        args: [],
        callbackScope: player.scene,
        loop: false
      });
    }
    else
    {
      ball.destroy();

      player.scene.checkWin();
    }
  }

  checkWin()
  {
    if (this.balls.getLength() == 0)
    {
      console.log("Win");
      let estilo = {
        fontFamily: 'Play',
        fontSize: '60px',
        color: '#1020DD'
      };
      this.add.rectangle(190, 250, 300, 80, 0x38a7f1).setOrigin(0, 0);
      this.add.text(200, 250, "YOU WON", estilo);

      this.pauseGame();
    }
    else if (this.time <= 0)
    {
      console.log("Lose");
      let estilo = {
        fontFamily: 'Play',
        fontSize: '60px',
        color: '#ff0000'
      };
      this.add.rectangle(190, 250, 360, 80, 0xffb24e).setOrigin(0, 0);
      this.add.text(200, 250, "GAME OVER", estilo);

      this.pauseGame();
    }
  }

  enableCollision()
  {
    this.collisionEnabled = true;
  }

  pauseGame()
  {
    this.player.body.setVelocity(0, 0);
    this.player.inputEnabled = false;

    this.balls.children.iterate(child =>
    {
      child.body.setVelocity(0, 0);
    })
  }
}