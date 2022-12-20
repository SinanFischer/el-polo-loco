class StatusBarCoin extends drawableObject {
    IMAGES_COIN = [
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]



    collectedCoins =  0; 
    numberOfCoins = 0;  // Exist = x


    constructor(numberOfCoins) {
        super(); 
        this.numberOfCoins = numberOfCoins;
        this.loadImages(this.IMAGES_COIN);
        this.x = 20; 
        this.y = 50; 
        this.width = 400;
        this.height = 90;  
        this.setCollectedCoins(0); 
    }

    
    setCollectedCoins(numberCollectedCoins) {
        this.collectedCoins = numberCollectedCoins; 
        let imagePath = this.IMAGES_COIN[this.resolveImageIndex()]; 
        this.img = this.imageCache[imagePath];
    }



    resolveImageIndex() {

        let percentage = this.collectedCoins / this.numberOfCoins * 100; 

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