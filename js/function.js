var docWidth = $(document).width();

// for index.html
function lightboxClick () {
	$("div.standard, div.featured").click(function() {
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

		goBack();
	})

	$("div.bg, div#close").click(function() {
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
	})
}

function idClick () {
	$("div.standard, div.featured").click(function() {
		var thisID = $(this).attr("id")
		for (var i = 0; i < content.length; i++) {
			if (content[i].title == thisID) {
				$("div.project").load("projects/" + content[i].title + "/project.html")
			}
		};
		loadURL(thisID); //add the ID as a hash to the new url
		if (docWidth < 550) {
			location.reload();
		}
	})
}

function loadURL (hash) {
	window.history.pushState({
		"html": "/index.html",
		"pageTitle": "something",
	},"","/projects.html#" + hash);
}

function revertURL () {
	window.history.pushState({
		"html": "/index.html",
		"pageTitle": "something",
	},"","/index.html");
}

lightboxClick();
idClick();

//for thumb content 

function addThumb() {
	var contentThumbs = [];
	for (var i = 0; i < content.length; i++) {
		$("div.thumbContainer").append('<div class="thumb" data-id="'+ i + '"></div>');
		contentThumbs[i] = new thumbnail(content[i].title, content[i].thumbText, content[i].thumbType, i);
		if (content[i].thumbType == "standard" || content[i].thumbType == "featured") {
			contentThumbs[i].popThumb();
			contentThumbs[i].addImage();
		} else {
			contentThumbs[i].addPullOut();
			contentThumbs[i].addBlank();
		}
	};
	lightboxClick();
	idClick();
}

addThumb();

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
		"display" : "none",
	})
}

thumbRollover();

// for next.html
var contentHash;

function checkHash() {
	if(window.location.hash) {
	  var withHash = window.location.hash;
	  contentHash = withHash.slice( 1 ); //remove the hash and store just the value
	  console.log(contentHash)
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
}

//call functions

smoothScroll();

checkHash();
loadFromHash();