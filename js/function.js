var docWidth = $(document).width();

// for index.html
function lightboxClick () {
	$("div.standard, div.featured, div.removed, h4.archive").click(function() {
		openContent();
	});

	$("div.bg, div#close").click(function() {
		closeContent();
	})
}

function openContent() {
	$("div.lightbox").fadeIn();
	$("div.fg").animate({
		"top":"5px",
	})
	$("div#close").animate({
		"top":"5px",
	})
	$("div#open").animate({
		"top":"90px",
	})
	$("body").css({
		"overflow" : "hidden",
	})

	console.log("ran open content");

	goBack();
}

function closeContent() {
	$("div.lightbox").fadeOut();
	$("div.fg").animate({
		"top":"100%",
	})
	$("div#close").animate({
		"top":"100%",
	})
	$("div#open").animate({
		"top":"100%",
	})
	$("div.project").empty();
	revertURL();
	$("body").css({
		"overflow" : "auto",
	})
}

$(document).keyup(function(e) {
     if (e.key === "Escape") {
        closeContent();
    }
});

function idClick () {
	$("div.standard, div.featured, div.removed, h4.archive").click(function() {
		var thisID = $(this).attr("id")
		for (var i = 0; i < content.length; i++) {
			if (content[i].title == thisID) {
				$("div.project").load("projects/" + content[i].title + "/project.html") //get the content to fill the modal
			}
		};
		loadURL(thisID); //add the ID as a hash to the new url
		if (docWidth < 550) {
			// location.reload();
		}
	})
}

function loadURL (hash) {
	// window.location.hash = hash;
	// window.location = '#'+hash;

	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '#'+hash;
	window.history.pushState({ path: newurl }, '', newurl);
	// window.history.pushState({
	// 	"html": "/portfolio/index.html",
	// 	"pageTitle": "something",
	// },"","/portfolio/index.html#" + hash);
}

function revertURL () {
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
	window.history.pushState({ path: newurl }, '', newurl);
	// window.history.pushState({
	// 	"html": "/portfolio/index.html",
	// 	"pageTitle": "something",
	// },"","/portfolio/index.html");
}

lightboxClick();
idClick();

//for thumb content

function addThumb() {
	var contentThumbs = [];
	for (var i = 0; i < content.length; i++) {
		if (content[i].thumbType == "standard" || content[i].thumbType == "featured") {
			$("div.thumbContainer").append('<div class="thumb" data-id="'+ i + '"></div>');
			contentThumbs[i] = new thumbnail(content[i].title, content[i].thumbText, content[i].thumbType, i);
			contentThumbs[i].popThumb();
			contentThumbs[i].addImage();
		} else if (content[i].thumbType == "pullout") {
			$("div.thumbContainer").append('<div class="thumb" data-id="'+ i + '"></div>');
			contentThumbs[i] = new thumbnail(content[i].title, content[i].thumbText, content[i].thumbType, i);
			contentThumbs[i].addPullOut();
			contentThumbs[i].addBlank();
		} else if (content[i].thumbType == "archive") {
			$("div.archiveContainer").append('<div class="thumb archive" data-id="'+ i + '"></div>');
			contentThumbs[i] = new thumbnail(content[i].title, content[i].thumbText, content[i].thumbType, i);
			// contentThumbs[i].popThumb();
			contentThumbs[i].addArchive();
		}
	};
	lightboxClick();
	idClick();
}

addThumb();

function addPrivate() {
	var contentThumbs = [];
	for (var i = 0; i < content.length; i++) {
		if (content[i].thumbType == "removed") {
			$("div.privateContainer").append('<div class="thumb" data-id="'+ i + '"></div>');
			contentThumbs[i] = new thumbnail(content[i].title, content[i].thumbText, content[i].thumbType, i);
			contentThumbs[i].popThumb();
			contentThumbs[i].addImage();
		}
	};
	lightboxClick();
	idClick();
}

function thumbRollover() {
	$("div.thumb").hover(hoverIn, hoverOut);
}

function hoverIn() {
	$(this).children("span").css({
		"display" : "block",
	})
}

