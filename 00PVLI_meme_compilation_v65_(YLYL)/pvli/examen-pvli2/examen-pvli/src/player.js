export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player', 4);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.jumpVelocity = -150;
        this.speed = 100;
        this.carry = false;
        this.fuel = {};
        this.scene.physics.add.collider(this, this.scene.map.getLayer());
        console.log(this.scene.physics.world);
        
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors.up.on('down', event => {
            this.jetpac = true;
            this.flying = true;
        });
        this.cursors.left.on('down', event => {
            this.left = true;
        });

        this.cursors.right.on('down', event => {
            this.right = true;
        });

        this.cursors.up.on('up', event=>{
            this.jetpac = false;
        });

        this.cursors.right.on('up', event => {
           this.right = false;
        });

        this.cursors.left.on('up', event => {
            this.left = false;
        });

        this.caminar = this.scene.anims.create({
            key: 'caminar',
            frames: this.scene.anims.generateFrameNumbers('player', {start:4, end:7}),
            frameRate: 6,
            repeat: -1
        });

        this.volar = this.scene.anims.create({
            key: 'volar',
            frames:this.scene.anims.generateFrameNumbers('player', {start:0,end:3}),
            frameRate:6,
            repeat:-1
        });
        this.idle = this.scene.anims.create({
            key:  'idle',
            frames: this.scene.anims.generateFrameNumbers('player', {start:4, end:4}),
            frameRate: 1,
            repeat:0
        })
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

    move(){

        if(this.left && this.right || !this.left && !this.right){
            if(this.body.onFloor()){
                this.play('idle', true);
            }
            this.body.setVelocityX(0);
        }
        else if(this.left){
           
            if(this.body.onFloor()){
                this.play('caminar', true);
            }
            this.flipX = true;
            this.body.setVelocityX(-this.speed);
        }else if(this.right){
            if(this.body.onFloor()){
                this.play('caminar', true);
            }
            this.flipX = false;
            this.body.setVelocityX(this.speed);
        }

        if(this.jetpac){
            this.play('volar', true);
            this.body.setVelocityY(this.jumpVelocity);
        }

        if(this.flying && this.body.onFloor()){
            this.flying=false;
            this.play('idle', true);
        }
    }
    

    preUpdate(t, dt){
        super.preUpdate(t,dt);
       
        this.checkBounds();
        this.move();
    }
}

