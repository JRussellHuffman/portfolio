function thumbnail (ti, te, ty, num) {
	this.itemTitle = ti;
	this.itemText = te;
	this.itemType = ty;
	this.itemNumber = num;

	//small left div
	this.popThumb = function popThumb() {
		var activeDiv = "div[data-id='"+ this.itemNumber + "']";
		$(activeDiv).html('<span class="thumb">' + this.itemText + '</span>');
		$(activeDiv).attr('id', this.itemTitle);
		$(activeDiv).addClass(this.itemType);
	}

	this.addImage = function addImage() {
		var activeDiv = "div[data-id='"+ this.itemNumber + "']";
		$(activeDiv).append('<img class="thumb" src="projects/'+ this.itemTitle + '/thumb.jpg">');
	}

	this.addPullOut = function addPullOut() {
		var activeDiv = "div[data-id='"+ this.itemNumber + "']";
		$(activeDiv).append('<div class="pullOut"><h1 class="pullOut">' + this.itemText + '</h1></div>');
	}

	this.addBlank = function addBlank() {
		var activeDiv = "div[data-id='"+ this.itemNumber + "']";
		$(activeDiv).append('<img class="thumb" src="assets/blank.png">');
	}
}