
import Fuel from "./fuel.js";
import Meteor from "./meteor.js";
import Nave from "./nave.js";
import Player from "./player.js";
import Pool from "./pool.js";
import Tilemap from "./tilemap.js";


export default class Escena extends Phaser.Scene{
    constructor(){
        super({
            key:'escena'
        });
    }

    init(data){
        this.fuelAmount = data.fuel;
        this.timeMet = data.time;
    }

    create(){
        let canvas = document.getElementById("juego");
        let canvasW = canvas.width;
        let canvasH = canvas.height;

        this.map = new Tilemap(this);
        
        this.player = new Player(this, 17,150);
        // this.player.body.setCollideWorldBounds();

        this.fuel = new Fuel(this, this.map, this.player);
        this.nave = new Nave(this, 150,50,this.player, this.fuelAmount);
        this.lose = this.sound.add('lose');
        this.expSound = this.sound.add('explosion');
        this.explosion = this.anims.create({
            key: 'meteor-exp',
            frames:this.anims.generateFrameNumbers('explosion', {start:0,end:2}),
            frameRate:6,
            repeat:0
        }); 
        this.animation = this.anims.create({
            key: 'meteor-move',
            frames:this.anims.generateFrameNumbers('meteor', {start:0,end:3}),
            frameRate:6,
            repeat:-1
        });

        this.metConfig = {
            lose: this.lose,
            expSound: this.expSound,
            explosion: this.explosion,
            animation: this.animation
        };
        this.met = [];
        for(let i = 0; i < 50; i++){
            this.met.push(new Meteor(this, this.metConfig));
        }
        this.pool = new Pool(this, this.met, this.timeMet);
       
        
    }
}