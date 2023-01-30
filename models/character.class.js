class Character extends MovableObject {

    width = 125;
    height = 220;
    y = 330;
    x = 400; // startposition where our Character starts
    speed = 8;  // 8
    collectedCoins = 0;
    collectedBottles = 0;
    energy = 100;



    offset = {
        top: 90,
        bottom: 10,
        left: 10,
        right: 30
    }

    IMAGES_STANDING = [ 
        './img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',   
    ]; 

    IMAGES_WALKING = [
        './img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        './img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        './img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        './img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        './img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        './img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        './img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
    ]

    IMAGES_IDLE = [
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONGIDLE = [
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]


    world;
    walking_sound = new Audio('./audio/running_on_sand.mp3');
    dead_sound = new Audio('./audio/polloloco_dead.wav');
    ouch_sound = new Audio('./audio/ouch_sound_effect.mp3');



    constructor() {
        super().loadImage('./img_pollo_locco/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.lastMovement();
        this.animate();
        this.applyGravity();
    }


    /** function wird alle x ms ausgeführt. 
     * 
     */
    animate() {
        let intervalSleep = setInterval(() => {
            this.ifCharacterFallsAsleep();
            this.ifCharacterGetsHurt(); //needed to play Anim. by sleep
        }, 200);

        this.movingAnimations(intervalSleep);

        setInterval(() => {
            this.ifWantToJump(); 
            this.ifWantToMoveRight();
            this.ifWantToMoveLeft(); 
            this.world.camera_x = this.x - 300; // - 100 moves camera little to the left so more space behind character 
        }, 1000 / 60);
    }


    /** there 2 states of sleep animation, 'awake' is like dancing - happens the first second when character is only standing
     * 
     */
    ifCharacterFallsAsleep() {
        if (this.isSleepy() == 'awake') {
            this.playAnimation(this.IMAGES_STANDING);
        }
        if (this.isSleepy() == 'sleepy') {
            this.playAnimation(this.IMAGES_IDLE);
        }

        if (this.isSleepy() == 'sleeping') {
            this.playAnimation(this.IMAGES_LONGIDLE);
        }
    }


    ifCharacterGetsHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    // checks if character dead, if not calls if_jump_Hurt_Walk function
    movingAnimations(intervalSleep) {
        let intervalCalls = 0; // to call dead animation just once

        let intervalAnimate = setInterval(() => {
            this.walking_sound.pause();
            if (this.isDead()) {
                this.characterIsDead();
                intervalCalls++;
                this.clearCharacterIntervals(intervalCalls, intervalAnimate, intervalSleep); // when dead Animation was called
            }
            else {
                this.if_jump_Hurt_Walk();
            }
        }, 65);
    }


    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0; 
        setTimeout(() => { backToMenu(0) }, 1500);
    }


    /** function clears ongoing intervals to safe ram
     * 
     * @param {number} intervalCalls - counts intervalcalls to stop animation after all images from dead was called
     * @param {interval} intervalAnimate - to stop interval
     * @param {interval} intervalSleep - to stop interval
     */
    clearCharacterIntervals(intervalCalls, intervalAnimate, intervalSleep) {
        if (intervalCalls == this.IMAGES_DEAD.length) {  // calls dead Animation only 1 times // need to y go down
            clearInterval(intervalAnimate);
            clearInterval(intervalSleep);
            setInterval(() => { // when dead falls out of sight 
                this.y += 10;
            }, 35);
        }
    }


    /** checks if character is jumping / was hit / or is walking
     * 
     */
    if_jump_Hurt_Walk() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.lastMovement();
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }

        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {    // walking animation         // when both true, play function
            this.playAnimation(this.IMAGES_WALKING);
            this.walking_sound.play();
        }
    }


    ifWantToJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }


    ifWantToMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x < this.world.endboss.x) { // moves character in right direction and checks if end of world has reached
            this.moveRight();
            this.lastMovement()
            this.otherDirection = false;
        }
    }


    ifWantToMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 350) { // When x smaller than 0, stop the camera
            this.moveLeft();
            this.lastMovement()
            this.otherDirection = true; // mirroring the character, so animation goes in moving direction
        }
    }
}