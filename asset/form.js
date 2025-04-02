// Find your form
const formElement = document.querySelector('#some-form')

// Function to match the form to URL/stored params
const updateForm = (params) => {
	// Parse into params
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	params = new URLSearchParams(params)

	// Our friend, the loop
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	params.forEach((value, key) => {
		// Find them by their ID
		let inputOrSelect = document.getElementById(key)

		if (inputOrSelect) {
			// Set the actual input to the param value
			inputOrSelect.value = value
		} else {
			// Radios are a bit different, find them by `name` attribute
			document.querySelectorAll(`[name=${key}]`).forEach((element) => {
				// Check the one matching the param value
				if (value == element.value) element.checked = true
			}
		)
		}
	})

	// And a callback!
	window.stateCallback?.()
}

// Function to save them to localStorage
const storeParams = () => {
	// Get the form data
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
	let formParams = new FormData(formElement)

	// Loop through each key/value pair
	formParams.forEach((value, key) => {
		// And save them out
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		localStorage.setItem(key, value)
	})
}

// Function to update the URL from the form
const updateUrlParams = () => {
	let formParams = new FormData(formElement) // Get the form data
	formParams = new URLSearchParams(formParams) // Make it into params
	formParams = formParams.toString() // And then into a string

	// You could also write this as:
	// let formParams = new URLSearchParams(new FormData(formElement)).toString()

	// Update the URL with the params at the end
	window.history.replaceState(null, null, '?' + formParams)

	// And also store them!
	storeParams()

	// And a callback!
	window.stateCallback?.()
}



// First, check for query/params in the URL
// https://developer.mozilla.org/en-US/docs/Web/API/Location/search
if (window.location.search) {
	let urlParams = window.location.search // Get the query string

	updateForm(urlParams) // Update the form from these
}
// Otherwise check for saved params in storage
else if (localStorage.length > 0) {
	let storedParams = Object.entries(localStorage) // Get the saved params

	updateForm(storedParams) // Update the form from these
}

$(document).ready(function() {
	// Dropdown functionality
	$('.dropdown ul li').click(function() {
	  $('.dropdown ul li').removeClass('selected');
	  $(this).addClass('selected');
	  $('.dropdown h1').html($(this).html()).removeClass().addClass('selected-' + ($(this).index() + 1));
	});

let myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
	var div = this.parentElement;
	div.style.display = "none";
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
	ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
	alert("You must write something!");
  } else {
	document.getElementById("mylist").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
	close[i].onclick = function() {
	  var div = this.parentElement;
	  div.style.display = "none";
	}
  }
}

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');
const countdownText = document.getElementById('countdown');
const countdownCircle = document.querySelector('.countdown-circle');

let timer;
let totalTime;
let remainingTime;
let isPaused = false;

document.querySelectorAll('.buttons button').forEach(button => {
const icon = button.querySelector('lord-icon');
button.addEventListener('mouseover', () => {
icon.setAttribute('colors', 'primary:#000000');
});

button.addEventListener('mouseout', () => {
icon.setAttribute('colors', 'primary:#ffffff');
});
});

function formatTime(seconds) {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer() {
if (remainingTime <= 0) {
clearInterval(timer);
countdownCircle.style.strokeDashoffset = '0';
countdownText.textContent = '00:00';
return;
}

remainingTime--;
countdownText.textContent = formatTime(remainingTime);

const dashOffset = (282.743 * (remainingTime / totalTime)).toFixed(3);
countdownCircle.style.strokeDashoffset = dashOffset;
}

startBtn.addEventListener('click', () => {
if (isPaused && timer) {
isPaused = false;
timer = setInterval(updateTimer, 1000);
return;
}

clearInterval(timer);
totalTime = parseInt(timeInput.value) || 0;
remainingTime = totalTime;

if (totalTime > 0) {
countdownText.textContent = formatTime(totalTime);
countdownCircle.style.strokeDashoffset = 282.743;
timer = setInterval(updateTimer, 1000);
}
});

pauseBtn.addEventListener('click', () => {
if (!isPaused) {
clearInterval(timer);
isPaused = true;
}
});

resetBtn.addEventListener('click', () => {
clearInterval(timer);
countdownText.textContent = '00:00';
countdownCircle.style.strokeDashoffset = 282.743;
isPaused = false;
});


// Don’t actually submit (which would refresh)
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
formElement.onsubmit = (event) => event.preventDefault()

// Run any time the form is modified
formElement.oninput = () => updateUrlParams()