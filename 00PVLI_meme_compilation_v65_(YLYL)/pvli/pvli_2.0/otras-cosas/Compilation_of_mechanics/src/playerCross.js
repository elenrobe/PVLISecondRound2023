export default class PlayerCross extends Phaser.GameObjects.Sprite
{
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y)
  {
    super(scene, x, y, 'balls_sprite');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    this.inputEnabled = true;

    this.setOrigin(0.5, 0.5);

    this.body.offset.y = 0;

    this.body.setBounce(0.1);

    this.speed = 300;
    this.jumpSpeed = -400;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('balls_sprite', { start: 1, end: 4 }),
      frameRate: 8, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.play('idle');

    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('balls_sprite', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    });
  }

  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

    if (this.inputEnabled)
    {
      if (this.cursors.left.isDown)
      {
        this.play('move', true);
        this.body.setVelocityX(-this.speed);

      }
      else if (this.cursors.right.isDown)
      {
        this.body.setVelocityX(this.speed);
        this.play('move', true);
      }
      else
      {
        this.body.setVelocityX(0);
      }

      if (this.cursors.down.isDown)
      {
        this.body.setVelocityY(this.speed);
        this.play('move', true);
      }
      else if (this.cursors.up.isDown)
      {
        this.body.setVelocityY(-this.speed);
        this.play('move', true);
      }
      else if (!this.cursors.left.isDown && !this.cursors.right.isDown)
      {
        this.body.setVelocity(0, 0);
        this.play('idle', true);
      }
      else
      {
        this.body.setVelocityY(0);
      }
    }

    if (this.space.isDown)
      this.scene.scene.restart('ballsScene');
    else if (this.esc.isDown)
    {
      this.scene.scene.start('mainmenu');
    }
  }
}
