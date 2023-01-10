class Bottle extends drawableObject {


    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    height = 85;
    width = 50;
    collidable = true;

    IMAGES_BOTTLE_GROUND = [
        './img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', // left
        './img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', // right
    ]

    bottle_collect_sound = new Audio('./audio/bottle_collect.mp3'); 

    constructor() {
        super(); 
        let randomNumber =  (Math.random() * this.IMAGES_BOTTLE_GROUND.length); 
        randomNumber = Math.ceil(randomNumber) - 1; // rounds every number up
        this.loadImage(this.IMAGES_BOTTLE_GROUND[randomNumber]);  // loads first image of object 

        this.x = 400 + Math.random() * 5000; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.y = 450;
    }


    // when coin is collected
    collectBottle() {
        this.bottle_collect_sound.play(); 
        this.collected = true;
        this.y = -1000;
    }
    
}