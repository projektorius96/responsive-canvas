import './style.css';

/**
 * Credits to ChatGPTv3.5 (2024)
 */
const canvas = document.getElementById('layer-1');
  const container = canvas.parentElement;
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = /* window.innerWidth */container.clientWidth*devicePixelRatio;
    canvas.height = /* window.innerHeight */container.clientHeight*devicePixelRatio;

    requestAnimationFrame(drawSquare); // Use requestAnimationFrame for smooth updates
}

function drawSquare() {
    /**
    # Credits to ChatGPTv4.0 (limited) | 2024 May
    > Math.min is used to ensure that the square fits within the smallest dimension of the canvas. 
    This prevents the square from exceeding the bounds of the canvas. 
    If canvas.width is smaller, Math.min ensures the square fits horizontally. 
    If canvas.height is smaller, Math.min ensures the square fits vertically. 
    Centering the Square: By using Math.min, the square is guaranteed to be centered within the canvas without overflowing, regardless of whether the canvas is in portrait or landscape orientation.
    */
    const size = Math.min(canvas.width, canvas.height) / 4;

    // DEV_NOTE # we deliberately shift back the pair of (x, y) within dimensions of the square itself
    const x = (canvas.width - size) / 2;
    const y = (canvas.height - size) / 2;
    

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = 'red'; // Set the square color
    ctx.fillRect(x, y, size, size); // Draw the square
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Initial call to set up the canvas size and draw the square