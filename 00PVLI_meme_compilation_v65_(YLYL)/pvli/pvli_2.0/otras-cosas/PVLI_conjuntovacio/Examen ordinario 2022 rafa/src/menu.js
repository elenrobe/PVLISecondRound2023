export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    
  }
  preload()
  {
    this.load.image('stars','assets/sprites/stars.png');
  }
  create(){
    this.add.image(this.game.config.width / 2, this.game.config.height / 5,'stars').setOrigin(0.5, 0.5).setDisplaySize(500,200);
		this.add.text(this.game.config.width / 2, this.game.config.height / 5, 'Clowplutense'). setOrigin(0.5, 0.5).setAlign('center').setDisplaySize(400,150);
		
		this.createButton(this.game.config.height / 5 * 2, 'Facil', 50);
		this.createButton(this.game.config.height / 5 * 3, 'Medio', 100);
		this.createButton(this.game.config.height / 5 * 4, 'Dificil', 200);
	}
	
	createButton(y, texto, num){
		let boton = this.add.text(this.game.config.width / 2, y, texto)
		. setOrigin(0.5, 0.5).setAlign('center')
		.setInteractive();
		
		boton.on('pointerdown', ()=>{this.scene.start('GameScene',{max:num})});
		return boton;
	}
}