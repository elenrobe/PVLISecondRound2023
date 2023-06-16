//Escena del menu principal
export default class Menu extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'menu' });
  }

  create()
  {
    let paramNivel = {};

    let x = 80;

    let text0 = this.add.text(x - 10, 40, 'ROBOTRON 2048');

    let text = this.add.text(x, 80, 'Facil');
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => 
    {
      paramNivel.numEnemies = 1;
      paramNivel.livesEnemies = 1;
      paramNivel.numCitizens = 2;

      this.scene.start('level', paramNivel);
    });

    let text2 = this.add.text(x, 120, 'Intermedio');
    text2.setInteractive({ useHandCursor: true });
    text2.on('pointerdown', () => 
    {
      paramNivel.numEnemies = 3;
      paramNivel.livesEnemies = 2;
      paramNivel.numCitizens = 3;

      this.scene.start('level', paramNivel);
    });

    let text3 = this.add.text(x, 160, 'Dificil');
    text3.setInteractive({ useHandCursor: true });
    text3.on('pointerdown', () => 
    {
      paramNivel.numEnemies = 5;
      paramNivel.livesEnemies = 3;
      paramNivel.numCitizens = 5;

      this.scene.start('level', paramNivel);
    });
  }
}