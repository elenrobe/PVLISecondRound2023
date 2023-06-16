export default class Jar extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
        super(scene,x,y,'jar')
        this.scene=scene;
        this.setScale(3,3);
        this.setSize(3,3);
        this.scene.add.existing(this);
	    this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        var self=this;
        this.scene.physics.add.collider(this,this.scene.player,function()
        {
            self.scene.player.fuckingDies();
        });
        this.body.setAllowGravity(false);
        this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNames('jar', {start:0, end:1}),
			frameRate: 7,
			repeat: -1
		});
        this.play('idle');
    }
}