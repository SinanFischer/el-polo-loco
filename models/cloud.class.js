class Cloud extends MovableObject {


    y = 50;
    width = 600;  
    height = 300;  


    constructor() {
        super().loadImage('../img_pollo_locco/img/5_background/layers/4_clouds/1.png'); 

        this.x = 700 + Math.random() * 500;
        this.animate(); 

    }



    animate() {
        this.moveLeft(); 
    }



}
 

