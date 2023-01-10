class Coin extends MovableObject {


    IMAGES_COIN = [
        './img_pollo_locco/img/8_coin/coin_1.png',
        './img_pollo_locco/img/8_coin/coin_2.png'
    ];

    offset = {
        top: 50,
        bottom: 100,
        left: 30,
        right: 60
    }

    get_coin_sound = new Audio('./audio/get_coin.wav'); 


    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);  // loads first image of object 
        this.loadImages(this.IMAGES_COIN);
        this.x = 600 + Math.random() * 4300; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.y = 150 + Math.random() * 200; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.animate();
    }



    animate() {
        if (this.collected) {
            stop(); 
        }
            else {
            setInterval(() => {
                this.playAnimation(this.IMAGES_COIN);
            }, 350);
      }
    }


    // when coin is collected
    getCoin() {
        this.get_coin_sound.play(); 
        this.collected = true;  
        this.y = -1000; 
    }

}