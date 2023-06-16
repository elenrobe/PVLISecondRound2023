import Platform from './Platform.js';
import Player from './Player.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.stars = 10;
  }
  preload() {  
    this.load.image('platform', './resources/images/platform/TriggerVision.png');
    this.load.image('base', './resources/images/platform/base.png');
    this.load.spritesheet('player', './resources/images/player/static.png', { frameWidth: 300, frameHeight: 350 });
    this.load.spritesheet('runningPlayer', './resources/images/player/running.png', { frameWidth: 300, frameHeight: 350 });
    this.load.spritesheet('jumpingPlayer', './resources/images/player/jumping.png', { frameWidth: 300, frameHeight: 350 } );
    this.load.image('background', './resources/images/Background.png' );
  }

  create() {
    this.basegroup = this.physics.add.staticGroup();
    this.add.image(0,0, 'background').setOrigin(0,0);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('runningPlayer'),
      frameRate: 40,
      repeat: -1
   });
   
   this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('player'),
    frameRate: 1,
    repeat: -1
 });

  
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('jumpingPlayer'),
    frameRate: 30,
    repeat: 1
    
 });
    
    let player = new Player(this, 700, 400,'player' );

    this.platform = new Platform(this, 700, 400, 'platform',player);
    this.platform2 = new Platform(this, 190, 600, 'platform', player);
    this.platform3 = new Platform(this, 190, 200, 'platform', player);
    this.platform4 = new Platform(this, 1210, 200, 'platform', player);
    this.platform5 = new Platform(this, 1210, 600, 'platform', player);

  }

  update(time, delta) {    
  }

  addToBaseGroup(object){
    this.basegroup.add(object);
  }

  spawn(){
      if(this.stars >=0){
        let base = Phaser.Utils.Array.GetRandom(this.basegroup.getChildren);
        
        
      }

  }
}