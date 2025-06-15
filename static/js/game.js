class Game {
    constructor(canvas, overlay) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.overlay = overlay;
        this.bird = new Bird(canvas);
        this.pipes = [];
        this.score = 0;
        this.bestScore = 0;
        this.frameCount = 0;
        this.gameOver = false;
        this.nextPipeFrame = this.getRandomPipeInterval();
        this.animationFrame = null;
    }

    getRandomPipeInterval() {
        return random(GAME_SETTINGS.PIPE_MIN_INTERVAL, GAME_SETTINGS.PIPE_MAX_INTERVAL);
    }

    start() {
        this.setupEventListeners();
        this.loop();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.gameOver) {
                this.bird.flap();
            }
        });

        this.canvas.addEventListener('click', () => {
            if (!this.gameOver) {
                this.bird.flap();
            }
        });

        document.getElementById('restartButton').addEventListener('click', () => {
            if (this.gameOver) {
                this.restart();
                this.overlay.classList.remove('visible');
            }
        });
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.gameOver) {
            this.updateGameState();
            this.drawGameElements();
            this.frameCount++;
            this.animationFrame = requestAnimationFrame(this.loop.bind(this));
        }
    }

    updateGameState() {
        this.bird.update(this.canvas);

        if (this.frameCount >= this.nextPipeFrame) {
            this.pipes.push(new Pipe(this.canvas));
            this.nextPipeFrame = this.frameCount + this.getRandomPipeInterval();
        }

        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.update();

            if (pipe.isOffScreen()) {
                this.pipes.splice(i, 1);
                this.score++;
            }

            if (this.checkCollision(pipe)) {
                this.endGame();
            }
        }
    }

    drawGameElements() {
        this.bird.draw(this.ctx);
        this.pipes.forEach(pipe => pipe.draw(this.ctx, this.canvas));

        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
        this.ctx.fillText(`Best: ${this.bestScore}`, 20, 60);
    }

    checkCollision(pipe) {
        return (
            this.bird.x < pipe.x + pipe.width &&
            this.bird.x + this.bird.width > pipe.x &&
            (this.bird.y < pipe.topHeight ||
                this.bird.y + this.bird.height > this.canvas.height - pipe.bottomHeight)
        );
    }

    endGame() {
        this.gameOver = true;
        this.bestScore = Math.max(this.bestScore, this.score);
        document.getElementById('finalScore').textContent = `Score: ${this.score}`;
        document.getElementById('bestScore').textContent = `Best: ${this.bestScore}`;
        this.overlay.classList.add('visible');
    }

    restart() {
        this.bird = new Bird(this.canvas);
        this.pipes = [];
        this.score = 0;
        this.frameCount = 0;
        this.gameOver = false;
        this.nextPipeFrame = this.getRandomPipeInterval();
        this.loop();
    }
}