export default class Score extends Phaser.GameObjects.Text{
    constructor(scene,x,y,text,score=1000){
        super(scene,x,y,text);
        this.maxValue=score;
        this.textVar=text;
        this.setDisplaySize(200,50);
        this.setScrollFactor(0,0);
        this.text+= this.maxValue;
        this.acum=0;
        this.scene=scene;
        this.scene.add.existing(this);
    }
    updateTemp(dt)
    {
        this.acum+=dt;
        if(this.acum>=1000)
        {
            this.acum = 0;
            if(this.maxValue>0)this.maxValue-=50;
        }
        this.setText(this.textVar+ this.maxValue);
    }
    getScore()
    {
        return this.maxValue;
    }
}