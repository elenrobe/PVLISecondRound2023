export default class PlayerScroll extends Phaser.GameObjects.Sprite
{

  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y)
  {
    const { width, height } = scene.scale;
    super(scene, width / 2, height, 'guy');

    // Con esto hacemos que su centro de coordenadas esté en el centro de la parte inferior
    // 0, 0 (izq arriba)   
    // 1, 1 (der abajo)
    this.setOrigin(0.5, 1);
    this.setScale(0.25, 0.25);

    this.CreateAnimations();

    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    this.body.setBounceX = 0;

    //Añadimos el setScrollFactor para que no se mueva con el scroll
    this.label = this.scene.add.text(10, 10, "").setOrigin(0, 0).setScrollFactor(0, 0);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);

    this.body.setVelocityX(this.speed);
    this.anims.play('right', true);
  }

  /** Crea animaciones */
  CreateAnimations()
  {
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('guy', { start: 7, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
  }

  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);
    if (this.cursors.up.isDown && this.body.onFloor())
    {
      this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown)
    {
      this.body.setVelocityX(-this.speed);
      this.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.anims.play('right', true);
      this.body.setVelocityX(this.speed);

    }
    else
    {
      // this.body.setVelocityX(0); //If in create() constant movement 
      // this.anims.stop();
    }

    if (this.esc.isDown)
    {
      this.scene.scene.start('mainmenu');
    }
  }
}
