  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    //asi pones la direccion que es tu destino
    this.body.setVelocityX(this.speed * this.vec.x);
    this.body.setVelocityY(this.speed * this.vec.y);

    //si coincide pos de bala y player se quita vida al player y se destruye bala
    if (this.scene.physics.overlap(this.player, this)) {
      this.destroyBala();
      this.player.modifyValue(-10);
    }
    // Si colisiona con un objeto se destruye la bala
    else if (this.scene.physics.collide(this.movingObject, this)) this.destroyBala();
    // Si colisiona con las paredes se destruye la bala
    else if (this.scene.physics.collide(this.scene.boxLayer, this)) this.destroyBala();
  }