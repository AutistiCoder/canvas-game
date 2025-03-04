export default class Player {
    constructor(context) {
        console.log("context: ", context);
        this.image = new Image();
        this.image.className = "player";
        this.image.src = "player.png";

        this.context = context;
        this.g = 0.004; // Gravity (tuned for natural movement)
        this.v0 = -1.2; // Initial velocity (negative to move up)
        
        this.jumpTime = null;
        this.jumping = false;
        this.velocity = 0; // Velocity changes over time

        // Initial position at the bottom of the canvas
        this.y = this.context.canvas.height - 100; // Placeholder until image loads
    }

    static async create(context) {
        const player = new Player(context);
        await player.image.decode(); // Wait for image to load
        console.log("player created");

        // Maintain aspect ratio
        const aspectRatio = player.image.width / player.image.height;
        console.log(`aspect ratio: ${aspectRatio}`);
        player.image.height = 25;
        player.image.width = player.image.height * aspectRatio;

        // Set correct bottom position
        player.y = context.canvas.height - player.image.height;
        return player;
    }

    requestAnimationFrame(t) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.draw();
        requestAnimationFrame(t => this.requestAnimationFrame(t));
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity = this.v0; // Set initial jump velocity
            requestAnimationFrame(t => this.requestAnimationFrame(t));
        }
    }

    draw() {
        const canvasHeight = this.context.canvas.height;

        if (this.jumping) {
            this.y += this.velocity * 10; // Apply velocity (scaled for smooth motion)
            this.velocity += this.g * 10; // Apply gravity

            // Stop jumping when reaching the ground
            if (this.y >= canvasHeight - this.image.height) {
                this.y = canvasHeight - this.image.height; // Keep it at ground level
                this.jumping = false;
                this.velocity = 0; // Reset velocity
            }
        } else {
            this.y = canvasHeight - this.image.height;
        }

        this.context.drawImage(this.image, 50, this.y, this.image.width, this.image.height);
    }
}
