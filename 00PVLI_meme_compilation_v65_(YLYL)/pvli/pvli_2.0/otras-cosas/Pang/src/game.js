import MainMenu from './mainMenu.js';
import GameScene from './gameScene.js';
import EndMenu from './endMenu.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {y: 0}, 
				debug: true
			}
		},
		
        backgroundColor: '#FFF000',
        pixelArt: true,
        scene: [ MainMenu, GameScene, EndMenu ]
    };

    new Phaser.Game(config);
};