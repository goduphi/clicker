// Get canvas
const canvas = document.getElementById('canvas1');

// Get canvas context
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse =
{
	x: null,
	y: null,
	radius: 1
}

// Target
class Target
{
	constructor(x, y, radius, color = '#000000')
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}
	
	drawTarget()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

var radius = 30;
var target = new Target((Math.random() * (innerWidth - radius)), (Math.random() * (innerHeight - radius)), radius);
target.drawTarget();

// Get mouse coordinates
window.addEventListener('mousemove',
	function(event)
	{
		mouse.x = event.x;
		mouse.y = event.y;
	}
)

// Get mouse coordinates
window.addEventListener('click',
	function(event)
	{
		CheckCollision();
	}
)

function CheckCollision()
{
	// This section of code is directly taken from:
	// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
	let dx = target.x - mouse.x;
	let dy = target.y - mouse.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	// Check for right side collision
	if(distance < target.radius + mouse.radius)
	{
		// SPAWN TARGET ELSE WHERE
		delete target;
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		target = new Target((Math.random() * (innerWidth - target.radius)), (Math.random() * (innerHeight - target.radius)), target.radius);
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		target.drawTarget();
	}
}