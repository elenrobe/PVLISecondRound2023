import Platform from './platform.js';
import Player from './player.js';
import Coin from './coin.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
    this.load.image('platform', './resources/Wall.png');
    this.load.image('player', './resources/star.png');
    this.load.image('coin', './resources/coin.png');
    
  }

  create() {

    this.points = 0;
    this.pointText =  this.add.text(200, this.cameras.main.y + 10, 'Points: ' + this.points, { fontFamily: 'Arial', fontSize: 45, color: '#ffffff ' });
    this.platformGroup = this.add.group();



    new Platform(this, 400, 600, 'platform');
    new Platform(this, 1000,600, 'platform');
    new Platform(this, 700, 300,'platform');

   
    let player = new Player(this, 700, 600, 'player');

    new Coin(this, 400, 550, 'coin', player);
    new Coin(this, 1000, 550, 'coin', player);
    new Coin(this, 700, 250, 'coin', player);

    this.physics.add.collider(player, this.platformGroup);

  }

  update(time, delta) {    
  }

  addPoints(){
    this.points++;
    this.pointText.setText('Points: ' + this.points);
  }
}