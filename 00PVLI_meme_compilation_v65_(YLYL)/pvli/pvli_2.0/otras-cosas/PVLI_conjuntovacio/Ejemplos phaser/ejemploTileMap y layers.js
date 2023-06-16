createTileMap() {
    this.map = this.make.tilemap({
      key: this.mapName,
    });
      const tileset2 = this.map.addTilesetImage('interior', 'interior');
      const tileset1 = this.map.addTilesetImage('Props2', 'Props2');
      const tileset3 = this.map.addTilesetImage('TopDownHouse_FloorsAndWalls', 'TopDownHouse_FloorsAndWalls');
      const tileset4 = this.map.addTilesetImage('TopDownHouse_FurnitureState1', 'TopDownHouse_FurnitureState1');
      const tileset5 = this.map.addTilesetImage('TopDownHouse_SmallItems', 'TopDownHouse_SmallItems');
      const tileset6 = this.map.addTilesetImage('kitchen', 'kitchen');
      const tileset7 = this.map.addTilesetImage('Interiors_free_16x16', 'Interiors_free_16x16');
      //añadimos fondo y nubes
      const tileset8 = this.map.addTilesetImage('Abismo', 'Abismo');
      const tileset9 = this.map.addTilesetImage('Basement', 'Basement');
      const tileset10 = this.map.addTilesetImage('Clouds_3', 'Clouds_3');
      const tileset11 = this.map.addTilesetImage('nubes2', 'nubes2');
      //añadimos este a capa suelo como extra
      this.backgroundLayer = this.map.createLayer('suelo', [tileset2, tileset3, tileset4, tileset6, tileset7,tileset8,tileset9,tileset10,tileset11]);
      this.boxLayer = this.map.createLayer('paredes', [tileset2, tileset6]);
      this.adornosLayer = this.map.createLayer('adornos', [tileset5, tileset4, tileset6, tileset1, tileset7])
  }
  //Ej 2
  //Cargas el json de tiled
  this.load.tilemapTiledJSON('tileMap', 'assets/tilemap/tilemapPL.json');
    this.load.image('mapTiles', 'assets/sprites/tileset/Modern_Exteriors_32x32/Modern_Exteriors_Complete_Tileset_32x32.png');
   //Mapa - Capas Normales 1 - Parte 1
   //Hay que cargar tileSet (conjunto de tiles usadas)/TileMap/Json de tilemap
   let tileSet = this.map.addTilesetImage('Modern_Exteriors_Complete_Tileset_32x32', 'mapTiles');
   this.mapGround = this.map.createStaticLayer('suelo', tileSet);
   this.mapBajos = this.map.createStaticLayer('jugEncima', tileSet);
   this.mapAdornos = this.map.createStaticLayer('jugColisiona', tileSet);
   this.player = new Player(this, 3840, 2770, this.numN, this.money, this._myTrust, this.moneyPP);
   this.mapTechos = this.map.createStaticLayer('jugDebajo', tileSet);
   this.mapCollisions = this.map.createStaticLayer('Collisions', tileSet);
   this.mapCollisions.setCollisionBetween(0, 10000, true, false);
   this.physics.add.collider(this.player, this.mapCollisions);
   this.mapCollisions.visible = false;