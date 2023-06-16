export default class Boot extends Phaser.Scene {
    constructor() {
        super({key: 'boot'});
    }

    preload() {
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/');

        // Imágenes
        this.load.image('bg1', 'sprites/background.png');
        this.load.image('bg2', 'sprites/background2.png');
        this.load.image('stars', 'sprites/stars.png');
        this.load.image('platform', 'sprites/platform.png');
        
        // Sprites
        this.load.spritesheet('clown', 'sprites/clown.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('lion', 'sprites/lion.png', {frameWidth: 36, frameHeight: 16});
        this.load.spritesheet('fire', 'sprites/fire.png', {frameWidth: 25, frameHeight: 31});
        this.load.spritesheet('ring', 'sprites/ring.png', {frameWidth: 26, frameHeight: 80});

        // Música y sonidos
        this.load.audio('failure', 'sounds/failure.mp3');
        this.load.audio('stage', 'sounds/stage.mp3');
        this.load.audio('final', 'sounds/final.wav');
        this.load.audio('jump', 'sounds/jump.wav');
        this.load.audio('score', 'sounds/score.wav');
        this.load.audio('menu', 'sounds/menu.mp3');
    }

    create() {
        // Animaciones
        this.anims.create({
            key: 'lionWalk',
            frames: this.anims.generateFrameNames('lion', {start: 1, end: 2}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'clownWin',
            frames: this.anims.generateFrameNames('clown', {start: 2, end: 3}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNames('fire', {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'ringAnim',
            frames: this.anims.generateFrameNames('ring', {star: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.start('menu');
    }
}