import Base from './Base.js';

export default class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,sprite, player){
        super(scene,x,y,sprite);

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
        this.body.checkCollision.down = false;
        this.body.checkCollision.right = false;
        this.body.checkCollision.left = false;
        let base = new Base(scene, x ,  y - this.height/2, 'base');
        this.setOrigin(0.5);

        this.scene.physics.add.collider(this, player);
    }
}