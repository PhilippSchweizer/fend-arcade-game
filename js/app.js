// Root Class for Player and Enemy
class gameElement {
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}

	// Draw the game elements on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Enemies our player must avoid
const speeds = [210, 305, 400];
class Enemy extends gameElement {
	constructor(x, y, sprite = 'images/enemy-bug.png') {
		super(x, y, sprite);
		this.speed = speeds[Math.floor(Math.random() * speeds.length)];
	}
	// Parameter: dt, a time delta between ticks
	// Collision check is handled here
	update(dt) {
		// Multiply movement by 'dt' ensuring the game runs at the same speed for all computers
		this.x += this.speed * dt;
		// point which triggers enemy reset to -50 on the x-axis reappearing with different speed
		if (this.x >= 510) {
			this.x = -50;
			this.speed = 100 + Math.floor(Math.random() * 222);
		}
	}
}

// Player class focusing on x and y axis
class Player extends gameElement {
	constructor(x, y, sprite = 'images/char-boy.png') {
		super(x, y, sprite);
	}
	// add empty update function so engine.js can be left unchanged
	update(dt) {};
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
