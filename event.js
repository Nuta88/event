window.onload = function() {
	document.getElementById("button").onclick = function() {
		var text = getText();
		deleteDivInput();
		var createDivText = createDiv("divText", "pText", "text");
		var createDivDiction = createDiv("divDiction", "pDiction", "dictionary");
		var button = creatButton();
		var pText = document.getElementById("pText");
		pText.innerHTML += convertTextToSpans(text);
		highlightWordsEvent(pText.getElementsByTagName("span"));
		clickForMovingWordFromTextToDiction(pText.getElementsByTagName("span"));
	};
};

function getText() {
	return document.getElementById("textarea").value;
};

function deleteDivInput() {
	var child = document.getElementById("divInput");
	document.getElementById("body").removeChild(child);
};

function createDiv(attributeDiv, attributeParag, value) {
	var div = document.createElement("div");
	div.setAttribute("id", attributeDiv);
	div.setAttribute("class", attributeDiv);
	body.appendChild(div);
	var h1 = document.createElement("h1");
	h1.innerHTML = value;
	div.appendChild(h1);
	var p = document.createElement("p");
	p.setAttribute("id", attributeParag);
	div.appendChild(p);
}

function creatButton() {
	var button = document.createElement("button");
	button.setAttribute("id", "buttonReload");
	button.innerHTML = "Input the text";
	button.onclick = function() {
		window.location.reload();
	};
	body.appendChild(button);
}

function convertTextToSpans(text) {
	return "<span class='empty'>" + text.replace(/\s+/ig, "</span> <span class='empty'>") + "</span>";
};

function highlightWordsEvent(spans) {
	for (var i = 0; i < spans.length; i++) {
		spans[i].onmouseover = showAllocate;
		spans[i].onmouseout = showEmpty;
	}
};

function showAllocate(event) {
	event.target.setAttribute("class", "allocateYellow");
};

function showEmpty(event) {
	event.target.setAttribute("class", "empty");
};

function showAllocateWord(spanText) {
	spanText.setAttribute("class", "allocate");
};

function clickForMovingWordFromTextToDiction(words) {
	for (var i = 0; i < words.length; i++) {
		words[i].onclick = moveWordFromTextToDiction;
	}
};

function moveWordFromTextToDiction(event) {
	var innerSpan = event.target.innerHTML;
	var words = convertSpanToTextWithoutSigns(innerSpan);
	var pDiction = document.getElementById("pDiction");
	var newSpan = document.createElement("span");
	newSpan.innerHTML = words;
	setEventsOfLastDictionSpan(newSpan);
	pDiction.appendChild(newSpan);
	pDiction.appendChild(document.createElement("br"));
};

function setEventsOfLastDictionSpan(lastSpan) {
	lastSpan.onmouseover = showAllocate;
	lastSpan.onmouseout = showEmpty;
	lastSpan.onclick = allocateWordsOnText;
};

function allocateWordsOnText(event) {
	for (var i = 0; i < register.allocatedSpans.length; i++) {
		register.allocatedSpans[i].setAttribute("class", "empty");
	}
	register.clearRegister();
	allocateWordsOnDiction(event.target);

	var pText = document.getElementById("pText");
	var allSpansOfText = pText.getElementsByTagName("span");
	var wordToSearch = event.target.innerHTML;
	for (var i = 0; i < allSpansOfText.length; i++) {
		if (allSpansOfText[i].innerHTML.search(wordToSearch) != -1) {
			var textConvert = convertSpanToTextWithoutSigns(allSpansOfText[i].innerHTML);
			if (textConvert === wordToSearch) {
				showAllocateWord(allSpansOfText[i]);
				register.addToRegister(allSpansOfText[i]);
			}
		}
	}
};

function allocateWordsOnDiction(event) {
	for (var i = 0; i < registerDiction.allocatedSpans.length; i++) {
		registerDiction.allocatedSpans[i].setAttribute("class", "empty");
	}
	registerDiction.clearRegister();
	showAllocateWord(event);
	event.onmouseout = showAllocateWord;
	event.onmouseover = showAllocateWord;
	registerDiction.addToRegister(event);
}

var register = {
	allocatedSpans : [],
	addToRegister : function(span) {
		this.allocatedSpans.push(span);
	},
	clearRegister : function() {
		this.allocatedSpans = [];
	}
};

var registerDiction = {
	allocatedSpans : [],
	addToRegister : function(span) {
		this.allocatedSpans.push(span);
	},
	clearRegister : function() {
		this.allocatedSpans = [];
	}
};

function convertSpanToTextWithoutSigns(text) {
	return text.match(/(\w+-)+\w+|[\w']+/gi)[0];
};