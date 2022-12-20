class Endboss extends MovableObject {

    world;
    y = 120;
    energy = 60000;
    height = 500;
    width = 300;
    speed = 0;
    counter = 0; // for boss fight start

    offset = {
        top: 90,
        bottom: 120,
        left: 27,
        right: 40
    }

    angry_attack_sound = new Audio('../audio/endboss_chicken/chicken_angry_attack_sound.mp3'); 
    flapping_sound = new Audio('../audio/endboss_chicken/chicken_flapping.mp3'); 
    boss_music_sound = new Audio('../audio/endboss_chicken/danger_approaching_sound.mp3'); 


    IMAGES_WALKING = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',

    ];

    IMAGES_ALERT = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);  // loads first image of object 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5200;
        this.animate();
    }

    isAttacking = false;

    /** 
     * 
     * @param {number} counter - counts every 100ms once => counter = 10 == 1 second 
     */
    animate() {

        let endbossStartIv = setInterval(() => {
            if (this.counter <= 30) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (this.counter <= 54) {
                this.playAnimation(this.IMAGES_ALERT);
                if (this.counter > 45) {
                this.angry_attack_sound.play(); 
                }
            }
            if (this.counter > 54) {
                this.playAnimation(this.IMAGES_WALKING);
                if (this.isAttacking) {
                    clearInterval(endbossStartIv);
                    this.startAttack();
                }
            }
        }, 200);
    }


    startAttack() {
        this.angry_attack_sound.play(); 
        this.flapping_sound.play(); 
        let i = 0;
        let attackIv = setInterval(() => {
            i++;
            this.speed = 0;
            this.playAnimation(this.IMAGES_ATTACK);

            if (i >= 8) { // animation ends

                this.endAttack(attackIv);
            }
        }, 200);
    }


    endAttack(attackIv) {
        this.isAttacking = false;
        clearInterval(attackIv);
        this.animate();
        this.speed = 10;


    }



    /** Iv = Interval /// functions starts Bossfight
     * 
     */
    bossFightStartSequence() {

        this.boss_music_sound.play(); 

        let startBossFightIv = setInterval(() => {
            if (this.counter < 30) {
                this.speed = 10;
                this.moveLeft();
            }

            if (this.counter > 54) {
                clearInterval(startBossFightIv);
                this.speed = 4;
                setInterval(() => {
                    this.moveLeft();
                }, 1000 / 60);

            }
        }, 100);

        setInterval(() => {
            this.counter++;
        }, 100);

    }


    setWorldEnd() {

    }

}