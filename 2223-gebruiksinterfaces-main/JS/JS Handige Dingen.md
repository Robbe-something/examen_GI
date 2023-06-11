```JS
let canvas = document.getElementById('KubusView');  
let context = canvas.getContext('2d');  
  
context.beginPath();  
context.fillStyle = "#ff0000";  
context.moveTo(10, 10);  
context.lineTo(50, 20);  
context.lineTo(40, 60);  
context.lineTo(20, 70);  
//context.lineTo(10, 10);  
context.closePath();  
context.lineWidth = 4;  
context.fill();  
  
// set line color  
context.strokeStyle = '#000000';  
context.stroke();
```
![[Fig1.png]]