import PlayerBee from './playerBee.js';

export default class ScrollScene extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'scrollscene' });

  }

  /**
 * Creación de los elementos de la escena principal de juego
 */
  create()
  {
    const { width, height } = this.scale;

    this.addParallaxBG();

    this.lives = 2;
    this.label = this.add.text(10, 30, "").setOrigin(0, 0).setScrollFactor(0, 0);
    this.updateLives();

    // Establecemos los limites del mundo. El ancho lo ponemos a infinito. El alto a la dimensión del gráfico menos 10
    this.physics.world.setBounds(
      0, 0, // x, y
      Number.MAX_SAFE_INTEGER, height - 10 // width, height
    )

    this.player = new PlayerBee(this, 400, 500);

    this.flowers = this.add.group();
    this.loopCreateFlowers();
    this.physics.add.collider(this.player, this.flowers, this.player.pickUpFlower);

    this.configCameraForScroll();

    this.flowerInProgress = false;
  }

  // Si se quiere que no haya Parallax, se pone el ratio a 0
  addParallaxBG()
  {
    const { width, height } = this.scale;
    this.backgrounds = [];
    // Añadimos los fondos
    this.backgrounds.push(
      {
        ratioX: 0, //movimiento en horizontal
        sprite: this.add.tileSprite(0, 0, width, height, 'sky')
          .setOrigin(0, 0)
          .setScrollFactor(0, 0)

      }
    );
    this.backgrounds.push(
      {
        ratioX: 0.4, //movimiento en horizontal
        sprite: this.add.tileSprite(0, 0, width, height, 'skyline')
          .setOrigin(0, 0)
          .setScrollFactor(0, 0)
      }
    );
    this.backgrounds.push(
      {
        ratioX: 1.2, //movimiento en horizontal
        sprite: this.add.tileSprite(0, 0, width, height, 'green')
          .setOrigin(0, 0)
          .setScrollFactor(0, 0)
          .setDepth(1) //Trae el sprite al frente
      }
    );

  }

  updateLives()
  {
    this.label.text = 'Lives: ' + this.lives;
  }

  //Configuración de la camara principal  
  configCameraForScroll()
  {
    //Para que siga al jugador
    this.cameras.main.startFollow(this.player);

    //Para que no se salga de los límites del mundo
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.scale.height);
  }

  // Test create simple sprite 
  createFlower(posX)
  {
    console.log("creando flor en ", posX);
    let flower = this.physics.add.sprite(posX, Phaser.Math.RND.between(150, 530), 'flower')
      .setCollideWorldBounds(true).setDepth(2);

    this.myTimeout = this.time.addEvent({
      delay: Phaser.Math.RND.between(2000, 4000),                // ms
      callback: this.createFlower,
      args: [this.player.x + 1800],
      callbackScope: this,
      loop: false
    });

    flower.body.setVelocityX = -5;
    flower.body.setAllowGravity(false);

    this.flowers.add(flower);

    this.physics.add.collider(this.player, this.flowers, this.player.pickUpFlower);
  }

  loopCreateFlowers()
  {
    this.myTimeout = this.time.addEvent({
      delay: Phaser.Math.RND.between(2000, 4000),                // ms
      callback: this.createFlower,
      args: [this.player.x + 1800],
      callbackScope: this,
      loop: false
    });
  }

  endCreateFlowers()
  {
    clearTimeout(this.myTimeout);
  }

  getRandomTime(min, max) 
  {
    let num = Math.random();
    return Math.floor((num + min) * max);
  }

  lose()
  {
    let estilo = {
      fontFamily: 'Play',
      fontSize: '60px',
      color: '#ff0000'
    };
    this.add.rectangle(this.player.x - 150, 200, 360, 80, 0xffb24e).setOrigin(0, 0).setDepth(1);
    this.add.text(this.player.x - 150, 200, "GAME OVER", estilo).setDepth(1);

    this.scene.pause();
  }

  win()
  {
    let estilo = {
      fontFamily: 'Play',
      fontSize: '60px',
      color: '#1020DD'
    };
    this.add.rectangle(this.player.x - 150, 200, 300, 80, 0x38a7f1).setOrigin(0, 0).setDepth(1);
    this.add.text(this.player.x - 150, 200, "YOU WON", estilo).setDepth(1);

    this.scene.pause();
  }

  update()
  {

    for (let i = 0; i < this.backgrounds.length; ++i)
    {
      const bg = this.backgrounds[i];
      bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX;
    }

    this.flowers.children.iterate(child =>
    {
      if (child != null)
      {
        if (child.body.x < this.player.x - this.player.width * 1.5)
        {
          child.destroy();
          this.lives--;
          this.updateLives();

          if (this.lives <= 0)
            this.lose();
        }
      }

    })

    if (this.player.flowers == 5)
      this.win();

  }
}