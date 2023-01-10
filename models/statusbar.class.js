class StatusBar extends drawableObject{
    IMAGES_PEPE = [
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',


    ]



    percentage = 100;

    constructor() {
        super(); 
        this.loadImages(this.IMAGES_PEPE);
        this.setPercentage(100); 
        this.x = 20; 
        this.y = -20; 
        this.width = 400;
        this.height = 90;  

    }


    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .. 5 
        let imagePath = this.IMAGES_PEPE[this.resolveImageIndex()]; 
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