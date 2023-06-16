export default class MainMenu extends Phaser.Scene {
	
	constructor (){
		super({key: 'MainMenu'});
	}
	
	create(){
		this.add.text(this.game.config.width / 2, this.game.config.height / 5, 'Pang', {fontSize: 32, color: '#FFFFFF'}). setOrigin(0.5, 0.5).setAlign('center');
		
		this.createButton(this.game.config.height / 5 * 2, 'Facil', 3);
		this.createButton(this.game.config.height / 5 * 3, 'Medio', 6);
		this.createButton(this.game.config.height / 5 * 4, 'Dificil', 9);
	}
	
	createButton(y, texto, num){
		let boton = this.add.text(this.game.config.width / 2, y, texto , {fontSize: 16, color: '#FFFFFF'})
		. setOrigin(0.5, 0.5).setAlign('center')
		.setInteractive();
		
		boton.on('pointerdown', ()=>{this.scene.start('GameScene',{pompas:num})});
		return boton;
	}
	
}