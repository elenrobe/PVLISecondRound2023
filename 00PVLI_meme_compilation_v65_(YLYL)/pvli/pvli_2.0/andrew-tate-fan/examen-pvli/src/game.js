import Boot from "./boot.js";
import Level from "./level.js";
import Menu from "./menu.js";

window.onload = () =>
{

    const config = {
        type: Phaser.WEBGL,
        parent: "mygame",
        scale: {
            width: 320,
            height: 240,
            zoom: 3,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        pixelArt: true,
        scene: [Boot, Menu, Level],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        }
    };

    new Phaser.Game(config);
};