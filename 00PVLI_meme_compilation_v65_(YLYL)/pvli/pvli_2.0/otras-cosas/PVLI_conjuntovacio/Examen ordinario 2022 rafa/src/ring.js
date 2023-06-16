export default class Ring extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		this.image = new Phaser.GameObjects.Image(scene,0,0);
        this.secondImage= new Phaser.GameObjects.Image(scene,0,200);
        this.sprite=new Phaser.GameObjects.Sprite(scene,0,80,'ring').setScale(3,3);
        this.add(this.image);
        this.add(this.secondImage);
        this.add(this.sprite);
        this.scene=scene;
        this.scene.physics.add.existing(this.image);
        this.scene.physics.add.existing(this.secondImage);
        this.image.body.setAllowGravity(false);
        this.image.setScale(1.5,1);
        this.image.setSize(1.5,1);
        this.image.body.setImmovable(true);
        this.secondImage.body.setAllowGravity(false);
        this.secondImage.setScale(1.5,1);
        this.secondImage.setSize(1.5,1);
        this.secondImage.body.setImmovable(true);
        this.scene.add.existing(this);
        this.scene.anims.create({
			key: 'ringu',
			frames: this.scene.anims.generateFrameNames('ring', {start:0, end:1}),
			frameRate: 7,
			repeat: -1
		});
        this.sprite.play('ringu');
        var self=this;
        this.scene.physics.add.collider(this.image,this.scene.player,function()
        {
            self.scene.player.fuckingDies();
        });
        this.scene.physics.add.collider(this.secondImage,this.scene.player,function()
        {
            self.scene.player.fuckingDies();
        });
    }
    moveRing()
    {
        this.x-=3;
    }

}