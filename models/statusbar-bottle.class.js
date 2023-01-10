class StatusBarBottle extends drawableObject {
    IMAGES_BOTTLE = [
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]

    collectedBottles = 0;  
    numberOfBottles = 0;  // Exist = x 

    constructor(numberOfBottles) {
        super();
        this.numberOfBottles = numberOfBottles; 
        this.loadImages(this.IMAGES_BOTTLE); 
        this.x = 20; 
        this.y = 130; 
        this.width = 400;
        this.height = 90;  
        this.setCollectedBottles(0); 
    }



    setCollectedBottles(numberCollectedBottles) {
        this.collectedBottles = numberCollectedBottles; 
        let imagePath = this.IMAGES_BOTTLE[this.resolveImageIndex()]; 
        this.img = this.imageCache[imagePath];
    }


    resolveImageIndex() {

        let percentage = this.collectedBottles / this.numberOfBottles * 100; 

        if (percentage <= 20) {
            return 0;
        } else if (percentage <= 40) {
            return 1;
        }
        else if (percentage <= 60) {
            return 2;
        }
        else if (percentage <= 80) {
            return 3;
        }
        else if (percentage <= 99) {
            return 4;
        }
        else if (percentage >= 100) {
            return 5;
        }
    }
}