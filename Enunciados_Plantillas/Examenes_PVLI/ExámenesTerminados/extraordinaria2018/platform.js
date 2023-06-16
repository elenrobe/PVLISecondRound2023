export default class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,sprite){
        super(scene,x,y,sprite);

        this.setDisplaySize(200,25);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
        this.body.checkCollision.down = false;
        this.body.checkCollision.right = false;
        this.body.checkCollision.left = false;
        this.setOrigin(0.5);

        scene.platformGroup.add(this);
    }
}