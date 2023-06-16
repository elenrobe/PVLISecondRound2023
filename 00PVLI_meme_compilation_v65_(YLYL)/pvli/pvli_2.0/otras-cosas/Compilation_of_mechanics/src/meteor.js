export default class Meteor extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'meteor');

        this.create();
    }

    create() 
    {
        console.log('create meteor');

        this.speed = 50;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.speedX = Phaser.Math.Between(10, 100);

        if (this.getRandomInt(0, 2) == 1)
            this.body.velocity.set(-this.speedX, this.speed);
        else
            this.body.velocity.set(this.speedX, this.speed);


        //Rotación en base a una velocidad
        let angle = this.body.velocity.angle();
        console.log('angle ', angle);

        this.setRotation(angle);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('meteor', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.play('idle', true);
    }

    getRandomInt(min, max)
    {
        let num = Math.random();
        return Math.floor((num + min) * max);
    }

    explode()
    {
        this.anims.play('explode', true);
        this.body.setVelocity(0, 0);

        this.myTimeout = this.scene.time.addEvent({
            delay: 500,                // ms
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