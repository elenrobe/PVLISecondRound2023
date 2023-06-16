export default class Fire extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(2.5, 2.5);

        this.body.setSize(this.width / 1.5, this.height / 1.2);
        this.body.setOffset(1.5, 4);
        this.play('fire');
    }

    preUpdate(t, dt) {
        if (!this.scene.end) {
            super.preUpdate(t, dt);
            if (this.x + this.width < this.scene.cameras.main.scrollX)
                this.destroy();
        }
    }
}