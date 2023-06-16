import HUD from "./HUD.js";
import Enemy from "./enemy.js";
import Player from "./player.js"

export default class Level extends Phaser.Scene {
    constructor() {
        super({key: 'level'});

        this.numEnemies;
        this.enemiesArray = [];

        this.timeTillAttack = 3000;
        this.deltaTime = 0;
    }

    create() {
        this.add.image(0, 0, 'background').setScale(1.5, 1.5);

        this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 50, 'ship');

        this.enemies = this.add.group();
        this.initializeEnemies();

        this.physics.add.overlap(this.player.playerBulletGroup, this.enemies, (bullet, enemie) => {
            bullet.die(); enemie.die(); 
            this.numEnemies--;
        });

        this.physics.add.overlap(this.player, this.enemies, () => {
            if (this.player.getLifes() == 1) this.scene.start('victory', {points: this.HUDinfo.getPoints()});
            else {
                this.events.emit('hit', this.player);
                this.initializeEnemies();
            }
        });

        this.HUDinfo = new HUD(this);
    }

    update(t, dt) {
        super.update(t, dt);
        
        this.deltaTime += dt;
        if (this.deltaTime > this.timeTillAttack) {
            let random = Math.floor(Math.random() * this.enemiesArray.length);
            this.enemiesArray[random].attack(this.player);
            this.deltaTime = 0;
        }  

        if (this.numEnemies <= 0) {
            this.scene.start('victory', {points: this.HUDinfo.getPoints()});
        }
    }

    initializeEnemies() {
        this.enemies.clear(true); // true elimina los objetos
        this.numEnemies = 10; // (10 - 1)
        let width = this.game.config.width / this.numEnemies;
        for (let i = 1; i < this.numEnemies; i++) {
            let type = Math.floor(Math.random() * 3);
            var e = new Enemy(this, width * i, Math.floor(Math.random() * 400) + 80, 'enemy' + type, type);
            this.enemies.add(e);
            this.enemiesArray[i - 1] = e;
        }
        this.numEnemies--;
    }
}