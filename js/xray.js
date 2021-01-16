
// First load the images - they must be the same size for this to work
Im1 = new Image();
Im1.src = 'assets/deskWire.jpg';
Im1.onload = function(){
    wide = Im1.width;
    tall = Im1.height;
}

//console.log(Im1);

Im2 = new Image();
Im2.src = 'assets/desk.jpg';

function CanvasPreload(){
	canvas=document.getElementById("overlayCanvas");
    // set the canvas dimensions based on the size of the images
    canvas.width = wide;    
    canvas.height = tall;
    // initially we are going to have them split right down the middle
	var ctx=canvas.getContext("2d");
    ctx.drawImage(Im1,+
        0,0,+                       // start at (0,0)
        Math.floor(wide/2)-1,tall,+ // use (half width, full height) - the (-1) provides a 1px wide line at the interface
        0,0,+                       // place it at (0,0)
        Math.floor(wide/2)-1,tall); // draw at (half width, full height)
    ctx.drawImage(Im2,+             // similar to image one, but second half
        Math.floor(wide/2),0,+
        Math.floor(wide/2),tall,+
        Math.floor(wide/2),0,+
        Math.floor(wide/2),tall);
	
	canvas.addEventListener('mousemove',function(evt){redrawImages(evt)},false);
}

function redrawImages(evt){
    canvas=document.getElementById("overlayCanvas")
    var ctx=canvas.getContext("2d");
	ctx.clearRect(0,0,799,799);     // clear the canvas - allows for the 1px wide white line at split
	var divide = mousePosition(evt); // get the mouse position from the function mousePosition
	ctx.drawImage(Im1,+     // draw image one
        0,0,+               // starting at (0,0)
        divide-1,tall,+     // width of (mouse position-1, full height)
        0,0,+               // place at (0,0)
        divide-1,tall);     // draw at a scale of 1:1        
	ctx.drawImage(Im2,+     // similar to image one, but the other half.
        divide,0,+
        wide-divide,tall,+
        divide,0,+
        wide-divide,tall);    
}

function mousePosition(evt){    // pass the event to the function
	var rect = canvas.getBoundingClientRect();  // get the position of the canvas in the viewport
	return evt.clientX - rect.left; // get the mouse position, then remove the viewport location to get the position on the canvas
}
