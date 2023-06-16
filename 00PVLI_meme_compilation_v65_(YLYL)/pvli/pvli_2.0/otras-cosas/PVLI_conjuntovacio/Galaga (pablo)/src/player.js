import Bullet from "./bullet.js";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setOffset(5, 10);
        this.body.setSize(25, 25);

        this.setScale(2, 2);

        this.controlRIGHT = this.scene.input.keyboard.addKey('RIGHT');
        this.controlLEFT = this.scene.input.keyboard.addKey('LEFT');
        this.controlSPACE = this.scene.input.keyboard.addKey('SPACE');

        this.speed = 250;

        this.playerBulletGroup = this.scene.add.group();
        this.coolDown = 250; this.deltaTime = 0;

        this.lifes = 3;
        this.initialPos = {iniX: x, iniY: y};

        this.scene.events.on('hit', () => {
            this.x = this.initialPos.iniX;
            this.y = this.initialPos.iniY;
            this.lifes--;
        })
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.deltaTime += dt; 

        if (this.controlRIGHT.isDown && this.x < this.scene.game.config.width - 30) {
            this.body.setVelocityX(this.speed);
        }
        else if (this.controlLEFT.isDown && this.x > 30) {
            this.body.setVelocityX(-this.speed);
        }
        else this.body.setVelocity(0);

        if (this.controlSPACE.isDown && this.coolDown < this.deltaTime) {
            this.deltaTime = 0;
            this.playerBulletGroup.add(new Bullet(this.scene, this.x, this.y - 20, 'shoot', "player"));
        }
    }

    getLifes() { return this.lifes; }
}