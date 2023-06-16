export default class Pool {
    constructor (scene, entities, time) {
       this._group = scene.add.group();
       this.scene = scene;
       this.time = time;
       this._group.addMultiple(entities);
       this._group.children.iterate(c => {
           c.setActive(false);
           c.setVisible(false);
        });
        console.log(this._group);

        let timer = scene.time.addEvent({
            delay: this.time,
            callback: this.spawn, 
            callbackScope: this,
            args: [0, 0,0],
            loop: true
        });
    }
  
    spawn (x,y,angle) {
      x=Phaser.Math.RND.between(this.scene.physics.world.bounds.x, this.scene.physics.world.bounds.width);
      angle=Phaser.Math.RND.angle();
      let entity = this._group.getFirstDead();
      if (entity) {
        entity.x = x;
        entity.y = y;
        entity.angle = angle;

        entity.body.setVelocityX(100*Math.cos(Phaser.Math.DEG_TO_RAD*angle));
        entity.setActive(true);
        entity.setVisible(true);
      }
      return entity;
    }
  
    release (entity) {
      this._group.killAndHide(entity);
    }
}
