class BackgroundObject extends MovableObject {

    width= 1500; 
    height = 600; 

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x; 
        this.y = y; 
    }

}
