import PlayerAnimations from './playerAnimations.js';

export default class AnimationsScene extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'animationsscene' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.player = new PlayerAnimations(this, 200, 300);
  }
}