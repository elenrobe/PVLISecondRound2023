export default class Wall extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, sprite, size, speedX, speedY,desruction) {
        super(scene.matter.world, x, y, sprite);
        scene.add.existing(this);
        this.size = size;

        this.setDisplaySize(size, size);
        this.desruction = desruction;
        this.setBody({
            type: 'circle',
            width: size,
            height: size,
        });

        this.setVelocity(speedX, speedY);
        this.setFrictionAir(0);
        this.setFriction(0);
        this.setFrictionStatic(0);
        this.setBounce(1);

        this.body.label = 'ball';
    }

    preUpdate(){
    }

    returnSize(){return this.size;}
    returnDestructions(){return this.desruction;}

}