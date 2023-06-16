export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, lives)
    {
        super(scene, x, y, 'enemy_spritesheet');

        this.lives = lives;

        this.move = true;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.pushable = false;
        this.body.setCollideWorldBounds();

        this.speed = 50;

        this.body.bounce.set(1);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('enemy_spritesheet', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
          });

          this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion_spritesheet', { start: 0, end: 8 }),
            frameRate: 5,
            repeat: -1
          });

        this.anims.play('idle');
    }

    decreaseLives()
    {
        this.lives--;

        if (this.lives == 0)
            this.explode();
    }

    explode()
    {
        this.move = false;
        this.anims.play('explode');
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

        if (this.move)
        {
            if (this.scene.player.x > this.x) //go to right
            {
                this.body.setVelocityX(this.speed);            
            }
            else if (this.scene.player.x < this.x) //go to left
            {
                this.body.setVelocityX(-this.speed);
            }
            else //no movement in x
            {
                this.body.setVelocityX(0);
            }
    
            if (this.scene.player.y > this.y) //go down
            {
                this.body.setVelocityY(this.speed);            
            }
            else if (this.scene.player.y < this.y) //go up
            {
                this.body.setVelocityY(-this.speed);
            }
            else //no movement in y
            {
                this.body.setVelocityY(0);
            }
        }
        else
        {
            this.body.setVelocity(0, 0);
        }
    }
}