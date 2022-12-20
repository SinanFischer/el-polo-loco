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
        '../img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', // left
        '../img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', // right
    ]



    constructor() {
        super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);  // loads first image of object 

        this.x = 400 + Math.random() * 500; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.y = 450;
    }


    // when coin is collected
    collectBottle() {
        //this.get_coin_sound.play(); 
        this.collected = true;
        this.y = -1000;
    }
}