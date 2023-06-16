export default class HUD extends Phaser.GameObjects.Container {
    constructor(scene, iniScore) {
        super(scene);
        this.score = iniScore;
        this.done = false;

        // Comprobar si existe una punutación guardada
        let registeredScore = sessionStorage.getItem('highScore');
        this.highscore = registeredScore ? Number(registeredScore) : 0;
        
        // Puntuación
        this.scoreHUD = this.scene.add.text(scene.game.config.width / 2, 80, "Score: " + this.score,
            {fontSize: 20, color: '#FFFFFF', fontFamily: 'arcade_classic'}).setScrollFactor(0, 0);
        this.scoreHUD.setScrollFactor(0, 0);
        this.scoreHUD.setOrigin(0.5, 0.5).setAlign("center");

        // Highscore
        this.highscoreHUD = this.scene.add.text(scene.game.config.width / 2, 55, "Highscore: " + this.highscore,
            {fontSize: 20, color: '#d62215', fontFamily: 'arcade_classic'});
        this.highscoreHUD.setScrollFactor(0, 0);
        this.highscoreHUD.setOrigin(0.5, 0.5).setAlign("center");
        
        // Cargamos sonido de actualizar puntuación al finalizar un nivel
		this.scoreSound = this.scene.sound.add('score');
		this.scoreSound.setLoop(true);

        // Timer que ejecuta una función cada segundo restando puntuación actual
		this.timer = this.scene.time.addEvent( {
            delay: 1000, 
            callback: ()=> this.loseScore(),
            callbackScope: this,
            loop: true
        });
        this.scene.events.on('playerwin', () => {
			this.scene.time.removeEvent(this.timer);
		});

        // Evento al registrar la puntuación
        this.scene.events.on('registerScore', this.listnr = () => {
            console.log("hola");
            if (this.score > this.highscore) {
                this.scoreSound.play();
				this.highScore = 0;
				this.highscoreHUD.text = "Highscore:" + this.highScore;
				sessionStorage.setItem('highScore', this.score); // Guardamos mejor puntuación
				this.timer = this.scene.time.addEvent( {
				  delay: 50, 
				  callback: ()=> this.registerScore(),
				  callbackScope: this,
				  loop: true
				});	
            } else {
                let tween2 = this.scene.tweens.add({
                    targets: this.scoreHUD,
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

    loseScore(){
		if (this.score > 0) this.score -= 50;
		this.scoreHUD.text = "Score:" + this.score;
	}

    registerScore(){
        if(!this.done) {
            if(this.score > 0) {
                this.score -= 50;
                this.highScore +=50;
                this.scoreHUD.text = "Score:" + this.score;
                this.highscoreHUD.text = "highscore:" + this.highScore;
            } else {
                this.done = true;

                this.scoreSound.stop();
                
                let tween = this.scene.tweens.add({
                        targets: this.highscoreHUD,
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

    removeTimersAndListeners(){		
        this.scene.events.off('registerScore', this.listnr);
        this.scene.time.removeEvent(this.timer);
    }
}