export default class Wall extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, sprite, sizeX, sizeY) {
        super(scene.matter.world, x, y, sprite);
        scene.add.existing(this);
        this.setDisplaySize(sizeX, sizeY);
        this.setBody({
            type: 'rectangle',
            width: sizeX,
            height: sizeY,
        });

        this.body.label = 'wall';

        this.setStatic(true);

    
    }

}