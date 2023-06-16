import Menu from "./menu.js";

const config = {
    type: Phaser.AUTO,
	parent: 'game',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 384,
            height: 192
        },
		max: {
            width:  768, 
            height: 384  
        },
		zoom: 2
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 480 },
            debug: false
        }
    },
    scene: [ Menu ],
	title: "Examen Ordinaria 2022-2023 PVLI",
	version: "1.0.0"
};

new Phaser.Game(config);