export default class Player {
    constructor(context) {
        console.log("context: ", context);
        this.image = new Image();
        this.image.className = "player";
        this.image.src = "player.png";
       

        this.jumpTime = null;
        this.context = context;
        this.g = 0.005; // Gravity (adjust for jump effect)
        this.v0 = 1.2; // Initial jump velocity

        // Initial position at the bottom of the canvas
        this.y = this.context.canvas.height - this.image.height;
    }

    static async create(context) {
        const player = new Player(context);
        await player.image.decode(); // Wait for image to load
        console.log("player created");
        const aspectRatio = player.image.width / player.image.height;
        console.log(`aspect ratio: ${aspectRatio}`);
        player.image.height = 100;
        player.image.width = player.image.height * aspectRatio;
        return player;
    }

    requestAnimationFrame(t) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.draw(t - this.jumpTime);
        requestAnimationFrame(t => this.requestAnimationFrame(t));
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpTime = performance.now();
            requestAnimationFrame(t => this.requestAnimationFrame(t));
        }
    }

    stopJumpAnimation() {
        this.jumping = false;
        this.jumpTime = null;
        this.y = this.context.canvas.height - this.image.height; // Reset to bottom
    }

    draw(t = 0) {
        console.log(`t: ${t}`);
        const canvasHeight = this.context.canvas.height;

        if (this.jumping) {
            // Freefall equation: y = v0 * t - 0.5 * g * t^2
            const timeInSeconds = t / 1000; // Convert ms to s
            this.y = canvasHeight - this.image.height - (this.v0 * timeInSeconds - 0.5 * this.g * Math.pow(timeInSeconds, 2)) * 100;

            if (this.y >= canvasHeight - this.image.height) {
                this.y = canvasHeight - this.image.height; // Prevent falling below the ground
                this.jumping = false;
            }
        } else {
            this.y = canvasHeight - this.image.height;
        }

        this.context.drawImage(this.image, 0, this.y, this.image.width, this.image.height);
    }
}
