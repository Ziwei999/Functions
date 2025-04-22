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


const updateUrlParams = () => {
	let formParams = new FormData(formElement) 
	formParams = new URLSearchParams(formParams) 
	formParams = formParams.toString() 
	window.history.replaceState(null, null, '?' + formParams)
	storeParams()
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

const difficultySVGs = {
    easy: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 577 501"><defs><style>.cls-1{fill:#bfe7f3;}.cls-2{fill:#f172ac;}.cls-3{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}.cls-8{fill:#f04e56;}.cls-5{fill:#3d54a4;}</style></defs><path class="cls-1" d="M139.69,368.91H402.77c37.15.44,69-27.19,73.72-63.57,4.65-35.56-17.84-69.82-52.75-79.8.35-1.71,6.75-35.9-17.59-58.16-20-18.33-52-20.5-77.09-4.06a106.35,106.35,0,0,0-196.13,64.92c-29.17,11-48.59,38.64-48.69,69C84.12,330.22,106.85,359.93,139.69,368.91Z"/><circle cx="315.53" cy="266.12" r="10.82"/><circle cx="233.7" cy="266.79" r="10.82"/><circle class="cls-2" cx="221.53" cy="293.84" r="6.76"/><circle class="cls-2" cx="332.44" cy="293.84" r="6.76"/><path class="cls-3" d="M258.05,280.32c1.61,8.6,8.29,15.15,16.23,16.23,9.6,1.31,19.42-5.58,21.64-16.23"/><path class="cls-8" d="M232.36,245.7a14.86,14.86,0,0,0-17.17-4.77c-6.72,2.8-10.44,10.73-8.11,18.25a63.11,63.11,0,0,0,24.64,27.23,51.54,51.54,0,0,0,25.76-28.94,14,14,0,0,0-25.12-11.77Z"/><path class="cls-8" d="M314.87,244.35a14.85,14.85,0,0,0-17.17-4.77c-6.72,2.8-10.45,10.73-8.11,18.25a63,63,0,0,0,24.64,27.22A51.56,51.56,0,0,0,340,256.12a14,14,0,0,0-25.12-11.77Z"/><path class="cls-5" d="M348.22,86.85A11.39,11.39,0,1,0,336.7,67.2a11.23,11.23,0,0,0-22.44,0,11.68,11.68,0,0,0-12.38,19.65A11.54,11.54,0,0,0,313,106.51a12.92,12.92,0,0,0,24.51,0,11.61,11.61,0,0,0,14.12-3.39C355.13,98.24,353.88,90.68,348.22,86.85Z"/><path class="cls-5" d="M91.23,219.41a11.4,11.4,0,1,0-11.52-19.66,11.23,11.23,0,0,0-22.44,0,11.69,11.69,0,0,0-12.38,19.66A11.54,11.54,0,0,0,56,239.06a12.91,12.91,0,0,0,24.5,0,11.61,11.61,0,0,0,14.13-3.39C98.14,230.79,96.88,223.23,91.23,219.41Z"/><path class="cls-5" d="M541.65,273.51a11.4,11.4,0,1,0-11.53-19.66,11.23,11.23,0,0,0-22.44,0,11.69,11.69,0,0,0-12.38,19.66,11.54,11.54,0,0,0,11.1,19.65,12.92,12.92,0,0,0,24.51,0A11.61,11.61,0,0,0,545,289.78C548.55,284.9,547.3,277.33,541.65,273.51Z"/></svg>`,
    medium: `<svg id="Layer_2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 577 501"><defs><style>.cls-6{fill:#f7ec13;}.cls-2{fill:#f172ac;}.cls-4{fill:#f15a26;stroke:#000;stroke-width:4px;}.cls-4,.cls-5{stroke-miterlimit:10;}.cls-5{fill:#f79420;stroke:#f79420;stroke-width:3px;}</style></defs><path class="cls-6" d="M130.09,370.62H393.17c37.15.43,69-27.2,73.72-63.57,4.65-35.57-17.84-69.82-52.75-79.81.35-1.71,6.74-35.89-17.59-58.16-20-18.33-52-20.5-77.1-4.06A106.35,106.35,0,0,0,123.33,230c-29.17,11-48.59,38.63-48.69,69C74.52,331.93,97.25,361.63,130.09,370.62Z"/><circle class="cls-2" cx="211.92" cy="295.55" r="6.76"/><circle class="cls-2" cx="322.84" cy="295.55" r="6.76"/><circle class="cls-3" cx="226.13" cy="266.47" r="16.23"/><circle cx="226.13" cy="266.47" r="8.12"/><circle class="cls-3" cx="303.9" cy="264.44" r="16.23"/><circle cx="303.9" cy="264.44" r="8.12"/><rect class="cls-4" x="230.86" y="294.2" width="70.33" height="16.23" rx="6"/><circle class="cls-5" cx="344.48" cy="107.54" r="22.32"/><circle class="cls-5" cx="524.37" cy="295.55" r="22.32"/><circle class="cls-5" cx="52.32" cy="226.57" r="22.32"/></svg>`,
    hard: `<svg id="Layer_3" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 577 501"><defs><style>.cls-7{fill:#ed2024;}.cls-2{fill:#f172ac;}.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-3{stroke-width:4px;}.cls-4{stroke-width:5px;}.cls-5{fill:#fce68f;}</style></defs><path class="cls-7" d="M160.46,376.5H423.54c37.15.44,69-27.2,73.72-63.57,4.65-35.56-17.84-69.82-52.75-79.8.35-1.71,6.75-35.9-17.59-58.16-20-18.33-52-20.51-77.09-4.06A106.35,106.35,0,0,0,153.7,235.83c-29.17,11-48.59,38.64-48.69,69C104.89,337.81,127.62,367.52,160.46,376.5Z"/><circle cx="336.3" cy="273.71" r="10.82"/><circle cx="254.47" cy="274.38" r="10.82"/><circle class="cls-2" cx="242.29" cy="301.43" r="6.76"/><circle class="cls-2" cx="353.21" cy="301.43" r="6.76"/><path class="cls-3" d="M278.81,304.3c1.62-8.6,8.3-15.15,16.24-16.23,9.59-1.31,19.42,5.58,21.64,16.23"/><line class="cls-4" x1="242.29" y1="254.09" x2="272.05" y2="268.97"/><line class="cls-4" x1="316.45" y1="268.92" x2="346.21" y2="254.04"/><polygon class="cls-5" points="470.75 91.78 446.54 143.25 470.75 149.42 458.65 201.34 498 140.22 472.27 133.59 470.75 91.78"/><polygon class="cls-5" points="334.14 26.86 309.93 78.32 334.14 84.49 322.03 136.42 361.39 75.29 335.66 68.67 334.14 26.86"/><polygon class="cls-5" points="102.85 159.41 78.63 210.88 102.85 217.05 90.74 268.97 130.09 207.85 104.36 201.22 102.85 159.41"/></svg>`
};

document.addEventListener('DOMContentLoaded', function() {
	loadTasks();
});

function newElement() {
	const taskInput = document.getElementById("myInput");
	const taskText = taskInput.value.trim();
	const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')?.value;

	if (taskText) {
		const taskId = `task-${Date.now()}`;
		const difficultySVG = difficultySVGs[selectedDifficulty] || '';

		const task = {
			id: taskId,
			text: taskText,
			difficulty: selectedDifficulty,
			completed: false
		};

		addTaskToDOM(task);
		saveTask(task);
		taskInput.value = '';
	} else {
		alert("You must write something!");
	}
}

function addTaskToDOM(task) {
	const listItem = document.createElement('li');
	listItem.className = 'list-item';
	listItem.dataset.id = task.id;

	listItem.innerHTML = `
		<input type="checkbox" class="hidden-box" id="${task.id}" ${task.completed ? 'checked' : ''} 
			onchange="toggleTaskCompletion('${task.id}')" />
		<label for="${task.id}" class="check--label">
			<span class="check--label-box"></span>
			<span class="check--label-text ${task.completed ? 'completed' : ''}">${task.text}</span>
			<span class="difficulty-icon">${difficultySVGs[task.difficulty] || ''}</span>
			<span class="close" onclick="removeItem('${task.id}')">&times;</span>
		</label>
	`;

	document.getElementById('mylist').appendChild(listItem);
}

function toggleTaskCompletion(taskId) {
	const tasks = getTasks();
	const taskIndex = tasks.findIndex(task => task.id === taskId);
	
	if (taskIndex !== -1) {
		tasks[taskIndex].completed = !tasks[taskIndex].completed;
		localStorage.setItem('tasks', JSON.stringify(tasks));
		
		// Update visual state
		const labelText = document.querySelector(`li[data-id="${taskId}"] .check--label-text`);
		if (tasks[taskIndex].completed) {
			labelText.classList.add('completed');
		} else {
			labelText.classList.remove('completed');
		}
	}
}

function removeItem(taskId) {
	const tasks = getTasks();
	const updatedTasks = tasks.filter(task => task.id !== taskId);
	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	
	const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
	if (taskElement) {
		taskElement.remove();
	}
}

function clearList() {
	if (confirm("Are you sure you want to clear all tasks?")) {
		localStorage.removeItem('tasks');
		document.getElementById('mylist').innerHTML = '';
	}
}

function saveTask(task) {
	const tasks = getTasks();
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
	return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
	const tasks = getTasks();
	tasks.forEach(task => addTaskToDOM(task));
}


document.getElementById('myInput').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		newElement();
	}
});


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