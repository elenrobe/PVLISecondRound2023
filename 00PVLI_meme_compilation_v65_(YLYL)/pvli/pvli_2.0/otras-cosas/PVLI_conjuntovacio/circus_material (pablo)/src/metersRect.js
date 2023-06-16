export default class MetersRect extends Phaser.GameObjects.Container {
    constructor(scene, x, y, meters) {
        super(scene, x, y);
        
        // Añadir a la escena
        this.scene.add.existing(this);

        // Crear rectángulo y texto
        this.rect = this.scene.add.rectangle(x, y, 130, 60, '#000000').setStrokeStyle(4, 0xff1010);
        this.text = this.scene.add.text(x, y, meters + "M", {fontSize: 30, color: '#d62215', fontFamily: 'arcade_classic'}).setOrigin(0.5, 0.5);
    }
}