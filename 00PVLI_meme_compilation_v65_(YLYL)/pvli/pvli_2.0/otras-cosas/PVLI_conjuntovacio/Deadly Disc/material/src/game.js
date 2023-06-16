import Level from "./level.js";

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0},
                debug: true,
                debugShowBody: true,
                debugShowStaticBody: true,
            }
        },
        scene: [ Level ]
    };

    new Phaser.Game(config);
};