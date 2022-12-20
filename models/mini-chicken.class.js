class MiniChicken extends MovableObject {

    height = 50;
    width = 60;
    speed = 0.4;
    energy = 20;
    y = 490;
    jumpingSequence = 0; // indicates in which time intervals the chickens jumps
    IMAGES_WALKING = [
        '../img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_FLAT = [
        '../img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    kill_sound = new Audio('../audio/chicken_dead.mp3');

    constructor() {
        super().loadImage('../img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_FLAT);

        this.x = 600 + Math.random() * 3500; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.speed = 2 + Math.random() * 0.25;
        this.jumpingSequence = 250 + Math.random() * 600; 
        this.animate();
        this.applyGravity();
    }

    animate() {

        let jumpTimer = 0;

        setInterval(() => {
            jumpTimer++;


            if (!this.otherDirection) {
                this.moveLeft();
            }

            if (this.otherDirection) {
                this.moveRight();
            }

        }, 1000 / 100);  // 100 FPS 

        let animateInterval = setInterval(() => {

            if (this.isDead()) {
                this.kill_sound.play();
                this.playAnimation(this.IMAGES_FLAT);
                clearInterval(animateInterval);  // stops current intervall for dead chicken so dead sound only play once
            }

            else if  (jumpTimer >= this.jumpingSequence) {
                jumpTimer = 0;
                this.jump();
            }

            else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 100);
    }

}