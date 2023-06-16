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
        this.jumpingOffset = -0.1
        this.speed = 400;
        this.jumpSpeed = -500;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    preUpdate(t,d){
        super.preUpdate(t,d);

        if(this.cursors.up.isDown && (this.body.onFloor()|| (this.body.velocity.y > this.jumpingOffset && this.body.velocity.y < -this.jumpingOffset))){
            this.body.setVelocityY(this.jumpSpeed);
            this.play('jump');
        }

        else if(this.cursors.left.isDown){
            this.body.setVelocityX(-this.speed);
            this.flipX = true;
            if(!this.isRunning && (this.body.onFloor()|| (this.body.velocity.y > this.jumpingOffset && this.body.velocity.y < -this.jumpingOffset))){
                this.play('run');
                this.isRunning = true;
            }
        }
        else if(this.cursors.right.isDown){
            this.body.setVelocityX(this.speed);
            this.flipX = false;
            if(!this.isRunning && (this.body.onFloor()|| (this.body.velocity.y > this.jumpingOffset && this.body.velocity.y < -this.jumpingOffset))){
                this.play('run');
                this.isRunning = true;
            }
        }
        else if (!this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.body.setVelocityX(0);
            this.play('idle');
            this.isRunning = false;;
        }

        
    }

}