let level1; 

function initLevel1() {
level1 = new Level(
    [
      new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new Chicken(),
     new MiniChicken(),
     new MiniChicken(),
     new MiniChicken(),
       new Endboss(),
    ],
    
    [
        new Cloud()
    ],

    [
        new BackgroundObject('./img_pollo_locco/img/5_background/first_half_background.png', 0, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/second_half_background.png', 1500, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/first_half_background.png', 3000, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/second_half_background.png', 4500, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/first_half_background.png', 6000, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/second_half_background.png', 7500, 0),
    ], 

    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ], 

    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ]
    
    ); 

}