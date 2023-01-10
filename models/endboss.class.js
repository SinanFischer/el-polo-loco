class Endboss extends MovableObject {

    world;
    y = 120;
    energy = 180;
    height = 500;
    width = 300;
    speed = 0;
    counter = 0; // for boss fight start
    invincible = false;
    isAttacking = false;

    offset = {
        top: 90,
        bottom: 120,
        left: 27,
        right: 40
    }

    angry_attack_sound = new Audio('./audio/endboss_chicken/chicken_angry_attack_sound.mp3');
    flapping_sound = new Audio('./audio/endboss_chicken/chicken_flapping.mp3');
    boss_music_sound = new Audio('./audio/endboss_chicken/danger_approaching_sound.mp3');
    boss_music_sound_quieter = new Audio('./audio/endboss_chicken/danger_approaching_lowsound.mp3');

    IMAGES_WALKING = [
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [

        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);  // loads first image of object 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 6700;
        this.animate();
    }


    // Iv = Interval ///  do backend functions // starts initialzing first Boss Sequence and starts counter   
    bossFightStartSequence() {
        backgroundsMusic.pause();
        this.boss_music_sound.play();

        let encounterSequenceIv = setInterval(() => {
            this.bossEncounterSequence(encounterSequenceIv);
        }, 100);

        setInterval(() => {
            this.counter++;
        }, 100);
    }


    // first sequence, after it, fight starts
    bossEncounterSequence(encounterSequenceIv) {
        if (this.counter < 30) {
            this.speed = 10;
            this.moveLeft();
        }
        if (this.counter > 54) {
            clearInterval(encounterSequenceIv);
            this.speed = 4;
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }
    }


    /** animates first sequence of boss fight and calls at the end the Bossfight() start
     * 
     * @param {number} counter - counts every 100ms once => counter = 10 === 1 second 
     */
    animate() {
        let endbossStartIv = setInterval(() => {
            if (this.counter <= 30) {
                this.playAnimation(this.IMAGES_WALKING);
                this.invincible = true;
            }
            else if (this.counter <= 54) {
                this.bossSequenzeStep2(); 
            }
            else if (this.counter > 54) {
                this.BossFight();
                this.invincible = false;
                clearInterval(endbossStartIv);
            }
        }, 200);
    }


    bossSequenzeStep2() {
        this.playAnimation(this.IMAGES_ALERT);
        if (this.counter > 45) {
            this.playStartSounds();
        }
    }


    playStartSounds() {
        this.angry_attack_sound.play();
        this.boss_music_sound.pause();
        this.boss_music_sound_quieter.play();
    }


    // starts the actual fight with boss
    BossFight() {
        let i = 0;
        let bossFightIv = setInterval(() => {
            if (this.isDead()) {
                this.bossIsDead(i);
                i++;
            }
            else if (this.isHurt()) {
                this.bossGotHit(); 
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
                this.ifBossHitPlayer(bossFightIv); 
            }
        }, 200);
    }


    bossIsDead(i) {
        if (i > 2 && i <= 12) {
            this.y += 20;
        }
         if (i > 12) {
            backToMenu(1); // 1 = win
        }
        else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    bossGotHit() {
        this.playAnimation(this.IMAGES_HURT);
        this.angry_attack_sound.play();

        if (this.energy < 100 && this.energy > 70) {
            this.startAttack('goAngry');
        }
    }

    
    ifBossHitPlayer(bossFightIv) {
        if (this.isAttacking) {
            clearInterval(bossFightIv);
            this.startAttack('attacked');
        }
    }


    startAttack(attackType) {
        this.attackSounds(); 
        if (attackType = 'goAngry') this.speed = 6;
        if (attackType = 'attacked') this.speed = 0;
        let i = 0;
        let attackIv = setInterval(() => {
            i++;
            this.playAnimation(this.IMAGES_ATTACK);
            if (i >= 8) { // animation ends
                this.endAttack(attackIv, attackType);
            }
        }, 200);
    }


    attackSounds() {
        this.angry_attack_sound.play();
        this.flapping_sound.play();
    }


    endAttack(attackIv, attackType) {
        this.isAttacking = false;
        clearInterval(attackIv);
        this.BossFight();
        if (attackType = 'goAngry') this.speed = 15;
        if (attackType = 'attacked') this.speed = 7;
    }


    pauseMusicByEnd() {
        this.boss_music_sound.pause();
        this.boss_music_sound_quieter.pause();
    }
}