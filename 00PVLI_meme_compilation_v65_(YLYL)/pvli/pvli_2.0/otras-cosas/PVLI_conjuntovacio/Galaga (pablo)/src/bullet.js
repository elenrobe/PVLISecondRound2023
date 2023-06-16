export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, actor) {
        super(scene, x, y, sprite);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (actor == "player") this.body.setVelocityY(-700);
        else this.body.setVelocityY(700);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.y < 50 || this.y > this.scene.game.config.height) this.die();
    }

    die() {
        this.body.destroy();
        this.destroy();
    }
}