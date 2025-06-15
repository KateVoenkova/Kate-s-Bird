class Pipe {
    constructor(canvas) {
        this.x = canvas.width;
        this.width = GAME_SETTINGS.PIPE_WIDTH;
        this.gap = random(GAME_SETTINGS.PIPE_MIN_GAP, GAME_SETTINGS.PIPE_MAX_GAP);
        this.topHeight = Math.random() * (canvas.height / 2);
        this.bottomHeight = canvas.height - this.topHeight - this.gap;
        this.speed = GAME_SETTINGS.PIPE_SPEED;
        this.topImage = new Image();
        this.bottomImage = new Image();
        this.topImage.src = '/static/images/pipe_top.png';
        this.bottomImage.src = '/static/images/pipe_bottom.png';
    }

    draw(ctx, canvas) {
        ctx.drawImage(this.topImage, this.x, 0, this.width, this.topHeight);
        ctx.drawImage(this.bottomImage, this.x, canvas.height - this.bottomHeight, this.width, this.bottomHeight);
    }

    update() {
        this.x -= this.speed;
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }
}