import Menu from "./Menu.js"
import Escena from "./Escena.js"
import Boot from "./boot.js"
window.onload = ()=>{

    const config = {
        type: Phaser.Canvas,
        canvas: document.getElementById('juego'),
        width:256,
        height:196,
        pixelArt:true,
        scale: {
            mode : Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH
        },
        pixelArt: true,
        physics:{
            default: 'arcade',
            arcade : {
                gravity: { y:200 },
                debug : true
            }
        },
        scene: [ Boot, Menu, Escena ]
    };

    new Phaser.Game(config);
};