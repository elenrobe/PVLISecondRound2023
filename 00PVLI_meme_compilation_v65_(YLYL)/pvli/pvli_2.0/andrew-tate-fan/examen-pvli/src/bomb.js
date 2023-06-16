export default class Bomb extends Phaser.GameObjects.Sprite
{

    constructor(scene, x, y)
    {
        super(scene, x, y, 'bomb');

        this.speed = 150;

        this.create();
    }

    create() 
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setVelocity(this.scene.player.dir[0] * this.speed, this.scene.player.dir[1] * this.speed);
        
        // Queremos que el proyectil no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        let myTimeout = this.scene.time.addEvent({
            delay: 1000,                // ms
            callback: this.destroy,
            args: [],
            callbackScope: this,
            loop: false
          });
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);
    }
}