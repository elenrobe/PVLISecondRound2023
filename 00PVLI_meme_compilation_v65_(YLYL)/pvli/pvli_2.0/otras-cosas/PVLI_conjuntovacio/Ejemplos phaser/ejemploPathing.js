this.posPlayer();
    //Si se encuentra cerca del jugador este empezará a seguirlo
    if (this.active && (this.dX < this.range && this.dY < this.range && this.dX > -this.range && this.dY > -this.range)) {
      this.scene.physics.moveTo(this, this.player.x, this.player.y, this.speed);
    }