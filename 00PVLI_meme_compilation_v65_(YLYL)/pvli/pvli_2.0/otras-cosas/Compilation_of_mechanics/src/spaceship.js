export default class Spaceship extends Phaser.GameObjects.Sprite
{

    constructor(scene, x, y, maxFuel)
    {
        super(scene, x, y, 'spaceship');

        this.maxFuel = maxFuel;
        this.fuel = 0;
        this.speed = 100;

        this.label = this.scene.add.text(this.x - 15, this.y - 40, "");

        this.create();
    }

    create() 
    {
        this.updateFuel();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        //this.body.setImmovable(true);
        this.body.pushable = false;
    }

    updateFuel()
    {
        this.text = this.fuel + "/" + this.maxFuel;
        this.label.text = this.text;
    }

    loadFuel(spaceship, player)
    {
        if (player.fuel)
        {
            spaceship.scene.drop.play();

            player.fuel = false;
            player.fuelImage.destroy();
            spaceship.fuel++;

            spaceship.updateFuel();

            if (spaceship.fuel == spaceship.maxFuel)
            {
                spaceship.scene.win.play();
                spaceship.label.text = "   ";
                spaceship.body.setVelocityY(-spaceship.speed);
                spaceship.scene.timeoutToMenu();
            }
            else
            {
                spaceship.scene.newFuel();
            }
        }

    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) 
    {
        super.preUpdate(t, dt);
    }
}