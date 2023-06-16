export default class Player extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'lion').setScale(2,2);
        this.secondSprite= new Phaser.GameObjects.Sprite(scene, 0, -2*this.sprite.height, 'clown').setScale(2,2);
		this.setSize(3*this.sprite.width, 3*this.secondSprite.height);
        this.sprite.setScale(3,3);
        this.secondSprite.setScale(3,3);
		this.add(this.sprite);
		this.add(this.secondSprite);
		this.sprite.setDepth(10);
		this.direction=0;
        this.jumping=false;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.speed = 200;
		this.scene.anims.create({
			key: 'walk',
			frames: this.scene.anims.generateFrameNames('lion', {start:0, end:2}),
			frameRate: 7,
			repeat: 0
		});
        this.scene.anims.create({
            key: 'jump',
			frames: this.scene.anims.generateFrameNames('clown', {start:0, end:4}),
			frameRate: 7,
			repeat: 0
        })
		this.cursorA = this.scene.input.keyboard.addKey('A');
		this.cursorD = this.scene.input.keyboard.addKey('D');
		this.cursorSpace = this.scene.input.keyboard.addKey('SPACE');
    }
    preUpdate(t, dt){
        this.sprite.preUpdate(t, dt);
        //Si estas saltando, no puedes cambiar de direccion
        if(this.cursorA.isDown&&!this.jumping) {
            this.direction=-1;
            this.body.setVelocityX(this.direction*this.speed);
            this.sprite.play('walk',true);
        }
        else if(this.cursorD.isDown&& !this.jumping) {
            this.direction=1;
            this.body.setVelocityX(this.direction*this.speed);
            this.sprite.play('walk',true);
        }
        else if(!this.jumping){
            this.body.setVelocityX(0);
            this.direction=0;
        }
        //Si ya estas saltando, no puedes saltar otra vez y te mueves a donde te estabas moviendo
        if (this.cursorSpace.isDown&&!this.jumping) {
            this.body.setVelocityX(this.direction*this.speed);
            this.body.setVelocityY(-2*this.speed);
            this.jumping=true;
            this.secondSprite.play('jump',true);
        }
        if(this.body.velocity.y>0)
        {
            this.secondSprite.setFrame(2);
        }
        else if(this.body.velocity.y<0)
        {
            this.secondSprite.setFrame(3);
        }
        else this.secondSprite.setFrame(0);
    }
    //Se llama cuando chocas con el suelo
    setJumpingFalse()
    {
        this.jumping=false;
    }
    fuckingDies()
    {
        var self=this;
        this.secondSprite.setFrame(4);
        this.scene.time.delayedCall(1000,function()
        {
            self.scene.scene.start('menu');
        })
    }
}