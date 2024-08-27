import './style.css';
import { name } from './package.json';

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

// DEV_NOTE # in the future this could be a dedicated {stage} intance, just like in Konva.js
stage.setAttribute('readonlyCanvasWidth', canvas.parentElement.clientWidth * window.devicePixelRatio)
stage.setAttribute('readonlyCanvasHeight', canvas.parentElement.clientHeight * window.devicePixelRatio)

function resizeCanvas() {

    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
    
    requestAnimationFrame(drawSquare); // DEV_NOTE # Use requestAnimationFrame for smooth updates
}

function drawSquare() {

    /* DEV_NOTE # set your shape's {width | height} herein using absolute values as follows: */
    const 
      absoluteWidth = 200
      ,
      absoluteHeight = 200
      ;

    const 
      aspectRatioWidth = ( Number(stage.getAttribute('readonlyCanvasWidth')) / Number(canvas.width) )**-1
      ,
      aspectRatioHeight = ( Number(stage.getAttribute('readonlyCanvasHeight') ) / Number(canvas.height) )**-1
      ,
      size = Math.min(aspectRatioWidth, aspectRatioHeight)
      ;

    const 
      x = (canvas.parentElement.clientWidth - absoluteWidth * size) / 2
      ,
      y = (canvas.parentElement.clientHeight - absoluteHeight * size) / 2
    ;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.fillRect(x, y, absoluteWidth * size, absoluteHeight * size);
}

resizeCanvas(); // Initial call to set up the canvas size and draw the square
window.addEventListener('resize', resizeCanvas); // Register window resize event
