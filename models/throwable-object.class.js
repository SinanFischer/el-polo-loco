class throwableObject extends MovableObject {

    IMAGES_BOTTLE_ROTATION = [
        ' ../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        ' ../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        ' ../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        ' ../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTLE_SPLASH = [
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super();
        this.loadImage('../img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);

        this.throw();
    }


    throw() {
        this.fallSpeedY = 20; 
        this.applyGravity();

        setInterval(() => {
            this.x += 40;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        },50)


    }






}