/**
 * Obstáculo que consiste en jarrón estático en llamas
 * @extends Phaser.GameObjects.Sprite
 */
export default class Fire extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "fire", 0);
		
		this.setScale(3,3);
		
        this.scene.add.existing(this);
		
		this.scene.physics.add.existing(this);
		
        this.play('fire_jar');
        		        
    }
    
	/**
	 * Preupdate
	 * Si la cámara sobrepasa el jarrón lo destruimos
	 */
    preUpdate(t,dt) {
        super.preUpdate(t,dt);
		if (this.x+this.width < this.scene.cameras.main.scrollX)
			this.destroy();
    }
    
}