export default class Victory extends Phaser.Scene {
    constructor() {
        super({key: 'victory'});
    }

    init(data) {
        this.points = data.points;
    }

    create() {
        this.add.text(this.game.config.width / 5, 100, "Tu puntuacion: " + this.points, {fontSize: 40, fontFamily: 'arcade_classic'});

        this.add.text(120, this.game.config.height / 1.4, "Press SPACE to start", {fontSize: 40, fontFamily: 'arcade_classic'});

        this.controlSPACE = this.input.keyboard.addKey('SPACE');
    }

    update(t, dt) {
        super.update(t, dt);

        if (this.controlSPACE.isDown) {
            this.scene.start('menu');
        }
    }
}