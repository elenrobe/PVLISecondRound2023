import Boot from './boot.js';
import End from './end.js';
import Parallax from './parallax.js';
import AnimationsScene from './animationsScene.js';
import MainMenu from './mainmenu.js';
import Menu from './menu.js';
import ParallaxEnemies from './parallaxEnemies.js';
import TorusScene from './torusScene.js';
import TiledScene from './TiledScene.js';
import TiledSceneHidden from './TiledSceneHidden.js';
import BubblesScene from './bubblesScene.js';
import BigTiledScene from './BigTiledScene.js';
import BallsScene from './ballsScene.js';
import Space from './space.js';
import ScrollScene from './scrollScene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    //Tamaño del canvas en pantalla
    width: 800,
    height: 600,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Parallax, AnimationsScene, End, MainMenu, ParallaxEnemies,
        TorusScene, TiledScene, TiledSceneHidden, BubblesScene, BigTiledScene,
        BallsScene, Menu, Space, ScrollScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    }
};

new Phaser.Game(config);