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
    super(scene, x, y, 'player');
    this.fuel = false;
    this.myHeight = 30;

    this.setOrigin(0.5, 1);

    console.log("Creating player");

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.offset.y = 0;

    this.speed = 100;
    this.jumpSpeed = -100;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    console.log("Finish player");
  }

  pickUpFuel(player, fuel)
  {
    this.scene.pick.play();
    fuel.destroy();
    this.fuel = true;
    this.fuelImage = this.scene.add.image(this.x, this.y - this.myHeight, 'fuel');
  }

  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

    //console.log(`Player (${this.x}, ${this.y})`);
    if (this.cursors.up.isDown)
    {
      //this.play('fly', true);
      this.body.setVelocityY(this.jumpSpeed);
    }

    if (this.cursors.right.isDown)
    {
      this.flipX = false;
      this.body.setVelocityX(this.speed);
    }
    else if (this.cursors.left.isDown)
    {
      this.flipX = true;
      this.body.setVelocityX(-this.speed);
    }
    else
    {
      this.body.setVelocityX(0);
    }

    if (this.body.onFloor())
    {

      //console.log('velocity ', this.body.velocity.x);
      if (this.body.velocity.x != 0) 
      {
        this.play('walk', true);
      }
      else
        this.play('walk', false);
    }
    else
    {
      this.play('fly', true);
    }

    if (this.esc.isDown)
    {
      this.scene.scene.start('menu');
    }
    else
    {

    }

    if (this.fuel)
    {
      this.fuelImage.x = this.x;
      this.fuelImage.y = this.y - this.myHeight;
    }
  }

  decreaseLives()
  {
    this.explosion = this.sound.add('explosion');
    this.lives--;

    if (this.lives <= 0)
      this.destroy();
  }
}
