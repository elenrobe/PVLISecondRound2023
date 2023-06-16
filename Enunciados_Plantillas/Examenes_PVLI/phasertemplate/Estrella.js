export default class Star extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y , sprite, player){
        super(scene, x ,y , sprite);
        scene.add.existing(this);
        
    }
}