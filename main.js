import './style.css';
import { name } from './package.json'

document.addEventListener('DOMContentLoaded', ()=>{
  document.title = name;
})

const 
  canvas = document.getElementById('layer-1')
  ,
  canvasBoundingRect = canvas.getBoundingClientRect()// DEV_NOTE (!) # this was the [CULPRIT] of Path2D API during window.onresize
  ,
  ctx = canvas.getContext('2d')
;


function resizeCanvas() {

  canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
  canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;

  requestAnimationFrame(drawSquare); // Use requestAnimationFrame for smooth updates
}

/**
> Thanks to ChatGPTv4.0 (limited) for the magic produced <br>

> EXPLAINER: Essentially {Math.min} is used to ensure that the square fits within the smallest dimension of the canvas.
_In order to understand the underlying **aspect ratio** handling within `Math.min(canvas.width, canvas.height)`, set size as `const size = Math.min(canvas.width, canvas.height) / 1` and do some responsive (continuous) device emulation on your browswer of choice, mocking landscape and portrait aspect ratios to see THE REASON "WHY ?" visually._
*/
function drawSquare() {

    /* DEV_NOTE # =========================================> 2 gives relatively large square, whilst 256 gives barely visible square bare resemblance to a single pixel drawn on the screen (viewport) */
    const size = Math.min(canvas.width, canvas.height) / 4;

    // DEV_NOTE # we deliberately shift back the pair of (x, y) within dimensions of the square itself
    const 
      x = (canvas.width - size) / 2
      ,
      y = (canvas.height - size) / 2
    ;

   /*  ctx.setTransform(1, 0, 0, 1, 0, 0) */
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.fillStyle = 'green'; // Set the square color
    ctx.fillRect(x, y, size, size); // Draw the square
  
  canvas.addEventListener("mousemove", (event) => {
    
    const scale = {
      x: canvas.width / canvas.getBoundingClientRect().width,
      y: canvas.height / canvas.getBoundingClientRect().height,
    }
    
    // Create a Path2D object for the rectangle
    const rectanglePath = new Path2D();
    
    rectanglePath.rect(x, y, size, size);

    const mouseX = (event.clientX - canvas.getBoundingClientRect().left) * scale.x;  /* <= essentially multiplying by `scale.x` still allows us to point in the centre, but push pointer further **right**, which is present due to Device Pixel Ratio  */ 
    const mouseY = (event.clientY - canvas.getBoundingClientRect().top) * scale.y;   /* <= essentially multiplying by `scale.y` still allows us to point in the centre, but push pointer further **bottom**, which is present due to Device Pixel Ratio */    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check if the mouse click is within the rectangle path
    if ( ctx.isPointInPath(rectanglePath, mouseX, mouseY) ) {
  
      ctx.fillStyle = "red";
  
    } else {
  
      ctx.fillStyle = "green";
  
    }
  
    ctx.fillRect(x, y, size, size);
  
  });

}

resizeCanvas(); // Initial call to set up the canvas size and draw the square
window.addEventListener('resize', resizeCanvas); // Register window resize event
