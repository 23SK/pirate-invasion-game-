class Boat{
    constructor(x,y,w,h,pos,boatAnimation){
        var options = {
            restitution:0.8,
            friction:0.8,
            density:1,
        }
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w;
        this.h = h;
        this.boatAnimation = boatAnimation;
        this.speed = 0.05;
        this.boatpos = pos;
        this.isBroken = false;
        this.image = loadImage("./assets/boat.png");
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed%this.boatAnimation.length);
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        image(this.boatAnimation[index],0,this.boatpos,this.w,this.h);
        pop();
    }

    remove(index){
        this.boatAnimation = brokenBoatAnimation;
        this.isBroken = true;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        setTimeout(() => {
        Matter.Body.setVelocity(this.body,{x:0 , y:0})
        World.remove(world,boats[index].body);
        boats.splice(index,1);
        }, 2000);
    }

    animate(){
        this.speed += 0.05;
    }
}