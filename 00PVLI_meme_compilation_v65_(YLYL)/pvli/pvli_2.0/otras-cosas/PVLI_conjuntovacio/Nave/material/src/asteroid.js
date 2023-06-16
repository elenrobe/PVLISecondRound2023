export default class Asteroid extends Phaser.GameObjects.Sprite{
	constructor(scene) {
		let x = Math.random() * (scene.game.config.width);
		let y = Math.random() * (scene.game.config.height/2);
		console.log(x, y);
		super(scene, x, y, 'asteroid');
		this.sound;
		this.play('astd');
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
		this.scene.physics.add.overlap(this.scene.player, this, ()=>{this.destruction();});
		this.body.setVelocity(0, Math.random()*10);
	}
	
	preUpdate(t,dt){
		
		super.preUpdate(t,dt);
	if(this.body!==null){
		if(this.body.velocity.y===0){
			this.destruction()
		}
	}
	}
	
	destruction(){
		this.play('exp');
		this.body=null;
		this.scene.time.addEvent({delay:1000, callback: ()=>{this.destroy();},callbackScope:this.scene, loop:false});
	}

	
}