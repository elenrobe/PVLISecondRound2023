export default class Base extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y , sprite){
        super(scene, x ,y , sprite);
        scene.add.existing(this);
        scene.addToBaseGroup(this);
    }
}