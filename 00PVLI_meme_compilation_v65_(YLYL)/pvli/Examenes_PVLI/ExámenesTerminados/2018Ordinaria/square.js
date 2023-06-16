export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, sprite, velX, velY) {
        super(scene.matter.world, x, y, sprite);
        scene.add.existing(this);
        this.originalSize = 50;
        this.setDisplaySize(this.originalSize, this.originalSize);
        this.scene = scene;
        this.IsSelected = false;
        this.angularSpeed = .2;

        //this.selectedColor = new Phaser.Display.Color();

        this.setInteractive();

        this.mouse =  scene.input.activePointer;
        
        this.setBody({
            type: 'rectangle',
            width: this.originalSize,
            height: this.originalSize,
        })
        
        this.setVelocity(velX, velY);
        this.setFrictionAir(0);

        //Para que el objeto rebote
        this.setBounce(1);

        this.on('pointerdown', mouse =>{

            if(mouse.leftButtonDown && !scene.objectSelected){
                this.IsSelected = true;
                scene.objectSelected = true;
            }
            else if (mouse.leftButtonDown && scene.objectSelected && this.IsSelected){
                this.IsSelected = false;
                scene.objectSelected = false; 
                this.clearTint();
            }
        });

        let sKey = scene.input.keyboard.addKey('S');
        let dKey = scene.input.keyboard.addKey('D');

        sKey.on('down',()=>{
            if(this.IsSelected)this.setAngularVelocity(this.angularSpeed);
        }, this);

        dKey.on('down', ()=>{
            if(this.IsSelected && (Phaser.Input.Keyboard.JustDown(dKey))){
                this.IsSelected = false;
                scene.blocks.killAndHide(this);
                scene.setActiveNewChild();
                scene.blocks.remove(this, true, true);
               
            }
        });

        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.I,
            down: Phaser.Input.Keyboard.KeyCodes.K,
            left: Phaser.Input.Keyboard.KeyCodes.J,
            right: Phaser.Input.Keyboard.KeyCodes.L
          });
    }

    preUpdate(){
        if(this.IsSelected){
            if(this.cursors.up.isDown){
                this.applyForce({x: 0, y: -0.02});
            }
            else if(this.cursors.down.isDown){
                this.applyForce({x: 0, y: 0.02});
            }
    
            if(this.cursors.left.isDown){
                this.applyForce({x: -0.02, y: 0});
            }
            else if(this.cursors.right.isDown){
                this.applyForce({x: 0.02, y: 0});
            }
        }
    }
}
