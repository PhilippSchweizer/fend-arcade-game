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

		// Checks for collisions between the player and the enemies
		if (player.x < this.x + 80 &&
			player.x + 80 > this.x &&
			player.y < this.y + 60 &&
			60 + player.y > this.y) {
			player.x = 202;
			player.y = 405;
		};
	}
}

// Player class focusing on x and y axis
class Player extends gameElement {
	constructor(x, y, sprite = 'images/char-boy.png') {
		super(x, y, sprite);
	}
	// add empty update function so engine.js can be left unchanged
	update(dt) {};

	// add input handler to move player
	handleInput(keyPress) {
		// move left on the x axis by 102 on left arrow key
		if (keyPress === 'left' && this.x > 0) {
			this.x -= 102;
			// move right on the x axis by 102 on right arrow key
		} else if (keyPress === 'right' && this.x < 405) {
			this.x += 102;
			// move up on the y axis by 83 on up arrow key
		} else if (keyPress === 'up' && this.y > 0) {
			this.y -= 83;
			// move down on the y axis by 83 on down arrow key
		} else if (keyPress === 'down' && this.y < 405) {
			this.y += 83;
			// reset to start position
		} else if (this.y < 0) {
			setTimeout(() => {
				this.x = 202;
				this.y = 405;
			}, 800);
		};
	};
}

// Init Enemies
const allEnemies = [
	new Enemy(0, 63),
  new Enemy(202, 147),
  new Enemy(405, 230)
];

// Init the Player with new keyword
const player = new Player(202, 405);


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
