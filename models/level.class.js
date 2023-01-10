class Level {
    enemies; 
    clouds; 
    backgroundsObjects; 
    items; 
    throwableObjects; 
    level_end_x = 7500; 

    constructor(enemies, clouds, backgroundsObjects, items, throwableObjects) {
        this.enemies = enemies; 
        this.clouds = clouds; 
        this.backgroundsObjects = backgroundsObjects; 
        this.throwableObjects = throwableObjects 
        this.items = items; 
    }
} 