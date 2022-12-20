class StartScreen extends drawableObject{

    IMAGE_STARTSCREEN = [
        '../img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png'
    ]

    x = 200; 
    y = 200; 
    width  = 200; 
    height = 100; 

    constructor() {
        super();
        this.loadImages(this.IMAGE_STARTSCREEN);
        this.showImage(); 
    }


    showImage() {
        let imagePath = this.IMAGE_STARTSCREEN[0]; 
        this.img = this.imageCache[imagePath];
    }

}