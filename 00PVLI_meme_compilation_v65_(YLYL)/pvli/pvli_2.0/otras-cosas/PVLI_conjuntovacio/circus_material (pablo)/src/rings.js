export default class Rings extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.setScale(3, 3);
        this.body.setSize(5, 10);
        this.body.setOffset(10, this.height * 2.2);
        this.setDepth(-5);

        this.fakeRing = this.scene.add.sprite(x,y,'ring',0); 
		this.fakeRing.setScale(3,3);
		this.fakeRing.setDepth(1);
		this.fakeRing.setCrop(this.width/2, 0, this.width * 3, this.height * 3);

        this.play('ringAnim');
        this.fakeRing.play('ringAnim');

        this.speed = 80;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.fakeRing.preUpdate(t, dt);

        if (!this.scene.end) {
            this.body.setVelocity(-this.speed, 0);
            this.fakeRing.x = this.x;

            if (this.scene.canGenerateRings()) {
                let player = this.scene.getPlayer();
                if (this.x < player.x - player.width * 2) {
                    this.setPosition(this.scene.getPlayer().x + 800 + (800 / 4), this.y);
                }
            }
        } else {
            this.body.setVelocity(0);
            this.stop('ringAnim');
            this.fakeRing.stop('ringAnim');
        }
        
    }
}