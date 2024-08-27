import './style.css';
import { name } from './package.json'

document.addEventListener('DOMContentLoaded', ()=>{
  document.title = name;
})

const 
  canvas = document.getElementById('layer-1')
  ,
  stage = canvas.parentElement
  ,
  ctx = canvas.getContext('2d')
;

stage.setAttribute('readonlyCanvasWidth', canvas.parentElement.clientWidth * window.devicePixelRatio)
stage.setAttribute('readonlyCanvasHeight', canvas.parentElement.clientHeight * window.devicePixelRatio)

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

    /* console.log((Number(stage.getAttribute('readonlyCanvasWidth')) / Number(canvas.width))**-1 , ( Number(stage.getAttribute('readonlyCanvasHeight')) / Number(Number(canvas.height)))**-1) */

    const aspectRatioWidth = ( Number(stage.getAttribute('readonlyCanvasWidth')/*  * devicePixelRatio  */) / Number(canvas.width) )**-1;
    const aspectRatioHeight = ( Number(stage.getAttribute('readonlyCanvasHeight')/*  * devicePixelRatio */ ) / Number(canvas.height) )**-1;
    const size = Math.min(aspectRatioWidth, aspectRatioHeight);

    /* DEV_NOTE # set your shape's width|height using absolute values */
    const absoluteWidth = 200, absoluteHeight = 200;

    const 
      x = (/* canvas.width */innerWidth - absoluteWidth * size) / 2
      ,
      y = (/* canvas.height */innerHeight - absoluteHeight * size) / 2
    ;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = 'green'; // Set the square color
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.fillRect(x, y, absoluteWidth * size, absoluteHeight * size); // Draw the square
}

resizeCanvas(); // Initial call to set up the canvas size and draw the square
window.addEventListener('resize', resizeCanvas); // Register window resize event
