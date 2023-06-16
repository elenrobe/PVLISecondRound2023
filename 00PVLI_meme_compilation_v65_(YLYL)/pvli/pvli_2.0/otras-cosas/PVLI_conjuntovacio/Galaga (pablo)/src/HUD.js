export default class HUD extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        // TODO: Añadir lectura de memoria
        this.points = 0;

        this.rect = this.scene.add.rectangle(0, 0, this.scene.game.config.width, 50, 0x808080).setOrigin(0, 0);
        this.pointsTXT = this.scene.add.text(this.scene.game.config.width / 2 - 60, 20, "PUNTOS: " + this.points,
            {fontSize: 18, color: '#000000', fontFamily: 'arcade_classic'}).setAlign('center');

        this.scene.add.existing(this);

        this.scene.events.on('enemyKilled', (enemy) => {
            switch(enemy.getType()) {
                case 0: this.points += 10; break;
                case 1: this.points += 20; break;
                case 2: this.points += 30; break;
            }
            console.log(this.points);
            this.pointsTXT.text = "PUNTOS: " + this.points;
        });

        this.lifes = [];
        let width = 35;
        for (let i = 0; i < 3; i++) {
            this.lifes[i] = this.scene.add.sprite(10 + width * (i + 1), 25, 'ship');
        }

        this.scene.events.on('hit', (player) => {
            this.lifes[player.getLifes()].destroy();
        })
    }

    getPoints() { return this.points; }
}