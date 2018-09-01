var characterImagesList = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];


var gemsImageList = [
    'images/star.png',
    'images/Key.png',
    'images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png',
];


var characterImageNode = document.getElementById("character-image");
var gemsImageNode = document.getElementById("gems-image");

var characterImagesListIndex = 0;
var gemsImageListIndex = 0;


var scoreSpanNode = document.getElementById("score-span");
var bonusSpanNode = document.getElementById("bonus-span");
var lifeSpanNode = document.getElementById("life-span");
var buyLifeSpanNode = document.getElementById("buy-life-span");



// Enemies our player must avoid
var Enemy = function (speedOfEnemy, xAxis, yAxix, id) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xAxis;
    this.y = yAxix;
    this.originalX = xAxis;
    this.originalY = yAxix;
    this.rot = speedOfEnemy || 100;
    this.id = id;

    console.log(speedOfEnemy, this.rot, this.id);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = this.originalX;
        if (this.id === 4) {
            if (this.y === 215)
                this.y = 135;
            else
                this.y = 215;
        }
    }

    this.x += (dt * this.rot);


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var BounsObjects = function (xAxis, yAxis) {

    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.sprite = gemsImageList[gemsImageListIndex];
    this.flag = true;
    this.starOccupied = false;
    this.prevScore = -1;
}

BounsObjects.prototype.render = function () {


    if (player.score % 3 === 0) {

        if (this.flag) {

            this.xAxis = Player.prototype.leftRightPositions[getRandomInt(5)];
            this.yAxis = Player.prototype.downUpPositions[getRandomInt(5)];
            this.flag = false;
        }

        if (player.score !== this.prevScore)
            this.starOccupied = false;

    } else {

        if (player.score !== this.prevScore) {
            this.flag = true;

        }
    }



    if (!this.starOccupied) {
        //console.log("star")
        ctx.drawImage(Resources.get(this.sprite), this.xAxis, this.yAxis);
    }

}


var bounsObjects = new BounsObjects();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (xAxis, yAxix) {

    this.sprite = characterImagesList[characterImagesListIndex];
    this.x = xAxis;
    this.y = yAxix;
    this.playerVerticlePositionIndex = 0;
    this.plyerHorizontalPositionIndex = 2;
    this.score = 0;
    this.moves = 0;
    this.stars = 0;
    this.life = 3;

    scoreSpanNode.textContent = this.score;
    bonusSpanNode.textContent = this.stars;
    lifeSpanNode.textContent = this.life;



};



Player.prototype.update = function (dt) {

    if (this.playerVerticlePositionIndex === this.downUpPositionsLength) {

        this.score++;
        this.y = this.downUpPositions[0];
        this.playerVerticlePositionIndex = 0;
        scoreSpanNode.textContent = this.score;

    }

    if (this.x === bounsObjects.xAxis && this.y === bounsObjects.yAxis && !bounsObjects.starOccupied) {

        this.stars++;
        bounsObjects.starOccupied = true;
        bounsObjects.prevScore = this.score;
        bonusSpanNode.textContent = this.stars;

    }


};

//position of player = [410 , 310 , 215  , 135 , 50 , -25] //up - down Position
//position of player = [00 , 100 , 200  , 300 , 400 ] //left - right Position


Player.prototype.downUpPositions = [410, 310, 215, 135, 50, -25];
Player.prototype.downUpPositionsLength = Player.prototype.downUpPositions.length - 1;

Player.prototype.leftRightPositions = [00, 100, 200, 300, 400]
Player.prototype.leftRightPositionsLength = Player.prototype.leftRightPositions.length - 1;



Player.prototype.render = Enemy.prototype.render;

Player.prototype.handleInput = function (keyCode) {

    if (keyCode === 'left') {
        this.moves++;
        if (this.plyerHorizontalPositionIndex === 0)
            this.x = this.leftRightPositions[0];
        else
            this.x = this.leftRightPositions[--this.plyerHorizontalPositionIndex];

    } else if (keyCode === 'right') {
        this.moves++;
        if (this.plyerHorizontalPositionIndex === this.leftRightPositionsLength)
            this.x = this.leftRightPositions[this.leftRightPositionsLength];
        else
            this.x = this.leftRightPositions[++this.plyerHorizontalPositionIndex];

    } else if (keyCode === 'up') {
        this.moves++;
        if (this.playerVerticlePositionIndex === this.downUpPositionsLength)
            this.y = this.downUpPositions[this.downUpPositionsLength];
        else
            this.y = this.downUpPositions[++this.playerVerticlePositionIndex];





    } else if (keyCode === 'down') {
        this.moves++;
        if (this.playerVerticlePositionIndex === 0)
            this.y = this.downUpPositions[0];
        else
            this.y = this.downUpPositions[--this.playerVerticlePositionIndex];

    } else {

    }




};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(70, -300, 50, 0),
    new Enemy(100, -10, 50, 1),
    new Enemy(70, -25, 135, 2),
    new Enemy(150, -16, 215, 3),
    new Enemy(80, -5, 215, 4)
];
var player = new Player(200, 410);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//MDN Refrences
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.getElementById("character").addEventListener("click", function () {

    characterImagesListIndex += 1;

    if (characterImagesListIndex === characterImagesList.length) {
        characterImagesListIndex = 0;
    }

    characterImageNode.setAttribute("src", characterImagesList[characterImagesListIndex]);

    player.sprite = characterImagesList[characterImagesListIndex];

});

document.getElementById("gems").addEventListener("click", function () {

    gemsImageListIndex += 1;

    if (gemsImageListIndex === gemsImageList.length) {
        gemsImageListIndex = 0;
    }

    gemsImageNode.setAttribute("src", gemsImageList[gemsImageListIndex]);

    bounsObjects.sprite = gemsImageList[gemsImageListIndex];


});


document.getElementById("buy-life").addEventListener("click", function () {

    if (player.stars >= 5) {

        player.life += 1;
        player.stars -= 5;


        bonusSpanNode.textContent = player.stars;
        lifeSpanNode.textContent = player.life;

    }



});


function checkCollisions() {

    for (const enemy of allEnemies)

    {

        if (enemy.y === player.y) {


            if (((player.x - enemy.x) >= 0 && (player.x - enemy.x) <= 65) ||
                ((enemy.x - player.x) >= 0 && (enemy.x - player.x) <= 60)

            ) {



                if (player.life === 0) {


                    console.log(enemy);
                    player.x = 200;
                    player.y = 410;
                    player.playerVerticlePositionIndex = 0;
                    player.plyerHorizontalPositionIndex = 2;
                    scoreSpanNode.textContent = 0;
                    bonusSpanNode.textContent = 0;
                    player.score = 0;
                    player.stars = 0;
                    player.moves = 0;
                    bounsObjects.flag = true;
                    bounsObjects.starOccupied = false;
                    bounsObjects.prevScore = -1;
                    player.life = 3;
                    lifeSpanNode.textContent = player.life;

                } else {
                    console.log("Called", enemy);
                    player.life -= 1;
                    lifeSpanNode.textContent = player.life;
                    player.x = 200;
                    player.y = 410;
                    player.playerVerticlePositionIndex = 0;
                    player.plyerHorizontalPositionIndex = 2;


                }
                return;
            }
        }

    }

}

