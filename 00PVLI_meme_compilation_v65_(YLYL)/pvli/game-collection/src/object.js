export default class Object extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'star');

        this.speed = 100;

        this.create();
    }

    create() 
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        this.body.velocity.set(-this.speed, 0);
        this.body.setAllowDrag(false);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt)
    {
        //  super.preUpdate(t,dt);
    }
}