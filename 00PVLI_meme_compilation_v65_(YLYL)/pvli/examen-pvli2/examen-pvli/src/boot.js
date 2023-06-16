export default class Boot extends Phaser.Scene{
    constructor(){
        super({
            key:'boot'
        });
    }

    preload(){
        this.load.setPath('assets/map');
        this.load.tilemapTiledJSON('mapa','mapa.json');

        this.load.setPath('assets/sprites');
        this.load.image('suelo', 'tileset.png');
        this.load.spritesheet('player', 'jetpac.png', {frameWidth:17,frameHeight:24});
        this.load.image('fuel', 'fuel.png');
        this.load.image('nave', 'spaceship.png');
        this.load.spritesheet('meteor', 'meteor.png', {frameWidth:16, frameHeight:14});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth:24, frameHeight:17});

        this.load.setPath('assets/sounds');
        this.load.audio('pickup', 'pick.wav');
        this.load.audio('win', 'win.wav');
        this.load.audio('lose', 'lose.wav');
        this.load.audio('explosion', 'explosion.wav');
        this.load.audio('fuel', 'drop.wav');

        this.loadFont("Minecraftia", "/fonts/Minecraftia.ttf");
        
    }

    create(){
        this.scene.start('menu');
    }

    loadFont(name, url) {
        let newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}