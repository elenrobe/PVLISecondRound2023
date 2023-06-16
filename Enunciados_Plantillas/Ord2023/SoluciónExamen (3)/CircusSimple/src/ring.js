/**
 * Obstáculo que consiste en un aro de fuego que el jugador debe saltar por el medio
 * @extends Phaser.GameObjects.Sprite
 */
export default class Ring extends Phaser.GameObjects.Sprite {
	/**
	* Constructor
	* @params Phaser.Scene scene - Escena en la que aparece el objeto
	* @params Number x - Posición X
	* @params Number y - Posición Y
	* @params Boolean real - Si true entonces el aro se compondrá de dos imágenes para que el jugador pase por medio
	*/
    constructor(scene, x, y, real=true) {
        super(scene, x, y, "ring", 0);
						
		// Lo añadimos a la escena
        this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.setAllowGravity(false); // Los aros de fuego se mantienen suspendidos en el aire

		// Ajustamos el tamaño a la parte inferior de la imagen del aro para que el jugador pueda saltar por medio
		// No nos hace falta parte superior ya que el jugador por la limitación de salto no podrá chocar con la parte superior
		this.body.setSize(16, 8)
		this.body.setOffset(5, this.height-8);
		
		// Velocidad de movimiento del aro y escala
        this.speed = 80;
		this.setScale(3,3);
		
		// Iniciamos animación
		this.play('fire_ring');
    }
    
	/**
	* Update
	* El anillo se mueve de izquierda a derecha y si llega al inicio de la cámara vuelve a la derecha
	* Usamos solo dos anillos en el juego y estos tienen un movimiento toroidal que usamos para reutilizarlos
	*/
    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.body.setVelocity(-this.speed, 0);
		if (this.x+this.width > this.scene.getGoalX()){
			this.destroy();
		}
		else if (this.x+this.width < this.scene.cameras.main.scrollX)
		{
			this.x+=1400;
		}
    }
    
}