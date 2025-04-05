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

// $(document).ready(function() {
// 	$('.dropdown ul li').click(function() {
// 	  $('.dropdown ul li').each(function() {
// 		if ($(this).hasClass('selected')) {
// 		  $(this).removeClass('selected');
// 		}
// 	  });
// 	  $(this).addClass('selected');
// 	  $('.dropdown h1').html($(this).html()).removeClass().addClass('selected-' + ($(this).index()+1));
// 	});
//   });

// const draggables = document.querySelectorAll('.level > section');

//         draggables.forEach(draggable => {
//             draggable.addEventListener('dragstart', () => {
//                 draggable.classList.add('dragging');
//             });

//             draggable.addEventListener('dragend', () => {
//                 draggable.classList.remove('dragging');
//             });
//         });

//         document.addEventListener('dragover', (e) => {
//             e.preventDefault();
//             const dragging = document.querySelector('.dragging');
//             const closest = Array.from(draggables).reduce((closest, child) => {
//                 if (!child.classList.contains('dragging')) {
//                     const box = child.getBoundingClientRect();
//                     const offset = e.clientY - box.top - box.height / 2;
//                     if (offset < 0 && offset > closest.offset) {
//                         return { offset: offset, element: child };
//                     } else {
//                         return closest;
//                     }
//                 }
//                 return closest;
//             }, { offset: Number.NEGATIVE_INFINITY }).element;

//             if (closest) {
//                 closest.parentNode.insertBefore(dragging, closest);
//             }
//         });

let isDown = false;
let offset = { x: 0, y: 0 };

// Allow dropping in the task section
function allowDrop(event) {
    event.preventDefault();
}

// Handle drag start
function drag(event) {
    event.dataTransfer.setData("text/html", event.target.outerHTML);
}

// Handle drop
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/html");
    const newElement = document.createElement("div");
    newElement.className = 'dragme';
    newElement.innerHTML = data;

    // Set initial position of the new element
    newElement.style.position = 'absolute';
    newElement.style.left = (event.clientX - 25) + 'px';
    newElement.style.top = (event.clientY - 25) + 'px';

    // Add event listeners for moving the new element
    newElement.addEventListener('mousedown', startDrag);
    newElement.addEventListener('touchstart', startDrag);

    document.querySelector('.task').appendChild(newElement);
}

function startDrag(e) {
    isDown = true;
    const target = e.target.closest('.dragme');
    offset.x = (e.clientX || e.touches[0].clientX) - target.getBoundingClientRect().left;
    offset.y = (e.clientY || e.touches[0].clientY) - target.getBoundingClientRect().top;

    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', dragMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
}

function dragMove(e) {
    if (!isDown) return;
    const target = e.target.closest('.dragme');
    if (target) {
        target.style.left = (e.clientX || e.touches[0].clientX - offset.x) + 'px';
        target.style.top = (e.clientY || e.touches[0].clientY - offset.y) + 'px';
    }
}

function stopDrag() {
    isDown = false;
    window.removeEventListener('mousemove', dragMove);
    window.removeEventListener('touchmove', dragMove);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchend', stopDrag);
}

// Make sure to allow dropping on the task section
document.querySelector('.task').addEventListener('dragover', allowDrop);
document.querySelector('.task').addEventListener('drop', drop);



function newElement() {
    var inputValue = document.getElementById("myInput").value;
    
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }

    var li = document.createElement("li");
    li.className = "list-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "hidden-box";
    checkbox.id = "task" + Date.now(); // Unique ID for each checkbox

    var label = document.createElement("label");
    label.className = "check--label";
    label.setAttribute("for", checkbox.id);

    var labelBox = document.createElement("span");
    labelBox.className = "check--label-box";

    var labelText = document.createElement("span");
    labelText.className = "check--label-text";
    labelText.textContent = inputValue;

    label.appendChild(labelBox);
    label.appendChild(labelText);

    li.appendChild(checkbox);
    li.appendChild(label);
    addCloseButton(li);
    
    document.getElementById("mylist").appendChild(li);
    document.getElementById("myInput").value = "";
}

// Function to add close button functionality
function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        li.remove();
    }
}

// Clear all tasks from the list
function clearList() {
    var list = document.getElementById("mylist");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// function addTask() {
//     const taskInput = document.getElementById('newTask');
//     const taskText = taskInput.value.trim();

//     if (taskText) {
//         const listItem = document.createElement('li');
//         listItem.className = 'list-item';

//         listItem.innerHTML = `
//             <input type="checkbox" class="hidden-box" id="task-${Date.now()}" />
//             <label for="task-${Date.now()}" class="check--label">
//                 <span class="check--label-box"></span>
//                 <span class="check--label-text">${taskText}</span>
//                 <span class="close" onclick="removeItem(this)">&times;</span>
//             </label>
//         `;

//         document.getElementById('mylist').appendChild(listItem);
//         taskInput.value = ''; // Clear input field
//     }
// }

// function removeItem(element) {
//     const listItem = element.closest('.list-item');
//     if (listItem) {
//         listItem.remove();
//     }
// }

// function clearList() {
//     const list = document.getElementById('mylist');
//     while (list.firstChild) {
//         list.removeChild(list.firstChild);
//     }
// }

let timer;
let totalTime;
let remainingTime;
let isPaused = false;

function formatTime(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer() {
	if (remainingTime <= 0) {
		clearInterval(timer);
		document.getElementById('countdownText').textContent = '00:00';
		return;
	}

	remainingTime--;
	document.getElementById('countdownText').textContent = formatTime(remainingTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
	if (isPaused && timer) {
		isPaused = false;
		timer = setInterval(updateTimer, 1000);
		return;
	}

	clearInterval(timer);
	const hours = parseInt(document.getElementById('hourInput').value) || 0;
	const minutes = parseInt(document.getElementById('minuteInput').value) || 0;
	totalTime = (hours * 3600) + (minutes * 60); // Convert to seconds
	remainingTime = totalTime;

	if (totalTime > 0) {
		document.getElementById('countdownText').textContent = formatTime(totalTime);
		timer = setInterval(updateTimer, 1000);
	}
});

document.getElementById('pauseBtn').addEventListener('click', () => {
	if (!isPaused) {
		clearInterval(timer);
		isPaused = true;
	}
});

document.getElementById('resetBtn').addEventListener('click', () => {
	clearInterval(timer);
	document.getElementById('countdownText').textContent = '00:00';
	isPaused = false;
	document.getElementById('hourInput').value = '';
	document.getElementById('minuteInput').value = '';
});

// Don’t actually submit (which would refresh)
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
formElement.onsubmit = (event) => event.preventDefault()

// Run any time the form is modified
formElement.oninput = () => updateUrlParams()