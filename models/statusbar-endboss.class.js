class StatusBarEndBoss extends drawableObject {
    IMAGES_ENDBOSS = [
        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue.png',
        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue80.png',
        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue60.png',
        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue40.png',
        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue20.png',

        './img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue0.png',
    ]

    percentage = 200;
    maxEnergyBoss = 200; 

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.setPercentageEndBoss(this.percentage); 
        this.x = 850;
        this.y = -20;
        this.width = 400;
        this.height = 90;

    }


    setPercentageEndBoss(percentage) {
        percentage = percentage / this.maxEnergyBoss * 100; 
        this.percentage = percentage; 
        let imagePath = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];

    }


    resolveImageIndex() {
        if (this.percentage > 80) {
            return 0;
        } 
         if (this.percentage <= 80 && this.percentage > 60) {
            return 1;

        }   
        if (this.percentage <= 60 && this.percentage > 40) {
            return 2;
        }
        
        if (this.percentage <= 40 && this.percentage > 20) {
            return 3;
        }
        
        if (this.percentage <= 20 && this.percentage > 0) {
            return 4;
        }
        
        if (this.percentage <= 0 ) {
            return 5;
        }
    }
}