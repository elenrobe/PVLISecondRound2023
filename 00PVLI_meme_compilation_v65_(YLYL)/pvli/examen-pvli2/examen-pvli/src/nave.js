export default class Nave extends Phaser.GameObjects.Container{
    constructor(scene, x, y,player, fuel){
        super(scene, x, y);
        this.nave = this.scene.add.sprite(0,0,'nave');
        this.nave.setOrigin(0,0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.add(this.nave);
        this.scene.physics.add.collider(this, this.scene.map.getLayer());
        this.maxFuel = fuel;
        this.player = player;

        this.score = this.scene.add.text(2, -12, '0/' + this.maxFuel, { fontFamily: 'Minecraftia', fontSize: 10, color: '#ffffff' , align:'center'});
        this.score.setOrigin(0,0);
        this.add(this.score);
        this.body.setSize(16,48);

        this.fuel = 0;
        
        this.fuelSound = this.scene.sound.add('fuel');
        this.overlapPlayer = this.scene.physics.add.overlap(this,this.player, (o1,o2)=>{
            if(this.player.carry){  
                this.player.fuel.spawn();
                this.player.carry = false;
                this.fuelSound.play();
                this.addScore();
            }
        });
        this.win = this.scene.sound.add('win');
    }

    addScore(){
        this.fuel+=1;
        this.score.text = this.fuel + '/' + this.maxFuel;
        if(this.fuel === this.maxFuel){
            this.win.play();
            this.scene.scene.start('menu');
        }
    
    }

}