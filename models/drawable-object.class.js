class drawableObject {

    img;
    imageCache = [];
    x = 120;
    y = 450;
    height = 150;
    width = 100;
    currentImage = 0;
    collected = false;
    canvasWidth = 1300;
    canvasHeight = 600;

    responsiveWidth = 1;
    responsiveHeight = 1;

    offset = {
        top: 20,
        bottom: 10,
        left: 20,
        right: 20
    }

    constructor() {
        this.resizeCanvasCtx();
    }


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }


    /**
     *  new Image  - creates a imageHTML Statement 
     * @param {array} arr - ['img(image1.png', 'img/image2.png')] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    resizeCanvasCtx() {
        if (this.canvasWidth < 1300) {
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            console.log('REZIZING');
            this.getResponsiveSizes();
        }
    }


    getResponsiveSizes() {
        this.responsiveWidth = this.canvasWidth / 1300;
        this.responsiveHeight = this.canvasHeight / 600;
    }


    // draws hitbox on object
    draw(ctx) {
        ctx.drawImage(this.img, this.x * this.responsiveWidth, this.y * this.responsiveHeight, this.width * this.responsiveWidth, this.height * this.responsiveHeight);
    }


    // draws hit box 
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //     ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            //  ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }
}