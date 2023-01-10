class MovableObject extends drawableObject{


    speed = 0.09;
    otherDirection = false;
    fallSpeedY = 0; 
    acceleration = 1; 
    energy = 100; // health from objects
    lastHit = 0; 
    lastMove = 0; 
    collidable = true; 



    // function creates gravity in-game
    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() ||this.fallSpeedY > 0) {
            this.y -= this.fallSpeedY; 
            this.fallSpeedY -= this.acceleration;
            }
        }, 1000 / 50); 
    }


    isAboveGround() {
        if (this instanceof throwableObject) {
            return true; 
        }

        if (this instanceof MiniChicken) {
            return this.y < 490; 
        }
        else {
        return  this.y < 330; 
        }
    }



    hit() {
        if (!this.isHurt()) {
            this.energy -= 20; 
            this.lastHit = new Date().getTime(); // sets  past miliseconds from 1.1. 1970
            if (this instanceof Character) { this.ouch_sound.play(); };  
        }
        if (this.isDead()) {
            this.energy = 0; 
            this.collidable = false; 
            this.speed = 0; 
        } else {
            
        }
    }


    hitFromBoss() {
        if (!this.isHurt()) {
            this.energy -= 50; 
            this.x -= 60; 
            if (this instanceof Character) { this.ouch_sound.play(); };  
        }

        if (this.isDead()) {
            this.energy = 0; 
            this.collidable = false; 
            this.speed = 0; 
        } else {
            this.lastHit = new Date().getTime(); // sets  past miliseconds from 1.1. 1970
        }
    }


    // returns true when in past 3 seconds was hit
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in miliseconds
        timepassed = timepassed / 1000;  // Difference in seconds
        return timepassed < 1; // returns true when hurt is 3 seconds in past, otherwise returns false
    }


    lastMovement() {
        return this.lastMove = new Date().getTime(); // sets  past miliseconds from 1.1. 1970
    }


    isSleepy() {
        let timepassed = new Date().getTime() - this.lastMove; // difference in miliseconds
        timepassed = timepassed / 1000;  // Difference in seconds

            if (timepassed < 2) {

            }
             else if (timepassed <= 6) {
                return 'sleepy'; // returns true when hurt is 3 seconds in past, otherwise returns false 
            }
            else if (timepassed > 6) {
                return 'sleeping'
            }
    }

    
    isDead() {
        return this.energy <= 0; 
    }


    // character.isColliding(chicken); 
    isColliding(mo) {
        if (mo.collidable) {
        return this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom  > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width  &&
            this.y + this.offset.top < mo.y + mo.height; 
        }
            else {

            }
    }


    // minichicken will turn back when they x pixels behind character
    characterIsBehind(mo) {
        return this.x + this.width > mo.x + mo.width + 800; 
    }


    /** function tests if character is in front of Object
     * 
     * @param {object} mo - moving Object  
     * @param {*} distance - overgive the distance paramenter, if x distance return true
     * @returns 
     */
    characterIsInFront(mo, distance) {
        return this.x + this.width + distance < mo.x + mo.width; 
    }


/** function plays all images for an animation
 * 
 * @param {array} images - contains all images from object. like all images from endboss
 */
    playAnimation(images) {
        //Walk animation
        let i = this.currentImage % images.length; // let i = 5 % (<= modulu) 6; => 0, Rest 5  // Modulu nutzt immer nur den Rest
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5,...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }


    moveRight() {
        this.x += this.speed; // sets cameraspeed same as character speed
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.fallSpeedY = 20; 
    }

    jumpedOnEnemy() {
        this.fallSpeedY = 12; 
    }
}