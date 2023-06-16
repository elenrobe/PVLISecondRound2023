export default class Coin extends Phaser.GameObjects.Sprite {

    constructor(scene, x ,y , sprite, player){
        super(scene, x, y , sprite);

        //Físicas y tamaño
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        scene.add.existing(this);
        this.setScale(0.10);
    
        scene.physics.add.overlap(player, this, ()=>{
            scene.addPoints();
            this.destroy();
        })
    }
}
