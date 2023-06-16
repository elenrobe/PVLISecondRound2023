
import Jar from "./jar.js";
import Player from "./player.js";
import Ring from "./ring.js";
import Score from "./score.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
    init(config)
    {
        this.duration=config.max;
    }
    preload()
    {
        this.load.image('background','assets/sprites/background.png');
        this.load.spritesheet('clown','assets/sprites/clown.png',{frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('lion','assets/sprites/lion.png',{frameWidth: 36, frameHeight: 16});
        this.load.spritesheet('jar','assets/sprites/fire.png',{frameWidth: 25, frameHeight: 31});
        this.load.image('platform','assets/sprites/platform.png');
        this.load.spritesheet('ring','assets/sprites/ring.png',{frameWidth: 26, frameHeight: 80});
    }
    create()
    {
        const width = this.scale.width;
		const height = this.scale.height;
        //Cuantos metros se llevan
		this.meters=0;
        this.win=false;
        //Max puntuacion
        if(window.localStorage.getItem("Score")===null)window.localStorage.setItem("Score",0);
        this.previousHighscore=window.localStorage.getItem("Score");
		this.levelSize = width*(this.duration/10);
		this.levelCanvas=this.add.rectangle(0, 0, this.levelSize, height, '#000000').setOrigin(0,0);
        this.levelCanvas.setDepth(-20);
        var self=this;
        this.camera=this.cameras.main;
        this.background= this.add.image(0,this.sys.canvas.height-500,'background').setOrigin(0,0);
        //seteas el tamaño a la pantalla
        this.background.setDisplaySize(this.sys.canvas.width,500);
        //Modificas el tamaño interno para que phaser lo reconozca como sus limites
        this.background.setSize(this.sys.canvas.width,500);
        this.background.setDepth(-5);
        //Dos backgrounds que se cordinan para adelante y detraS
        this.background2= this.add.image(this.sys.canvas.width,this.sys.canvas.height-500,'background').setOrigin(0,0);
        this.background2.setDisplaySize(this.sys.canvas.width,500);
        this.background2.setSize(this.sys.canvas.width,500);
        this.background2.setDepth(-10);
        //Capa para la tierra
        this.groundLayer= this.physics.add.image(this.levelSize/2,this.sys.canvas.height-100);
        this.groundLayer.setDisplaySize(this.levelSize,10);
        this.groundLayer.setSize(this.levelSize,10);
        this.groundLayer.body.setAllowGravity(false);
        this.groundLayer.body.setImmovable(true);
        this.player=new Player(this,0,200);
        this.physics.add.collider(this.player,this.groundLayer,function(){
            self.player.setJumpingFalse();
        });
        this.camera.setBounds(0,0,this.levelSize,this.sys.canvas.height);
        this.camera.startFollow(this.player,false,1,1,-100,275);
        this.jar=new Jar(this,this.background.width,this.groundLayer.y);
        this.jar.setOrigin(0.5,1);
        this.ring=new Ring(this,700,375);
        //Score
        this.score=new Score(this,this.sys.canvas.width/2,0,"score: ",(1000*this.duration/10)).setOrigin(0.5,0);
        this.maxScore=new Score(this,this.sys.canvas.width/2,100,"High Score: ", this.previousHighscore).setOrigin(0.5,0);
    }
    update(t,dt)
    {
        if(!this.win){
            //Si no ves nada del background anterior (ni el principio ni el final) es que estas avanzando
            if(!this.camera.worldView.contains(this.background.x,0)&&!this.camera.worldView.contains(this.background.x+this.background.width,0))
            {
                //Destruyes el que no se ve y haces del siguente el principal, creando otro "siguiente"
                this.background.destroy();
                this.jar.destroy();
                this.ring.destroy();
                this.background=this.background2;
                this.background2= this.add.image(this.background.x+this.background.width,this.sys.canvas.height-500,'background').setOrigin(0,0);
                this.background2.setDisplaySize(this.sys.canvas.width,500);
                this.background2.setSize(this.sys.canvas.width,500);
                this.background.setDepth(-5);
                this.background2.setDepth(-10);
                this.jar=new Jar(this,this.background.x+this.background.width,this.groundLayer.y);
                this.jar.setOrigin(0.5,1);
                this.ring=new Ring(this,this.background2.x+Phaser.Math.Between(10,this.background.width-10),375);
                console.log("Construyete");
                this.meters++;
            }
            //Si lo que no ves es el final del background principal, es que estas retrocediendo
            if(!this.camera.worldView.contains(this.background.x+this.background.width,0))
            {
                //Haces del background actual el siguiente y te creas el principal mas atras
                console.log("Vuelta atras");
                this.jar.destroy()
                this.background2.destroy();
                this.background2=this.background;
                this.background= this.add.image(this.background2.x-this.background2.width,this.sys.canvas.height-500,'background').setOrigin(0,0);
                this.background.setDisplaySize(this.sys.canvas.width,500);
                this.background.setSize(this.sys.canvas.width,500);
                this.background.setDepth(-5);
                this.background2.setDepth(-10);
                this.jar=new Jar(this,this.background.x+this.background.width,this.groundLayer.y);
                this.jar.setOrigin(0.5,1);
                this.meters--;
            }
            if(this.meters===(this.duration/10)-2)
            {
                this.winCon=this.physics.add.image(this.background.x+this.background.width,this.groundLayer.y,'platform');
                this.winCon.setScale(3,3);
                this.jar.setOrigin(0.5,1);
                this.winCon.body.setAllowGravity(false);
                this.winCon.body.setImmovable(true);
                var self=this;
                this.jar.destroy();
                this.physics.add.collider(this.player,this.winCon,function()
                {
                    self.win=true;
                    if(self.score.getScore()>self.previousHighscore) window.localStorage.setItem("Score",self.score.getScore());
                    self.time.delayedCall(2000,function(){self.scene.start("menu")});
                })
            }
            this.score.updateTemp(dt);
            this.ring.moveRing();
        }
    }
}