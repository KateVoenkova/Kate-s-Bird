document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div>
            <h1>Game Over</h1>
            <p id="finalScore">Score: 0</p>
            <p id="bestScore">Best: 0</p>
            <button id="restartButton">Restart</button>
        </div>
    `;
    document.body.appendChild(overlay);

    resizeCanvas(canvas);
    window.addEventListener('resize', () => resizeCanvas(canvas));

    const game = new Game(canvas, overlay);
    game.start();
});