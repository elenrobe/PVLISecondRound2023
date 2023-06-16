export default class Ball extends Phaser.GameObjects.Sprite
{

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, size)
    {
        super(scene, x, y, 'ball');

        this.speed = 100;
        this.size = size;

        this.create();
    }

    create() 
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this).setScale(this.size, this.size);

        this.body.setAllowGravity(false);
        this.body.pushable = false;

        let dirX = Phaser.Math.Between(-1, 1);
        let dirY = Phaser.Math.Between(-1, 1);

        if (dirX == 0 && dirY == 0)
            dirX = 1;

        this.body.velocity.set(this.speed * dirX, this.speed * dirY);

        this.body.bounce.set(1);
        this.body.setAllowDrag(false);
    }

    getRandomInt(min, max)
    {
        let num = Math.random();
        return Math.floor((num + min) * max);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt)
    {
        //  super.preUpdate(t,dt);
        //  if (this.scene.physics.overlap(this.scene.player, this)) {
        //     this.destroy();
        // }
    }
}