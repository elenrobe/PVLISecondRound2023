export default class Button extends Phaser.GameObjects.Container {

    /**
     * Construye un botón nuevo, con el sprite y el texto indicados.
     * @param {Phaser.Scene} scene 
     * @param {number} x - posición en el eje x
     * @param {number} y - posición en el eje x
     * @param {Phaser.GameObjects.Text} text - texto del boton
     */
    constructor(scene, x, y, text, w, h, config) {
      super(scene, x, y);
      this.setScale(w, h);
    //   this.sprite = this.scene.add.rectangle(0, 0, w, h, 0xffffff);
    //   this.add(this.sprite);
      this.text = this.scene.add.text(0, 0, text);
      this.text.setOrigin(0.5, 0.5);
      this.add(this.text);
      this.scene.add.existing(this);
    //   this.sprite.setInteractive();
  
      this.text.setFontSize(20);
      this.text.setColor('#fff');
      this.text.setFontStyle('bold');
      this.text.setInteractive();
  
      this.text.on("pointerover", () => {
        this.text.setColor('#f00');
      });
  
      this.text.on("pointerout", () => {
        this.text.setColor('#fff');
      });

      this.text.on("pointerdown", () => {
        this.scene.scene.start('escena', config);
      });

    }
  
  
  
  }