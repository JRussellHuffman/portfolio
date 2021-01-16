window.onload = function () {

		var docWidth = $(document).width();

		var logo = Snap.select("#logo"),
			Box01 = Snap.select("#rect1"),
			Box02 = Snap.select("#rect2"),
			H = Snap.select("#h"),
			close = Snap.select("#close"),
			uffman = Snap.select("#uffman");
		// animate boxes
		function box1In() {
			Box01.animate({ transform: "t" + [83, 0] }, 500);
			//Box01.animate({width: 0}, 500);
		}
		function box1Out() {
			Box01.animate({ transform: "t0" }, 500);
			//Box01.animate({width: 81.6}, 500);
		}

		function box2In() {
			Box02.animate({ transform: "t" + [200, 0] }, 500);
			//Box02.animate({width: 0}, 500);
		}

		function box2Out() {
			Box02.animate({ transform: "t0" }, 500);
			//Box02.animate({width: 115.7}, 500);
		}
		//animate H
		function moveHIn() {
			H.animate({ transform: "t" + [83, 0] }, 500);
		}
		function moveHOut() {
			H.animate({ transform: "t0" }, 500);
		}
		// animate uffman
		function moveUffmanIn() {
			uffman.animate({ transform:  "t" + [83, 0] }, 500);
		}
		function moveUffmanOut() {
			uffman.animate({ transform: "t0" }, 500);
		}
		// animate closing bracket
		function moveCloseIn() {
			close.animate({ transform:  "t" + [200, 0] }, 500);
		}
		function moveCloseOut() {
			close.animate({ transform: "t0" }, 500);
		}
		//call functions
		if (docWidth > 600 ) {
			logo.hover(box1In, box1Out);
			logo.hover(box2In, box2Out);
			logo.hover(moveHIn, moveHOut);
			logo.hover(moveUffmanIn, moveUffmanOut);
			logo.hover(moveCloseIn, moveCloseOut);
		}

	};