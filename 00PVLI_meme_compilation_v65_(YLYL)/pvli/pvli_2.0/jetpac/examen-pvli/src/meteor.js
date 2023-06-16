export default class Meteor extends Phaser.GameObjects.Sprite{
    constructor(scene, config){
        super(scene, 0, 0, 'meteor', 0);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.play('meteor-move');
        this.expSound = config.expSound; 
        this.collider = this.scene.physics.add.collider(this, this.scene.map.getLayer(), ()=>{
            this.play('meteor-exp', true);
            this.expSound.play();
            this.body.setVelocityX(0);
        });
        this.on('animationcomplete-meteor-exp', ()=>{
            this.setActive(false);
            this.setVisible(false);
        });
        this.lose = config.lose;
        this.overlap = this.scene.physics.add.overlap(this,this.scene.player, ()=>{
            this.lose.play();
            this.scene.scene.start('menu');
        });
       
    }

    setActive(active){
        super.setActive(active);
        this.body.allowGravity = active;
        this.collider.active = active;
        this.overlap.active = active;
        this.body.immovable = !active;
        this.expSound.stop();
        this.play('meteor-move', true);
    }

    checkBounds(){
        let bounds = this.scene.physics.world.bounds;
        if(this.x < bounds.x){
            this.x = bounds.width;
        }
        else if(this.x > bounds.width){
            this.x = bounds.x;
        }
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        this.checkBounds();
    }
}