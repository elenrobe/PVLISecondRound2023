export default class EndMenu extends Phaser.Scene {
	
	constructor (){
		super({key: 'EndMenu'});
	}
	
	init(obj) {
		this.win = obj.win;
	}

	create(){
		let text;
		if (this.win) text = 'Has ganado';
		else text = 'Has perdido';
		this.add.text(this.game.config.width / 2, this.game.config.height / 2, text, {fontSize: 32, color: '#FFFFFF'}). setOrigin(0.5, 0.5).setAlign('center');
	
		this.input.keyboard.on('keydown', () => {
			this.scene.start('MainMenu');
		});	
	}	
}