import Hook from './hook.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class PlayerShoot extends Phaser.GameObjects.Sprite
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
    this.score = 0;
    this.lives = 3;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);

    this.body.setAllowGravity(false);

    //Ajustamos el tamaño del collider. BCS

    this.body.setSize(this.width * 0.5, this.height * 0.8)
    //this.body.setSize(30, 50);
    this.body.offset.y = 0;

    // Queremos que el jugador no se salga de los límites del mundo
    // IMPORTANTE: No ponerlo para mundos más grandes que la vista. BCS
    // Se puede poner si cambiamos lo limites del mundo:
    // this.physics.world.setBounds(
    //   0, 0, // x, y
    //   width, height // width, height
    //   )
    this.body.setCollideWorldBounds();

    // this.body.setBounce(0.1); 1 para rebote sin perder velocidad

    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 8, end: 14 }),
      frameRate: 5, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.play('idle');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 72, end: 75 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 92, end: 95 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 92, end: 95 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 72, end: 75 }),
      frameRate: 10,
      repeat: -1
    });


    this.shootEnabled = true;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la scene (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

    //console.log(`Player (${this.x}, ${this.y})`);
    // if (this.cursors.up.isDown && this.body.onFloor()) {
    //   this.body.setVelocityY(this.jumpSpeed);
    // }
    if (this.aKey.isDown)
    {
      this.play('left', true);
      this.body.setVelocityX(-this.speed);

    }
    else if (this.dKey.isDown)
    {
      this.body.setVelocityX(this.speed);
      this.play('right', true);
    }
    else if (this.sKey.isDown)
    {
      this.body.setVelocityY(this.speed);
      this.play('up', true);
    }
    else if (this.wKey.isDown)
    {
      this.body.setVelocityY(-this.speed);
      this.play('down', true);
    }
    else if (this.esc.isDown)
    {
      this.scene.scene.start('mainmenu');
    }
    else
    {
      this.body.setVelocity(0, 0);
      this.play('idle', true);
      //this.body.offset.x= 10;
    }

    if (this.space.isDown && this.shootEnabled)
    {
      let hook = new Hook(this.scene, this.x, this.y);

      this.scene.hooks.add(hook);

      this.shootEnabled = false;

      let myTimeout = setTimeout(this.enableShoot, 100, this);
    }

    // if (this.scene.physics.overlap(this.scene.bubbles, this)) {

    //   this.decreaseLives();
    // }
  }

  enableShoot(player)
  {
    player.shootEnabled = true;
  }

  decreaseLives()
  {
    this.lives--;
    console.log(`lives: ${this.lives}`);

    if (this.lives <= 0)
    {
      this.scene.scene.start('mainmenu');
      //this.destroy();
    }
  }
}
