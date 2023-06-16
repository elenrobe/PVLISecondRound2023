/**
 * Clase que gestiona todo lo relativo a las puntuaciones.
 */
export default class HUD {
    constructor(scene, initscore, debug = 1) {
		this.scene = scene;
		this.score = initscore;
		
		let v = sessionStorage.getItem('highScore'); //Comprobamos si existe alguna puntuación guardada para cargarla
		this.highScore = v ? Number(v) : 0;
		
		this.done=false;
		
		// Puntuación actual
		this.currentScore = this.scene.add.text(scene.game.config.width/2, 100, `score: ${this.score}`, { fontFamily: 'arcade_classic', fontSize: 16, color: '#ffffff' });
        this.currentScore.setOrigin(0.5, 0.5).setAlign("center");
		this.currentScore.setScrollFactor(0,0);
        
		// HighScore
		this.topScore = this.scene.add.text(this.scene.game.config.width/2, 70, `highscore: ${this.highScore}`, { fontFamily: 'arcade_classic', fontSize: 16, color: '#ff1010' });
        this.topScore.setOrigin(0.5, 0.5).setAlign("center");
		this.topScore.setScrollFactor(0,0);
		
		// Timer que ejecuta una función cada segundo restando puntuación actual
		this.timer = this.scene.time.addEvent( {
		  delay: 1000, 
		  callback: ()=> this.loseScore(),
		  callbackScope: this,
		  loop: true
		});	

		// Si el jugador ha ganado dejamos de descontar puntos
		this.scene.events.on('playerwin', () => {
			this.scene.time.removeEvent(this.timer);
		});		
		
		// Cargamos sonido de actualizar puntuación al finalizar un nivel
		this.scoreSound = this.scene.sound.add("score");
		this.scoreSound.setLoop(true);

		// Registramos la escucha del evento "registerScore"
		this.rScore = this.scene.events.on('registerScore', this.listnr = () => {
			// Si al terminar el score actual es mayor que el highscore entonces registramos el nuevo score
			if(this.score > this.highScore){
				this.scoreSound.play();
				this.highScore = 0;
				this.topScore.text = `highscore: ${this.highScore}`;
				sessionStorage.setItem('highScore', this.score); // Guardamos mejor puntuación
				
				this.timer = this.scene.time.addEvent( {
				  delay: 50, 
				  callback: ()=> this.registerScore(),
				  callbackScope: this,
				  loop: true
				});	
			// Si no hemos superado el highscore resaltamos con un tween la puntuación actual e iniciamos el menú
			} else {
				let tween2 = this.scene.tweens.add({
                    targets: this.currentScore,
                    alpha: 0,
                    duration: 500,
                    ease: 'Linear',
					yoyo: true,
					repeat: 4
                });
				tween2.on('complete', () => this.scene.scene.start('menu'));
			}
		});
    }
	
	/**
	 * Resta 50 puntos cada segundo
	 */
	loseScore(){
		this.score -= 50;
		this.currentScore.text = `score: ${this.score}`
	}
	
	/**
	 * Método para restar los puntos del score actual y añadirlos al highscore
	 * Con el timer genera la animación de la puntuación cuando se ha hecho un nuevo record.
	 */
	registerScore(){
		if(!this.done){
			if(this.score > 0){
				this.score -= 50;
				this.highScore +=50;
				this.currentScore.text = `score: ${this.score}`;
				this.topScore.text = `highscore: ${this.highScore}`;
			} else {
				this.done=true;
				
				this.scoreSound.stop();
				
				let tween = this.scene.tweens.add({
						targets: this.topScore,
						alpha: 0,
						duration: 200,
						ease: 'Linear',
						yoyo: true,
						repeat: 4,
						delay: 500
					});
				tween.on('complete', () => this.scene.scene.start('menu'));
				this.removeTimersAndListeners();
			}
		}
	}
	
	/**
	* Método que elimina la escucha del evento
	*/
	removeTimersAndListeners(){		
		this.scene.events.off('registerScore', this.listnr)
		this.scene.time.removeEvent(this.timer);
	}
	    
}