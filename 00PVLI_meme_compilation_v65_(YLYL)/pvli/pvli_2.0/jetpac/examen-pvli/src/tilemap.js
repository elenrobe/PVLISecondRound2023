export default class Tilemap{
    constructor(scene){
        this.scene = scene;
        this.map = this.scene.make.tilemap({
            key:'mapa',
            tileWidth:8,
            tileHeight:8,
            height:24,
            width:32
        });

        const tileset1 = this.map.addTilesetImage('suelo','suelo');

        this.layer = this.map.createLayer('Capa', tileset1);

        this.layer.setCollisionByProperty({'colision':true});

    }

    getLayer(){
        return this.layer;
    }

    getWidth(){
        return this.map.width*this.map.tileWidth;
    }

    getHeight(){
        return this.map.height*this.map.tileHeight;
    }
}