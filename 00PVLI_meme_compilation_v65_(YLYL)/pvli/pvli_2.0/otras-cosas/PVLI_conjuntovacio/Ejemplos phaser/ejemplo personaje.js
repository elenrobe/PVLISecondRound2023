
constructor(scene, x, y) {
    super(scene, x, y);
    this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'player');
    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);
    
    this.sprite.setDepth(10);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.speed = 100;
    this.scene.anims.create({
        key: 'idle',
        frames: this.scene.anims.generateFrameNames('player', {start:4, end:4}),
        frameRate: 7,
        repeat: -1
    });
    this.sprite.play('idle');
    this.cursorA = this.scene.input.keyboard.addKey('A');
    this.cursorD = this.scene.input.keyboard.addKey('D');
    this.cursorSpace = this.scene.input.keyboard.addKey('SPACE');
    
    this.fuel = null;
}

preUpdate(t, dt){
    this.sprite.preUpdate(t, dt);
    
    if(this.cursorA.isDown) {
        this.body.setVelocityX(-this.speed);
    }
    else if(this.cursorD.isDown) {
        this.body.setVelocityX(this.speed);
    }
    else this.body.setVelocityX(0);
    
    if (this.x > this.scene.game.config.width) 
        this.x = 0;
    else if (this.x < 0)
        this.x = this.scene.game.config.width;

    if (this.cursorSpace.isDown) {
        this.body.setVelocityY(-this.speed);
    }

}