import Player from "./player.js";
import Citizen from "./citizen.js";
import Enemy from "./enemy.js";

export default class Level extends Phaser.Scene
{
  /**
   * Constructor de la escena
   */
  constructor()
  {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(paramNivel) 
  {
    this.numEnemies = paramNivel.numEnemies;
    this.livesEnemies = paramNivel.livesEnemies;
    this.numCitizens = paramNivel.numCitizens;

    this.explosion = this.sound.add('explosion');
    this.pick = this.sound.add('pick');
    this.win = this.sound.add('win');
    this.lose = this.sound.add('lose');
    this.shoot = this.sound.add('shoot');

    this.player = new Player(this, 20, 20);

    this.bombs = this.add.group();

    this.citizens = this.add.group();

    this.physics.add.collider(this.player, this.citizens, this.player.pickUpCitizen);

    for (let i = 0; i < this.numCitizens; i++)
    {
      this.newCitizen();
    }

    this.enemies = this.add.group();

    this.physics.add.collider(this.player, this.enemies, this.gameOver);
    this.physics.add.collider(this.enemies, this.bombs, this.hitEnemy);

    for (let i = 0; i < this.numEnemies; i++)
    {
      this.newEnemy();
    }
  }

  newCitizen()
  {
    let randX = Phaser.Math.Between(0, this.scale.width);
    let randY = Phaser.Math.Between(0, this.scale.height);
    let citizen = new Citizen(this, randX, randY);
    this.citizens.add(citizen);
  }

  newEnemy()
  {
    let randX = Phaser.Math.Between(0, this.scale.width);
    let randY = Phaser.Math.Between(0, this.scale.height);
    let enemy = new Enemy(this, randX, randY, this.livesEnemies);
    this.enemies.add(enemy);
  }

  hitEnemy(enemy, bomb)
  {
    bomb.destroy();
    enemy.decreaseLives();
  }

  winGame()
  {
    this.win.play();
    this.pauseGame();
    this.timeoutToMenu();
  }

  gameOver(player, enemy)
  {
    player.scene.lose.play();
    player.scene.pauseGame();
    player.playerLose();
    player.scene.timeoutToMenu();
  }

  timeoutToMenu()
  {
    this.myTimeout = this.time.addEvent({
      delay: 1000,                // ms
      callback: this.toMenu,
      args: [],
      callbackScope: this,
      loop: false
    });
  }

  toMenu()
  {
    this.player.lose = false;
    console.log("to menu");
    this.scene.start('menu');
  }

  pauseGame()
  {
    this.player.body.setVelocity(0, 0);
    this.player.inputEnabled = false;

    this.citizens.children.iterate(child =>
    {
      child.body.setVelocity(0, 0);
    })

    this.enemies.children.iterate(child =>
      {
        child.move = false;
        child.body.setVelocity(0, 0);
      })
  }

  update()
  {
    if (this.player.citizens == this.numCitizens)
      this.winGame();
  }
}