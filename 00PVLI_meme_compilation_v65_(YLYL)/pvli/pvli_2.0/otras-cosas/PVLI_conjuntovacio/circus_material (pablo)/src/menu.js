export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    // Fondo
    this.add.image(this.game.config.width / 2, this.game.config.height / 4, 'stars').setScale(3.5, 3.5);

    // Título
    this.add.text(this.game.config.width / 2, this.game.config.height / 4, "CIRCUS",
      {fontSize: 60, fontFamily: 'arcade_classic'}).setOrigin(0.5, 0.5).setAlign('center');

    // Botones
    this.createButton(this.game.config.height / 5 * 2.5, 'Easy', 50);
    this.createButton(this.game.config.height / 5 * 3, 'Normal', 100);
    this.createButton(this.game.config.height / 5 * 3.5, 'Hard', 200);

    // Reproducir música
		const musicConfig = { mute: false, volume: 1, detune: 0, seek: 0, loop: true, delay: 0 }
		this.music = this.sound.add('menu');
    this.music.play(musicConfig);
  }

  // Crear botones centrados
  createButton(y, texto, num) {
    // Crear
		let boton = this.add.text(this.game.config.width / 2, y, texto , {fontSize: 36, color: '#FFFFFF', fontFamily: 'arcade_classic'})
		.setOrigin(0.5, 0.5).setAlign('center')
		.setInteractive();
		
		// Al pulsar
		boton.on('pointerdown', ()=> {
			this.scene.start('Stage',{rec:num});
			this.music.stop();
		});

		return boton;
  }
}