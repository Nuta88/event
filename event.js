window.onload = start;
function start() {
	prepareArticleForUser();
};

function prepareArticleForUser() {
	var text = getText();
	var divText = document.getElementsByTagName("div")[0];
	deleteInputedTextElement(divText);
	divText.innerHTML += convertTextToSpans(text);
	highlightWordsEvent(divText.getElementsByTagName("span"));
	clickForMovingWordFromTextToDiction(divText.getElementsByTagName("span"));
};

function getText() {
	return document.getElementById("pText").innerHTML;
};

function convertTextToSpans(text) {
	return "<span class='empty'>"
			+ text.replace(/\s+/ig, "</span> <span class='empty'>") + "</span>";
};

function deleteInputedTextElement(parentElement) {
	var child = parentElement.getElementsByTagName("p")[0];
	parentElement.removeChild(child);
};

function highlightWordsEvent(spans) {
	for ( var i = 0; i < spans.length; i++) {
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

function showAllocateRed(spanText) {
	spanText.setAttribute("class", "allocateRed");
};

function clickForMovingWordFromTextToDiction(words) {
	for ( var i = 0; i < words.length; i++) {
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
	lastSpan.onclick = showingIdenticalWordsInTheText;
};
function showingIdenticalWordsInTheText(event) {
	var divText = document.getElementsByTagName("div")[0];
	var allSpansOfText = divText.getElementsByTagName("span");
	var wordToSearch = event.target.innerHTML;
	for ( var i = 0; i < allSpansOfText.length; i++) {
		if (allSpansOfText[i].innerHTML.search(wordToSearch) != -1) {
			var textConvert = convertSpanToTextWithoutSigns(allSpansOfText[i].innerHTML);
			if (textConvert === wordToSearch) {
				showAllocateRed(allSpansOfText[i]);
			}
		}
	}
};
function convertSpanToTextWithoutSigns(text) {
	return text.match(/(\w+-)+\w+|[\w']+/gi)[0];
};

