class MiniChicken extends MovableObject {

    height = 50;
    width = 60;
    speed = 0.4;
    energy = 20;
    y = 490;
    jumpingSequence = 0; // indicates in which time intervals the chickens jumps
    jumpTimer = 0;
    IMAGES_WALKING = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_FLAT = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    kill_sound = new Audio('./audio/mini_chicken_dead.mp3');

    constructor() {
        super().loadImage('./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_FLAT);

        this.x = 1000 + Math.random() * 5000; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.speed = 2 + Math.random() * 0.25;
        this.jumpingSequence = 250 + Math.random() * 600; 
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.jumpTimer++;
            this.moving(); 
        }, 1000 / 100);  // 100 FPS 

        this.if_Dead_Jump_Walk(); 
    }


    moving() {
        if (!this.otherDirection) {
            this.moveLeft();
        }
        if (this.otherDirection) {
            this.moveRight();
        }
    }


    // calls function when chicken is dead 
    chickenIsDead(animateInterval) {
        this.kill_sound.play();
        this.playAnimation(this.IMAGES_FLAT);
        clearInterval(animateInterval);  // stops current intervall for dead chicken so dead sound only play once
    }


    if_Dead_Jump_Walk() {
        let animateInterval = setInterval(() => {
            if (this.isDead()) {
                this.chickenIsDead(animateInterval)
            }
            else if  (this.jumpTimer >= this.jumpingSequence) {
                this.jumpTimer = 0;
                this.jump();
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

}