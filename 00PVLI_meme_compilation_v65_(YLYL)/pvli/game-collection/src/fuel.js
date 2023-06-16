export default class Fuel extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'fuel');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
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