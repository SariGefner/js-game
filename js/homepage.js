class GridSystem {

    constructor(matrix, playerX, playerY) {
        this.matrix = matrix;
        this.cellSize = 30;
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.player = { x: playerX, y: playerY, color: "orange" };
        this.ballsCaught = 0;

        this.matrix[playerY][playerX] = 2;
        document.addEventListener("keydown", this.movePlayer.bind(this));

        setInterval(() => this.generateBall(), 2000);
        this.drawGrid();
        this.updateScoreDisplay();
    }

    createCanvas() {
        const width = this.matrix[0].length * this.cellSize;
        const height = this.matrix.length * this.cellSize;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = "absolute";
        canvas.style.backgroundColor = '#a3a375';
        canvas.style.left = `${(window.innerWidth - width) / 2}px`;
        canvas.style.top = `${(window.innerHeight - height) / 2}px`;
        document.body.appendChild(canvas);
        return canvas;
    }

    movePlayer(event) {
        const { keyCode } = event;
        let newX = this.player.x;
        let newY = this.player.y;

        if (keyCode === 37) newX--; // Left
        else if (keyCode === 39) newX++; // Right
        else if (keyCode === 38) newY--; // Up
        else if (keyCode === 40) newY++; // Down

        if (this.matrix[newY] && (this.matrix[newY][newX] === 0 || this.matrix[newY][newX] === 3)) {
            if (this.matrix[newY][newX] === 3) {
                this.ballsCaught++;
                this.updateScoreDisplay();
            }
            this.matrix[this.player.y][this.player.x] = 0;
            this.matrix[newY][newX] = 2;
            this.player.x = newX;
            this.player.y = newY;
            this.drawGrid();
        }
    }

    generateBall() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.matrix[0].length);
            y = Math.floor(Math.random() * this.matrix.length);
        } while (this.matrix[y][x] !== 0);

        this.matrix[y][x] = 3;
        this.drawGrid();
    }

    drawGrid() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const cellValue = this.matrix[row][col];
                const x = col * this.cellSize;
                const y = row * this.cellSize;

                switch (cellValue) {
                    case 1:
                        this.context.fillStyle = '#8c1aff'; // Purple for border
                        break;
                    case 2:
                        this.context.fillStyle = '#ff9900'; // Orange for player
                        break;
                    case 3:
                        this.context.fillStyle = 'red'; // Red for ball
                        break;
                    default:
                        this.context.fillStyle = '#a3a375'; // Default color
                }

                this.context.fillRect(x, y, this.cellSize, this.cellSize);
                this.context.strokeStyle = '#000';
                this.context.strokeRect(x, y, this.cellSize, this.cellSize);
            }
        }
    }

    updateScoreDisplay() {
        let scoreDisplay = document.getElementById('score-display');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'score-display';
            scoreDisplay.style.position = 'absolute';
            scoreDisplay.style.right = '20px';
            scoreDisplay.style.top = '20px';
            scoreDisplay.style.fontSize = '24px';
            document.body.appendChild(scoreDisplay);
        }
        scoreDisplay.textContent = `Balls Caught: ${this.ballsCaught}`;
    }
}

// Initialize the game
const mapArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


const grid = new GridSystem(mapArray, 5, 5);