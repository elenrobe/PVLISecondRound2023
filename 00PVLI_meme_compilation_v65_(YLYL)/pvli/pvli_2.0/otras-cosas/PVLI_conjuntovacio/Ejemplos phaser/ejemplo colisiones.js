create(){
    // MAPA
    this.map = this.make.tilemap({ 
        key: 'tilsetJSON', 
        tileWidth: 8, 
        tileHeight: 8 
    });
    
    
    this.anims.create({
        key: 'astd',
        frames: this.anims.generateFrameNames('asteroid', {start:0, end:1}),
        frameRate: 3,
        repeat: -1
    });
    
    const tileset1 = this.map.addTilesetImage('ground_ts', 'ground_ts');
    this.groundLayer = this.map.createLayer('ground', tileset1);
    
    // Colisiones
    this.groundLayer.setCollisionBetween(0,999);
    
    const width = this.scale.width;
    const height = this.scale.height;
    
    this.player = new Player(this, width/ 2, 100);
    new Fuel(this);
    // Colision entre player y los tiles
    this.physics.add.collider(this.player, this.groundLayer);//, ()=>);
    
    this.asteroids = this.add.group();
    this.physics.add.collider(this.asteroids,this.player);
    this.physics.add.collider(this.asteroids,this.groundLayer);
    
    this.spaceship = new Spaceship(this, width/2, height - 30, this.max).setOrigin(0.5,1);
    this.physics.add.collider(this.spaceship, this.groundLayer);
    
    this.physics.add.overlap(this.player, this.spaceship, ()=>{
        console.log(this.player.hasFuel());
        if(this.player.hasFuel()){
            this.player.dropFuel();	
            this.spaceship.addFuel();
        }
    });
    this.time.addEvent({delay:1000, callback: ()=>{this.spawnAsteroid()},callbackScope:this, loop:true});
}