export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x ,y , sprite){
        super(scene, x, y , sprite);

        //Físicas y tamaño
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.setDisplaySize(100, 140);
        scene.add.existing(this);

        //boleano para animacion
        this.isRunning = false;
        
        //Atributos
        this.jumpingOffset = -0.01;
        this.speed = 400;
        this.jumpSpeed = -500;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preUpdate(t,d){
        super.preUpdate(t,d);

        if(this.spaceKey.isDown && (this.body.onFloor()|| (this.body.velocity.y > this.jumpingOffset && this.body.velocity.y < -this.jumpingOffset))){
            this.body.setVelocityY(this.jumpSpeed);
        }
        else if(this.cursors.left.isDown){
            this.body.setVelocityX(-this.speed);
            this.flipX = true;
        }
        else if(this.cursors.right.isDown){
            this.body.setVelocityX(this.speed);
            this.flipX = false;
        }
        else if ((this.body.onFloor()|| (this.body.velocity.y > this.jumpingOffset && this.body.velocity.y < -this.jumpingOffset)))
            this.body.setVelocityX(0);
    }
}