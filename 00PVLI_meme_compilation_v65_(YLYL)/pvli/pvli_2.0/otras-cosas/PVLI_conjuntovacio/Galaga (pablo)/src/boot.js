export default class Boot extends Phaser.Scene {
    constructor() {
        super({key: 'boot'});
    }

    preload() {
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/');

        this.load.image('background', 'sprites/background.png');

        this.load.image('logo', 'sprites/logo.png');
        this.load.image('ship', 'sprites/ship.png');
        this.load.image('enemy0','sprites/enemy1.png');
        this.load.image('enemy1','sprites/enemy2.png');
        this.load.image('enemy2','sprites/enemy3.png');
        this.load.image('shoot','sprites/shoot.png');

        this.load.audio('menu', 'sounds/menu.mp3')
    }

    create() {
        this.scene.start('menu');
    }
}