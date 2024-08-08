import './style.css';

let canvas = document.getElementById('layer-1');
let container = canvas.parentElement;
let canvasWidth = canvas.width = container.clientWidth*devicePixelRatio;
let canvasHeight = canvas.height = container.clientHeight*devicePixelRatio;
let ctx = canvas.getContext('2d');

function drawRect(canvas, ctx, shapeWidth = 300, shapeHeight = 200) {

  canvas.width = container.clientWidth*devicePixelRatio;
  canvas.height = container.clientHeight*devicePixelRatio;

  let canvasWidthRatio = canvasWidth / canvas.width; console.log("canvasWidthRatio", canvasWidthRatio);
  let canvasHeightRatio = canvasHeight / canvas.height; console.log("canvasHeightRatio", canvasHeightRatio);
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw something new
  ctx.fillStyle = 'green';
  ctx.fillRect(canvas.width/2 - (shapeWidth/2), canvas.height/2 - (shapeHeight/2), shapeWidth, shapeHeight);
}

drawRect(canvas, ctx);
window.addEventListener('resize', ()=>{

  drawRect(canvas, ctx);

})