function hoverOut() {
	$(this).children("span").css({
		"display" : "none", // this was none, but trying something new
	})
}

thumbRollover();

// for next.html
var contentHash;

function checkHash() {
	console.log("did the check hash thing");
	if(window.location.hash) {
		console.log("got here")
	  var withHash = window.location.hash;
	  contentHash = withHash.slice( 1 ); //remove the hash and store just the value
	  console.log(contentHash);
		openContent();
	} else {
	  console.log("no hash");
	}
}

function loadFromHash() {
	for (var i = 0; i < content.length; i++) {
		if (content[i].title == contentHash) {
			$("div.project").load("projects/" + content[i].title + "/project.html")
		}
	};
}

function goBack() {
	window.addEventListener("popstate", function(e) {
		console.log("popstate");
		window.history.go(0);
	});
}

// open project in new tab

function openProject () {
	$("div#open").click(function() {
		location.reload();
	})
}

openProject();

//menu twist x hamburger thing

var clicked = false;

function twist () {
	var line1 = Snap.selectAll("#line1"),
		line2 = Snap.selectAll("#line2"),
		line3 = Snap.selectAll("#line3");
		if (clicked) {
			line3.animate({
				transform:"rotate(0 25 25)",
				y: 30
			}, 500);
			line1.animate({
				transform:"rotate(0 25 25)",
				y: 0
			}, 500);
			line2.animate({
				transform:"rotate(0 25 25)",
				width: 50,
				x: 0
			}, 500);

			slideOut();

			clicked = false;
		} else {
			line1.animate({
				transform:"matrix(0.7071 -0.7071 0.7071 0.7071 -5.052 22.8033)",
				y: 15
			}, 500);
			line2.animate({
				transform:"rotate(90 22 20)",
				width: 0,
				x: 25
			}, 500);
			line3.animate({
				transform:"matrix(0.7071 0.7071 -0.7071 0.7071 19.6083 -12.5887)",
				y: 15
			}, 500);

			slideIn();

			clicked = true;
		}
};

function slideOut() {
	$("div#slideMenu").animate({right: "-100%"}, 800);
	$("div.headContainer").css({"border-bottom": "none"});
	$("body").css({"overflow":"auto"});
	clicked = false;
}

function slideIn () {
	$("div#slideMenu").animate({right: "0"}, 800);
	$("div.headContainer").css({"border-bottom": "1px solid white"});
	$("body").css({"overflow":"hidden"});
	clicked = true;
}

$("a.menuItem").click(function(){
	twist ();
})

// auto scrolling and menu

function smoothScroll () {
	$('div.headContainer').on('click', 'a', function() {
	  	var menuID = $(this).attr("href");

  		$("body, html").animate({scrollTop: $(menuID).offset().top}, "slow");
		return false;
	});
	$('div.intro').on('click', 'a', function() {
	  	var menuID = $(this).attr("href");

  		$("body, html").animate({scrollTop: $(menuID).offset().top}, "slow");
		return false;
	});
}

function getValue() {
	var input = document.getElementById("input-text").value;
	if (input == "PrivateProjects" || input == "Private" || input ==  "Software" || input ==  "Product") {
		// document.getElementById("output").innerHTML = "Private projects have been added above.";
		addPrivate();
		thumbRollover();
		document.getElementById("output").innerHTML = "";
		$(".privateTrigger").hide();
	} else {
		document.getElementById("output").innerHTML = "The password you entered is incorrect";
	}
}

//call functions

smoothScroll();

checkHash();
loadFromHash();



// testing that javascript thing

const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function() { 
    const environment = new Environment( typo, particle );
  }

  var typo = null;
  const loader = new THREE.FontLoader( manager );
  const font = loader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', function ( font ) { typo = font; });
  const particle = new THREE.TextureLoader( manager ).load( 'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png');

}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
  preload ();
else
  document.addEventListener("DOMContentLoaded", preload ); 

class Environment {

  constructor( font, particle ){ 

    this.font = font;
    this.particle = particle;
    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup()
    this.bindEvents();
  }

  bindEvents(){

    window.addEventListener( 'resize', this.onWindowResize.bind( this ));
    
  }

