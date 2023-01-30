class World {
    //Klassen(global) Variabeln die wir innerhalb einer klasse nutzen wollen wie hier zb ctx, müssen in den funktionen mit this. aufgerufen werden! 
    character = new Character();
    endboss = new Endboss();
    coin = new Coin();
    bottle = new Bottle();
    level = level1;  // greif auf alle Variabeln in level.class zu
    lastThrow = 0;
    canvas;
    ctx; //steht für context 
    keyboard;
    camera_x = 0;
    showBossStatusBar = false; 


    startScreen = new StartScreen();
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin(this.level.items.length);
    statusBarBottle = new StatusBarBottle(this.level.throwableObjects.length);
    statusBarEndBoss = new StatusBarEndBoss();
    throwableObject = [];
    throwNotallowed = false;


    intervalIds = []; // all set intervals id are saved here

    interval;

    constructor(canvas, keyboard) {
        this.doAnimation = true;
        this.ctx = canvas.getContext('2d');  // setzt 2d oder 3d
        this.canvas = canvas;
        this.keyboard = keyboard;
       this.draw();
       this.setWorld();
       this.run();
       this.checkPositions();

    }

// starts game when all datas loaded
    startGameWorld() {
        this.draw();
        this.setWorld();
        this.run();
        this.checkPositions();
    }


    setWorld() {
        this.character.world = this; // damit kann in der class-character auf die Variablen in world zugreifen
        this.endboss.world = this; // damit kann in der class-endboss auf die Variablen in world zugreifen
    }


    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 75);
    }


    // creates new throw bottle and checks when pressed the thrown key
    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.collectedBottles > 0 && !this.hasThrown() &&!this.throwNotallowed) {
            this.statusBarBottle.setCollectedBottles(this.character.collectedBottles--)
            let thrownBottle = new throwableObject(this.character.x, this.character.y);
            this.throwableObject.push(thrownBottle);
            this.lastThrow = new Date().getTime(); // sets  past miliseconds from 1.1. 1970
            this.checkCollisionsBottle(thrownBottle);
        }
    }


    checkCollisionsBottle(thrownBottle) {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (thrownBottle.isColliding(enemy)) {
                    thrownBottle.bottleSplash();
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        let endbossEnergy = enemy.energy;
                        this.statusBarEndBoss.setPercentageEndBoss(endbossEnergy);
                    }
                    else {
                    }
                }
            });
        }, 50);
    }


    hasThrown() {
        let timepassed = new Date().getTime() - this.lastThrow; // difference in miliseconds
        timepassed = timepassed / 1000;  // Difference in seconds
        return timepassed < 1; // returns true when hurt is 0.2 seconds in past, otherwise returns false
    }


    checkCollisions() {
        // checks collidings with items
        setInterval(() => {
            this.characterCollectCoin();
            this.characterCollectBottle();
        }, 100);
        // checks collidings with enemys
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.playerCollidingWithEnemy(enemy);
                }
            });
        }, 90);
    }



    /** in case player is colliding with an enemy 
     * 
     * @param {object} enemy - contains specific class object from colliding enemy  
     */
    playerCollidingWithEnemy(enemy) {
        if (this.character.isAboveGround()) {  // when character jumps on enemy
            this.wasHitFromAbove(enemy);
        }
        else {
            if (enemy instanceof Endboss) { this.playerGetHitFromBoss(enemy); }
            else {
                this.character.hit();
                enemy.otherDirection = true;
            }
            this.statusBar.setPercentage(this.character.energy);
        }
    }


    /** call functions when an enemy was hit from above
     * 
     * @param {object} enemy - contains specific class object from colliding enemy  
     */
    wasHitFromAbove(enemy) {
        if (enemy instanceof Endboss) { }
        else {
            enemy.hit();
            enemy.animate();
            this.character.jumpedOnEnemy();
        }
    }


    /** when player get a hit from boss
     * 
     * @param {object} enemy  - contains specific class object from colliding enemy
     */
    playerGetHitFromBoss(enemy) {
        if (!enemy.isAttacking) {
            this.character.hitFromBoss();
            enemy.isAttacking = true;
        }
    }


    characterCollectCoin() {
        this.level.items.forEach((item) => {
            if (this.character.isColliding(item)) {
                item.getCoin();
                this.character.collectedCoins++;
                this.statusBarCoin.setCollectedCoins(this.character.collectedCoins);
            }
        });
    }


    characterCollectBottle() {
        this.level.throwableObjects.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle();
                this.character.collectedBottles++;
                this.statusBarBottle.setCollectedBottles(this.character.collectedBottles);
            }
        });
    }


    checkPositions() {
        // checks position smaller enemies run other direction when they run x pixels behind/front character
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.characterIsBehind(enemy)) {
                    enemy.otherDirection = true;
                }
                else if (this.character.characterIsInFront(enemy, 1400)) {
                    enemy.otherDirection = false;
                }
            });
        }, 90);


        let endbossSequenceInterval = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) {
                    if (!this.character.characterIsInFront(enemy, this.canvas.width)) {
                        this.throwNotallowed = true;
                        enemy.bossFightStartSequence();
                        setTimeout(() => {
                            this.throwNotallowed = false;
                            this.showBossStatusBar = true; 
                        }, 5400)
                        clearInterval(endbossSequenceInterval);
                    }
                }
            });
        }, 100);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart den canvas für neue animation

        this.ctx.translate(-this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundsObjects);

        this.ctx.translate(this.camera_x, 0);
        // space for static objects  ada
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.showBossStatusBar > 0) this.addToMap(this.statusBarEndBoss);


        this.ctx.translate(-this.camera_x, 0);

        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addObjectsToMap(this.level.enemies);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);


        this.ctx.translate(this.camera_x, 0);

        /** starts the function so much again how the processor can, creats fps (frameratesPerSecond) 
         * 
         */
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /** for each goes over all objects in array and do the function for every oject single
     * 
     * @param {object} objects - contains specific character or object from array  
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /** draws the image on canvas
     * 
     * @param {object} mo - moving object - contains object from array (specific character or object)
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    // mirrors the object
    flipImage(mo) {
        this.ctx.save(); // hier wird der aktuelle Status des Context gespeichert damit er mit restore() wieder hergestellt werden kann
        this.ctx.translate(mo.width, 0);  // durch das drehen verspiegelt sich die X Achse, 
        this.ctx.scale(-1, 1); // verschieben wir das Objekt mit der eigenen Breit, damit die spieglung sich ausgleicht
        mo.x = mo.x * -1;  //Hiermit wird der Anfang der X Achse wieder zur linken Seite gekehrt
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

} 