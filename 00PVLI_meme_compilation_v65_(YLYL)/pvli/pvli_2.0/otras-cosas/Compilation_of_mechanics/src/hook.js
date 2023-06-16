export default class Hook extends Phaser.GameObjects.Sprite
{

    constructor(scene, x, y)
    {
        super(scene, x, y, 'hook');

        this.speed = 300;

        this.create();
    }

    create() 
    {
        // this.scene.physics.add.collider(this, this.scene.bubbles);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        
        // Queremos que el gancho no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        this.lines = [];
        this.i = 0;


        this.body.velocity.set(0, -this.speed);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);

        // if (this.scene.physics.overlap(this.scene.bubbles, this)) {
        //     console.log("bullet hit bubble");
        //     this.destroy();
        // }
        if (this.scene.physics.overlap(this.scene.wall, this))
        {
            console.log("collision");
            this.destroy();
        }

    }
}