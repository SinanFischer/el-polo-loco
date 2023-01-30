class crazyChicken extends MovableObject {

    height = 200;
    speed = 0.2;  
    energy = 40; 
    y = 360; 

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    IMAGES_WALKING = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ]; 

    IMAGES_FLAT = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]; 

    kill_sound = new Audio('./audio/chicken_dead.mp3');
    Bkill_sound_real = new Audio('./audio/chicken_dead_real.mp3');

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_FLAT);

        this.x = 5000 + Math.random() * 3000; // Zahl zwischen  math.random generiert zahl zwischen 0 und 1
        this.speed = 0.5; 
        this.animate(); 
    }


    
    // calls randomly a death sound for flated chicken
    randomDeadSound() {
        let randomNumber =  (Math.random() * 2); 
        randomNumber = Math.ceil(randomNumber) - 1; // rounds every number up

        if (randomNumber === 1) {
            this.kill_sound.play();  
        } 
        if (randomNumber === 0) {
            this.Bkill_sound_real.play();
        } 
    }

 
    animate() {
        this.moving(); 
        let animateInterval = setInterval(() => {
            if (this.isDead()) {
                this.randomDeadSound();
                this.playAnimation(this.IMAGES_FLAT); 
                clearInterval(animateInterval);  // stops current intervall for dead chicken 
            }
            else {
            this.playAnimation(this.IMAGES_WALKING); 
            }
        }, 100);
    }


    moving() {
        setInterval(() => {
            if (this.otherDirection) {
                this.moveRight();
            }
            else {
            this.moveLeft(); 
            }
         }, 1000 / 100);  // 100 FPS 
    }




}