  setup(){ 

    this.createParticles = new CreateParticles( this.scene, this.font,             this.particle, this.camera, this.renderer );
  }

  render() {
    
     this.createParticles.render()
     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {

    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth /  this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, 100 );

  }

  createRenderer() {

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild( this.renderer.domElement );

    this.renderer.setAnimationLoop(() => { this.render() })

  }

  onWindowResize(){

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

  }
}

class CreateParticles {
	
	constructor( scene, font, particleImg, camera, renderer ) {
    
		this.scene = scene;
		this.font = font;
		this.particleImg = particleImg;
		this.camera = camera;
		this.renderer = renderer;
		
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2(-200, 200);
		
		this.colorChange = new THREE.Color();

		this.buttom = false;

		this.data = {

			text: 'FUTURE\nIS NOW',
			amount: 1500,
			particleSize: 1,
			particleColor: 0xffffff,
			textSize: 16,
			area: 250,
			ease: .05,
		}

		this.setup();
		this.bindEvents();

	}


	setup(){

		const geometry = new THREE.PlaneGeometry( this.visibleWidthAtZDepth( 100, this.camera ), this.visibleHeightAtZDepth( 100, this.camera ));
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true } );
		this.planeArea = new THREE.Mesh( geometry, material );
		this.planeArea.visible = false;
		this.createText();

	}

	bindEvents() {

		document.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
		document.addEventListener( 'mousemove', this.onMouseMove.bind( this ));
		document.addEventListener( 'mouseup', this.onMouseUp.bind( this ));
		
	}

	onMouseDown(){
		
		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		const vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5);
		vector.unproject( this.camera );
		const dir = vector.sub( this.camera.position ).normalize();
		const distance = - this.camera.position.z / dir.z;
		this.currenPosition = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
		
		const pos = this.particles.geometry.attributes.position;
		this.buttom = true;
		this.data.ease = .01;
		
	}

	onMouseUp(){

		this.buttom = false;
		this.data.ease = .05;
	}

	onMouseMove( ) { 

	    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	}

	render( level ){ 

		const time = ((.001 * performance.now())%12)/12;
		const zigzagTime = (1 + (Math.sin( time * 2 * Math.PI )))/6;

		this.raycaster.setFromCamera( this.mouse, this.camera );

		const intersects = this.raycaster.intersectObject( this.planeArea );

		if ( intersects.length > 0 ) {

			const pos = this.particles.geometry.attributes.position;
			const copy = this.geometryCopy.attributes.position;
			const coulors = this.particles.geometry.attributes.customColor;
			const size = this.particles.geometry.attributes.size;

		    const mx = intersects[ 0 ].point.x;
		    const my = intersects[ 0 ].point.y;
		    const mz = intersects[ 0 ].point.z;

		    for ( var i = 0, l = pos.count; i < l; i++) {

		    	const initX = copy.getX(i);
		    	const initY = copy.getY(i);
		    	const initZ = copy.getZ(i);

		    	let px = pos.getX(i);
		    	let py = pos.getY(i);
		    	let pz = pos.getZ(i);

		    	this.colorChange.setHSL( .5, 1 , 1 )
		    	coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    	coulors.needsUpdate = true;

		    	size.array[ i ]  = this.data.particleSize;
		    	size.needsUpdate = true;

		    	let dx = mx - px;
		    	let dy = my - py;
		    	const dz = mz - pz;

		    	const mouseDistance = this.distance( mx, my, px, py )
		    	let d = ( dx = mx - px ) * dx + ( dy = my - py ) * dy;
		    	const f = - this.data.area/d;

		    	if( this.buttom ){ 

		    		const t = Math.atan2( dy, dx );
		    		px -= f * Math.cos( t );
		    		py -= f * Math.sin( t );

		    		this.colorChange.setHSL( .5 + zigzagTime, 1.0 , .5 )
		    		coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    		coulors.needsUpdate = true;

		    		if ((px > (initX + 70)) || ( px < (initX - 70)) || (py > (initY + 70) || ( py < (initY - 70)))){

		    			this.colorChange.setHSL( .15, 1.0 , .5 )
		    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    			coulors.needsUpdate = true;

		    		}

		    	}else{
		    	
			    	if( mouseDistance < this.data.area ){

			    		if(i%5==0){

			    			const t = Math.atan2( dy, dx );
			    			px -= .03 * Math.cos( t );
			    			py -= .03 * Math.sin( t );

			    			this.colorChange.setHSL( .15 , 1.0 , .5 )
			    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
			    			coulors.needsUpdate = true;

							size.array[ i ]  =  this.data.particleSize /1.2;
							size.needsUpdate = true;

			    		}else{

					    	const t = Math.atan2( dy, dx );
					    	px += f * Math.cos( t );
					    	py += f * Math.sin( t );

					    	pos.setXYZ( i, px, py, pz );
					    	pos.needsUpdate = true;

					    	size.array[ i ]  = this.data.particleSize * 1.3 ;
					    	size.needsUpdate = true;
				    	}

			    		if ((px > (initX + 10)) || ( px < (initX - 10)) || (py > (initY + 10) || ( py < (initY - 10)))){

			    			this.colorChange.setHSL( .15, 1.0 , .5 )
			    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
			    			coulors.needsUpdate = true;

			    			size.array[ i ]  = this.data.particleSize /1.8;
			    			size.needsUpdate = true;

			    		}
			    	}

		    	}

		    	px += ( initX  - px ) * this.data.ease;
		    	py += ( initY  - py ) * this.data.ease;
		    	pz += ( initZ  - pz ) * this.data.ease;

		    	pos.setXYZ( i, px, py, pz );
		    	pos.needsUpdate = true;

		    }
		}
	}

	createText(){ 

		let thePoints = [];

		let shapes = this.font.generateShapes( this.data.text , this.data.textSize  );
		let geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();
	
		const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		const yMid =  (geometry.boundingBox.max.y - geometry.boundingBox.min.y)/2.85;

		geometry.center();

		let holeShapes = [];

		for ( let q = 0; q < shapes.length; q ++ ) {

			let shape = shapes[ q ];

			if ( shape.holes && shape.holes.length > 0 ) {

				for ( let  j = 0; j < shape.holes.length; j ++ ) {

					let  hole = shape.holes[ j ];
					holeShapes.push( hole );
				}
			}

		}
		shapes.push.apply( shapes, holeShapes );

		let colors = [];
		let sizes = [];
					
		for ( let  x = 0; x < shapes.length; x ++ ) {

			let shape = shapes[ x ];

			const amountPoints = ( shape.type == 'Path') ? this.data.amount/2 : this.data.amount;

			let points = shape.getSpacedPoints( amountPoints ) ;

			points.forEach( ( element, z ) => {
						
				const a = new THREE.Vector3( element.x, element.y, 0 );
				thePoints.push( a );
				colors.push( this.colorChange.r, this.colorChange.g, this.colorChange.b);
				sizes.push( 1 )

				});
		}

		let geoParticles = new THREE.BufferGeometry().setFromPoints( thePoints );
		geoParticles.translate( xMid, yMid, 0 );
				
		geoParticles.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
		geoParticles.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1) );

		const material = new THREE.ShaderMaterial( {

			uniforms: {
				color: { value: new THREE.Color( 0xffffff ) },
				pointTexture: { value: this.particleImg }
			},
			vertexShader: document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
		} );

		this.particles = new THREE.Points( geoParticles, material );
		this.scene.add( this.particles );

		this.geometryCopy = new THREE.BufferGeometry();
		this.geometryCopy.copy( this.particles.geometry );
		
	}

	visibleHeightAtZDepth ( depth, camera ) {

	  const cameraOffset = camera.position.z;
	  if ( depth < cameraOffset ) depth -= cameraOffset;
	  else depth += cameraOffset;

	  const vFOV = camera.fov * Math.PI / 180; 

	  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
	}

	visibleWidthAtZDepth( depth, camera ) {

	  const height = this.visibleHeightAtZDepth( depth, camera );
	  return height * camera.aspect;

	}

	distance (x1, y1, x2, y2){
	   
	    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
	}
}
