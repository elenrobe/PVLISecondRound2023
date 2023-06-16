import Boot from "./boot.js";
import Menu from "./menu.js";
import Level from "./level.js";
import Victory from "./victory.js";

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
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Boot, Menu, Level, Victory ],
	title: "Examen Ordinaria 2022-2023 PVLI",
	version: "1.0.0"
};

new Phaser.Game(config);