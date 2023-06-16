import MetersRect from "./metersRect.js";
import Player from './player.js';
import Floor from './floor.js';
import Fire from './fire.js';
import Rings from './rings.js';
import Platform from "./platform.js";
import HUD from "./HUD.js";

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key: 'Stage'});
        this.highscore = 0;
        this.backgrounds = [];
        this.obstacles;
    }

    init(data) {
        this.meters = data.rec;
        this.bgFactor = 0;
        this.end = false;
        this.score = 0;
    }

    create() {
        // Fondos
        this.backgrounds = [this.add.image(0, this.game.config.height - 600, 'bg1').setOrigin(0, 0).setDepth(-10),
            this.add.image(800, this.game.config.height - 600, 'bg1').setOrigin(0, 0).setDepth(-10),
            this.add.image(800 * 2, this.game.config.height - 600, 'bg1').setOrigin(0, 0).setDepth(-10)];

        // Cuadro de metros
        let metersRectWidth = 140;
        for (let i = 0; i < this.meters / 10; i++)
            new MetersRect(this, metersRectWidth + 800 * i, this.game.config.height - 50, this.meters - (10 * i));

        // Jugador
        this.player = new Player(this, 100, this.game.config.height - 210);

        // Suelos
        this.floor = new Floor(this, 0, this.game.config.height - 120).setScrollFactor(0);

        // Obstáculos
        this.obstacles = this.add.group();	
        this.obstacles.add(new Rings(this, 1000, 415));
        this.obstacles.add(new Rings(this, 1600, 415));
        for (let i = 3; i < this.meters/10; i++)
            this.obstacles.add(new Fire(this, 800 * i + metersRectWidth, this.game.config.height - 210));

        // Plataforma final
        this.platform = new Platform(this, this.meters / 10 * 800, this.game.config.height - 210, 'platform');

        // Colisiones
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.obstacles, this.floor);
        this.physics.add.collider(this.platform, this.floor);

        // La detección de colisión del jugador con los obtáculos la hacemos con overlap para evitar que el jugador los empuje
		this.physics.add.overlap(this.player.group, this.obstacles, (player) => {
            this.music.stop();
            this.playerDeath(player);
        });
        this.physics.add.overlap(this.player.group, this.platform, (player, plt) => {
             this.music.stop();
             this.win(player, plt);
        });
        
        // HUD
        this.hud = new HUD(this, 5000);

        // Cámara
        this.cameras.main.startFollow(this.player, true, 1, 1, -412, 175); // La cámara sigue al jugador con un deplazamiento
        this.cameras.main.setDeadzone(null, this.game.config.height); // Hacemos que la cámara no pueda moverse a lo alto

        // Reproducir música
        const musicConfig = { mute: false, volume: 1, detune: 0, seek: 0, loop: true, delay: 0 }
		this.music = this.sound.add('stage');
        this.music.play(musicConfig);
    }

    update(t, dt) {
        super.update(t, dt);

        // Generación infinita de fondo (reposiconar el primero al final)
        if (this.player.x > this.backgrounds[this.bgFactor].x + 800 + this.player.width) {
            this.backgrounds[this.bgFactor].x += 800 * 3;
            if (this.bgFactor >= 2) this.bgFactor = 0;
            else this.bgFactor++;
        }
    }

    playerDeath(player) {
        this.hud.removeTimersAndListeners();
        this.end = true;
        player.onDeath();
    }

    win(player, platform) {
        this.end = true;
        player.win(platform);
     }

    getPlayer() { return this.player; }

    canGenerateRings() { return this.player.x < this.meters / 10 * 800 - 800; }
}