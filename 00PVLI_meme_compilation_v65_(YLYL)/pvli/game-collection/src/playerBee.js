/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de flores que ha recogido hasta el momento.
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

    // const { width, height } = scene.scale;
    super(scene, x, y, 'bee');


    // Con esto hacemos que su centro de coordenadas esté en el centro de la parte inferior
    // 0, 0 (izq arriba)   
    // 1, 1 (der abajo)
    this.setOrigin(0.5, 1);

    this.createAnimations();

    this.flowers = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.body.pushable = false;

    this.body.setVelocityX(this.speed);

    // Esta label es la UI en la que pondremos la puntuación del jugador
    //Añadimos el setScrollFactor para que no se mueva con el scroll
    this.label = this.scene.add.text(10, 10, "").setOrigin(0, 0).setScrollFactor(0, 0);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
    this.updateFlowers();
  }


  /** Crea animaciones */
  createAnimations()
  {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 12 }),
      frameRate: 10,
      repeat: -1
    });
  }

  /**
   * El jugador ha recogido una flor por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  pickUpFlower(player, flower)
  {
    flower.destroy();
    player.flowers++;
    player.updateFlowers();
  }

  /**
   * Actualiza la UI con la puntuación actual
   */
  updateFlowers()
  {
    this.label.text = 'Flowers: ' + this.flowers;
  }

  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

    this.anims.play('idle');

    if (this.cursors.up.isDown)
    {
      this.body.setVelocityY(-this.speed);
    }
    else if (this.cursors.down.isDown)
    {
      this.body.setVelocityY(this.speed);
    }
    else if (this.esc.isDown) 
    {
      this.scene.scene.start('mainmenu');
    }
    else 
    {
      this.body.setVelocityY(0);
    }
  }
}
