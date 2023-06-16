export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, type) {
        super(scene, x, y, sprite);
     
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        switch (type) {
            case 0: this.setScale(2, 2); break;
            case 1: this.setScale(1.4, 1.4); break;
        }

        this.speed = 100;
        this.type = type;

        // Tween de movimiento
        // this.tween = this.scene.tweens.add({
        //     targets: [this],
        //     x: this.x + 80,
        //     ease: 'easeInOut',
        //     flipX: true,
        //     durantion: 2000,
        //     yoyo: true,
        //     repeat: -1,
        //     onFlip: () => { this.changeOrientation() }
        //     }
        // );

        this.initialX = x;
        this.attackPlayer = false;
        this.orientation = 1;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        if (this.attackPlayer) {
            let x = this.player.x - this.x;
            let y = this.player.y - this.y;
            this.body.setVelocity(x, y);
        } else {
            if (this.x > this.initialX + 80 && this.orientation === 1)  this.orientation = -1;
            else if (this.x < this.initialX - 80 && this.orientation === -1) this.orientation = 1; 
            this.body.setVelocity(this.orientation * 150, 0);
        }
    }

    changeOrientation() {
        if (!this.flipX) this.flipX = true;
        else this.flipX = false;
    }

    die() {
        this.scene.events.emit('enemyKilled', this);
        this.body.destroy();
        this.destroy();
    }

    attack(player) {
        this.attackPlayer = true;
        this.player = player;
    }

    getType() { return this.type; }
}