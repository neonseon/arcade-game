// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getXCoordinate();
    this.y = getYCoordinate();
    this.speed = getSpeed();
    this.width = 99;
    this.height = 77;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getXCoordinate() {
// to stagger when they start and prevent overlap
    if (getRandomInt(3) === 0) {
        return -101;
    }

    if (getRandomInt(3) === 0) {
        return -150;
    } else {

        return -200;
    }
}

function getYCoordinate() {

    if (getRandomInt(3) === 0) {
        return 140; // top row of stones
    }

    if (getRandomInt(3) === 0) {
        return 223; // middle row of stones
    } else {

        return 306; // bottom row of stones
    }
}

function getSpeed() {

    if (getRandomInt(3) === 0) { // slow
        return 300;
    }

    if (getRandomInt(3) === 0) { // medium
        return 400;
    } else {

        return 500; // fast
    }

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) { // once the bugs are off screen they get reset
        this.y = getYCoordinate();
        this.x = getXCoordinate();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //Use format below to remove transparent part and make collisions more accurate:
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    ctx.drawImage(Resources.get(this.sprite), 0, 77, this.width, this.height, this.x, this.y, this.width, this.height);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {

    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 219;
        this.y = 467;
        this.width = 67;
        this.height = 87;
    }

    update(dt) {
        // Axis-aligned bounding box concept used in IF statement modified from:
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        for (i = 0; i < allEnemies.length; i++) {

            if (this.x < allEnemies[i].x + allEnemies[i].width &&
                this.x + this.width > allEnemies[i].x &&
                this.y < allEnemies[i].y + allEnemies[i].height &&
                this.y + this.height > allEnemies[i].y) {
                // Collision! Return to starting square.
                this.x = 219;
                this.y = 467;
            }

        }

        if (this.y === 52) {
            setTimeout(function(){ youWon(); }, 200);
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), 17, 63, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    handleInput(key) { // values keep player from going off-screen
        switch (key) {
            case "left":
                if (this.x <= 50) {
                    break;
                }
                this.x = (this.x - 101);
                break;
            case "up":
                if (this.y <= 52) {
                    break;
                }
                this.y = (this.y - 83);
                break;
            case "right":
                if (this.x >= 404) {
                    break;
                }
                this.x = (this.x + 101);
                break;
            case "down":
                if (this.y >= 405) {
                    break;
                }
                this.y = (this.y + 83);
                break;
        }
    }
}

function youWon() {
    //screen and button are shown
    screen.style.display = 'block';
    button.style.display = 'block';
}

function resetGame() {

    // player is reset
    delete player.x;
    delete player.y
    player.x = 219;
    player.y = 467;

    setTimeout(function(){ removeScreen(); }, 200);

}

function removeScreen() {

    //screen and button removed
    screen.style.display = 'none';
    button.style.display = 'none';
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

for (i = 0; i < 4; i +=1) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
}

let player = new Player();

const button = document.getElementById('resetButton');
const screen = document.getElementById('screen');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
