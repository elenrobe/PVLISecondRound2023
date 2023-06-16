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

    let text = this.add.text(x, 40, 'Facil');
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 2000;
      paramNivel.numFuel = 2;

      this.scene.start('space', paramNivel);
    });

    let text2 = this.add.text(x, 80, 'Intermedio');
    text2.setInteractive({ useHandCursor: true });
    text2.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 1000;
      paramNivel.numFuel = 3;

      this.scene.start('space', paramNivel);
    });

    let text3 = this.add.text(x, 120, 'Dificil');
    text3.setInteractive({ useHandCursor: true });
    text3.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 500;
      paramNivel.numFuel = 5;

      this.scene.start('space', paramNivel);
    });
  }
}