export default class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'menu'});
    }

    create() {
        this.add.image(this.game.config.width / 4, 100, 'logo').setScale(0.5, 0.5).setOrigin(0, 0);

        this.add.text(120, this.game.config.height / 1.4, "Press SPACE to start", {fontSize: 40, fontFamily: 'arcade_classic'});

        this.controlSPACE = this.input.keyboard.addKey('SPACE');

        // Reproducir música
		const musicConfig = { mute: false, volume: 1, detune: 0, seek: 0, loop: true, delay: 0 }
		this.music = this.sound.add('menu');
        this.music.play(musicConfig);
    }

    update(t, dt) {
        super.update(t, dt);

        if (this.controlSPACE.isDown) {
            this.music.stop();
            this.scene.start('level');
        }
    }
}