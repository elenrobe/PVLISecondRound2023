export default class Citizen extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'lady_spritesheet');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.pushable = false;
        this.body.setCollideWorldBounds();

        this.speed = 50;

        this.setDir();

        this.body.bounce.set(1);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('lady_spritesheet', { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('lady_spritesheet', { start: 6, end: 8 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('lady_spritesheet', { start: 9, end: 11 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('lady_spritesheet', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    }

    //dir aleatoria
    setDir()
    {
        this.dirX = Phaser.Math.Between(-1, 1);
        this.dirY = Phaser.Math.Between(-1, 1);

        if (this.dirX == 0 && this.dirY == 0)
            this.dirX = 1;

        if (this.body != null)
        {
            this.body.setVelocity(this.speed * this.dirX, this.speed * this.dirY);

            let myTimeout = this.scene.time.addEvent({
                delay: 2000,                // ms
                callback: this.setDir,
                args: [],
                callbackScope: this,
                loop: false
            });
        }

    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);

        if (this.dirX == -1)
        {
            this.play('left', true);
        }
        else if (this.dirX == 1)
        {
            this.play('right', true);
        }
        else
        {

        }

        if (this.dirY == 1)
        {
            this.play('down', true);
        }
        else if (this.dirY == -1)
        {
            this.play('up', true);
        }
        else
        {

        }
    }
}