//Escena del menu principal
export default class MainMenu extends Phaser.Scene {
    constructor()
    { 
      super({key: 'mainmenu'});
    }

    create()
    {
      //Añadimos la musica del menu de juego
      // this.musica = this.sound.add('menumusic', 
      // {volume: this.game.sound.volume * 0.5, loop: true});
      
      // this.focusCheck = new Phaser.GameObjects.Rectangle (this, 
      //   500, 256, 1000, 512, 0xfffffff, 0xfffffff).setInteractive();

      // //Si pulsamos la pantalla y no hay musica, empezara 
      // //a reproducirse la cancion del menu
      // this.focusCheck.on('pointerdown', () => {
      //   if (!this.musica.isPlaying)
      //     this.musica.play();
      // });
    
      //Añadimos los sprites del menu
      this.add.image(0,0,'sky').setOrigin(0,0);
      //this.add.sprite(500, 256, 'menuprincipal');

      //Añadimos los botones del menu
      this.play = this.add.sprite(400, 256, 'botones', [0]).setInteractive();
      this.play2 = this.add.sprite(400, 352, 'botones', [1]).setInteractive();
      this.play3 = this.add.sprite(400, 448, 'botones', [2]).setInteractive();

      
      // //Si pulsamos el boton de ajustes, cargamos esa escena
      // this.settings.on('pointerdown', () => 
      //   this.scene.launch('settingsmenu'));
      // //Si pulsamos el boton de creditos, cargamos esa escena
      // this.credits.on('pointerdown', () => 
      //   this.scene.launch('creditsmenu'));

      //Si pulsamos el boton de play...
      this.play.on('pointerdown', () => {

        this.scene.start('animationsscene');

        // //Destruimos los botones para que generen problemas 
        // this.play.destroy();
        // this.play2.destroy();
        // this.play3.destroy();

        // // //Detenemos el sonido del juego
        // // this.game.sound.stopAll();

        // // //Y añadimos el video de introduccion, escalandolo
        // // this.video = this.add.video(500, 256, 'Tutorial');
        // // this.video.setScale(0.78);

        // // //Reproducimos el video
        // // this.video.play();
        // // this.video.setPaused(false);

        // //Añadimos el comando de Escape
        // this.endingKey = this.input.keyboard.addKeys({
        //   esc: Phaser.Input.Keyboard.KeyCodes.ESC
        // });

        // //Si pulsamos la tecla de Escape, finalizamos 
        // //el video y comenzamos el juego 
        // this.endingKey.esc.on('down', () => {
        //   this.video.destroy(); 
        //   this.scene.start('clasebaja', 400);
        // });

        // //Si finalizamos el video, comenzamos el juego
        // this.video.on('complete', () => {
        //   this.video.destroy();
        //   this.scene.start('clasebaja', 400);
        // })
    }); 

    this.play2.on('pointerdown', () => 
    {
      this.scene.start('parallax');
    });

    this.play3.on('pointerdown', () => 
    {
      this.scene.start('parallaxenemies');
    });

    let estilo = {
      fontFamily: 'Play',
      fontSize: '20px',
      color: '#1020DD'
    };

    let text = this.add.text(100,100, 'Mvtº Toroidal Obj', estilo);
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => this.clickButton());

    let text2 = this.add.text(100,200, 'Tiled Game', estilo);
    text2.setInteractive({ useHandCursor: true });
    text2.on('pointerdown', () => this.scene.start('tiledscene'));

    let text3 = this.add.text(100,300, 'Tiled Game 2', estilo);
    text3.setInteractive({ useHandCursor: true });
    text3.on('pointerdown', () => this.scene.start('tiledscenehidden'));

    let text4 = this.add.text(100,400, 'Bouncing bubbles', estilo);
    text4.setInteractive({ useHandCursor: true });
    text4.on('pointerdown', () => this.scene.start('bubblesscene'));

    let text5 = this.add.text(100,500, 'Camera scene', estilo);
    text5.setInteractive({ useHandCursor: true });
    text5.on('pointerdown', () => this.scene.start('bigtiledscene'));

    let text6 = this.add.text(600, 100, 'Balls game', estilo);
    text6.setInteractive({ useHandCursor: true });
    text6.on('pointerdown', () => this.scene.start('ballsscene'));

    let text7 = this.add.text(600, 200, 'Jetpac', estilo);
    text7.setInteractive({ useHandCursor: true });
    text7.on('pointerdown', () => this.scene.start('menu'));

    let text8 = this.add.text(600, 300, 'Bee Scroller', estilo);
    text8.setInteractive({ useHandCursor: true });
    text8.on('pointerdown', () => this.scene.start('scrollscene'));
  }

  clickButton()
  {
    this.scene.start('torusscene');
  }
}