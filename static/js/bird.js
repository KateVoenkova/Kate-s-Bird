class Bird {
    constructor(canvas) {
        this.x = GAME_SETTINGS.BIRD_X;
        this.y = canvas.height / 2;
        this.width = GAME_SETTINGS.BIRD_WIDTH;
        this.height = GAME_SETTINGS.BIRD_HEIGHT;
        this.gravity = GAME_SETTINGS.GRAVITY;
        this.lift = GAME_SETTINGS.LIFT;
        this.velocity = 0;
        this.images = BIRD_IMAGES;
        this.currentImageIndex = 0;
        this.image = new Image();
        this.image.src = this.images[this.currentImageIndex];

        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            this.image.src = this.images[this.currentImageIndex];
        }, 80);
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update(canvas) {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    flap() {
        this.velocity = this.lift;
    }
}