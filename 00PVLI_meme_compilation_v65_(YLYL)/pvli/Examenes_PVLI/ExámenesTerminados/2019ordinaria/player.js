export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, sprite, cursors) {
        super(scene.matter.world, x, y, sprite);
        scene.add.existing(this);
        this.setDisplaySize(100, 25);
        this.speed = 7.5; 
        this.speedY = 10;
        this.speedYOffset = 1;
        this.scene = scene;
        
        this.setBody({
            type: 'rectangle',
            width: 100,
            height: 25,
        })
        this.cursors = cursors;
        this.body.label = 'player';
        
        //Para que el objeto rebote
        this.setBounce(1);
    }

    preUpdate(){
        if(this.cursors.up.isDown){
            this.setVelocityY(-this.speedY);
        }
        else if(this.cursors.down.isDown){
            this.setVelocityY(this.speed);
        }
        else
            this.setVelocityY(0);

        if(this.cursors.left.isDown){
            this.setVelocityX(-this.speed);
        }
        else if(this.cursors.right.isDown){
            this.setVelocityX(this.speed);
        }
        else
            this.setVelocityX(0); 
    }
}