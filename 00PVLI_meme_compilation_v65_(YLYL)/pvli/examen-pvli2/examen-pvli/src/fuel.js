import Player from "./player.js";
import Tilemap from "./tilemap.js";
export default class Fuel extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Tilemap} map 
     * @param {Player} player 
     */
    constructor(scene, map, player){
        super(scene, 0,0, 'fuel')
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.colisionMap = this.scene.physics.add.collider(this, map.getLayer());
        this.player = player;
        this.setOrigin(0.5,0.5);
        this.pickup = this.scene.sound.add('pickup');
        this.overlapPlayer = this.scene.physics.add.overlap(this, this.player, (o1, o2) =>{
            this.following = true;
            this.body.allowGravity=false;
            this.overlapPlayer.active = false;
            this.player.carry = true;
            this.player.fuel = this;
            this.pickup.play();
        });
        this.spawn();
       
    }

    spawn(){
        this.x = Phaser.Math.RND.between(this.scene.physics.world.bounds.x, this.scene.physics.world.bounds.width);
        this.x = Phaser.Math.RND.between(this.scene.physics.world.bounds.y, this.scene.physics.world.bounds.height);
        this.overlapPlayer.active = true;
        this.following = false;
        this.body.allowGravity=true;
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        if(this.following){
            this.x = this.player.x + this.player.width;
            this.y = this.player.y;
            
        }
    }

}