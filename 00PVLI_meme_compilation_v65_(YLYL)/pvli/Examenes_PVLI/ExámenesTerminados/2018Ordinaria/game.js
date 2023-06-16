import Square from './square.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('square', './resources/Wall.png');
  }

  create() {
    this.matter.world.setBounds();
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.blocks = this.add.group();

    this.objectSelected = false;

    spaceKey.on('down', () => {
      let velX = Phaser.Math.Between(-10, 10);
      let velY = Phaser.Math.Between(-10,10);

      let square = new Square(this, Phaser.Math.Between(40, 1360),Phaser.Math.Between(40, 760),'square', velX, velY );
      this.blocks.add(square);
     });
  }

  update(time, delta) {  
    
    console.log('Number of active objects in group: ' + this.blocks.countActive(true));
  }

  setActiveNewChild(){
    let newSelected = this.blocks.getFirstAlive();
      if(newSelected !== null){
        console.log('cogemos un random de los cuadrados')
          newSelected.IsSelected  = true;
          console.log(newSelected);
      }else{console.log('No hay cuadrados que escoger'); this.objectSelected = false;}
  }
}