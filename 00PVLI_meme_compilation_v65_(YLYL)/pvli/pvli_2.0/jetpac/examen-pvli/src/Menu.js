import Button from "./button.js";

export default class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: 'menu'
        });
    }


    create(){
        let canvas = document.getElementById("juego");
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        
        
        this.button = new Button(this, canvasW/2, canvasH/4, 'Easy', 1, 1, {fuel:2, time:2000});
        this.medium = new Button(this, canvasW/2, canvasH/2, 'Medium', 1, 1, {fuel:3, time:1000});
        this.dif = new Button(this, canvasW/2, 3*canvasH/4, 'Difficult', 1, 1, {fuel:5, time:500})
    }
}