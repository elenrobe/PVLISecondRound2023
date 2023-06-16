import Bomb from "./bomb.js";

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de ciudadanos que ha salvado hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite
{
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y)
  {
    super(scene, x, y, 'playeranim');

    this.myHeight = 12;
    this.lose = false;

    this.citizens = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.inputEnabled = true;
    this.shootEnabled = true; //Si no está en cooldown

    this.citizensText = this.scene.add.text(this.x - this.width, this.y - this.height, "");
    this.citizensText.setScale(0.5, 0.5);

    this.body.setCollideWorldBounds();

    this.speed = 100;

    this.body.pushable = false;

    this.dir = [0, 1];

    // Esta label es la UI en la que pondremos la puntuación del jugador

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.zKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 9, end: 11 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.play('down');
  }

  pickUpCitizen(player, citizen)
  {
    player.scene.pick.play();
    citizen.destroy();
    player.citizens++;
  }

  updateCitizens()
  {
    this.citizensText.x = this.x - this.width;
    this.citizensText.y = this.y - this.height;

    this.citizensText.text = this.citizens + "/" + this.scene.numCitizens;
  }

  enableShoot()
  {
    this.shootEnabled = true;
  }

  playerLose()
  {
    this.lose = true;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

     if (this.inputEnabled)
     {
       if (this.cursors.left.isDown)
       {
         this.dir[0] = -1;
         this.play('left', true);
         this.body.setVelocityX(-this.speed);
       }
       else if (this.cursors.right.isDown)
       {
         this.dir[0] = 1;
         this.play('right', true);
         this.body.setVelocityX(this.speed);
       }
       else
       {
        this.body.setVelocityX(0);

        if (this.body.velocity.y != 0)
        this.dir[0] = 0;
       }

      if (this.cursors.down.isDown)
      {
        this.dir[1] = 1;
        this.play('down', true);
        this.body.setVelocityY(this.speed);
      }
      else if (this.cursors.up.isDown)
      {
        this.dir[1] = -1;
        this.play('up', true);
        this.body.setVelocityY(-this.speed);
      }
      else if (!this.cursors.left.isDown && !this.cursors.right.isDown)
      {
        this.body.setVelocity(0, 0);
      }
      else
      {
        if (this.body.velocity.x != 0)
          this.dir[1] = 0;
        this.body.setVelocityY(0);
      }
    }

    if (this.zKey.isDown && this.shootEnabled)
    {
      this.scene.shoot.play();
      
      let bomb = new Bomb(this.scene, this.x, this.y);

      this.scene.bombs.add(bomb);

      this.shootEnabled = false;

      let myTimeout = this.scene.time.addEvent({
        delay: 200,                // ms
        callback: this.enableShoot,
        args: [],
        callbackScope: this,
        loop: false
      });
    }

    if (this.esc.isDown)
    {
      this.scene.scene.start('menu');
    }

    this.updateCitizens();

    if (this.lose)
    {
      this.angle += 10;
    }
  }
}
