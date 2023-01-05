let timer = 0;

const timerDiv = document.createElement('div');
timerDiv.id = 'timer';
timerDiv.style.position = 'fixed';
timerDiv.style.bottom = '10px';
timerDiv.style.right = '10px';
timerDiv.style.width = '250px';
timerDiv.style.height = '150px';
timerDiv.style.borderRadius = '25px';
timerDiv.style.border = '3px solid black';
timerDiv.style.fontWeight = 'bold';
timerDiv.style.backgroundColor = 'white';
timerDiv.style.color = 'black';
timerDiv.style.fontSize = '24px';
timerDiv.style.display = 'flex';
timerDiv.style.alignItems = 'center';
timerDiv.style.justifyContent = 'center';
document.body.appendChild(timerDiv);

// Check if the elapsed time is stored in Chrome's storage
chrome.storage.local.get(['totalElapsedTime'], (result) => {
	// If the elapsed time is stored, use it as the starting value for the timer
	if (result.totalElapsedTime) {
		timer = result.totalElapsedTime;
	}
});

setInterval(() => {
	timer++;
	const days = Math.floor(timer / 86400);
	const hours = Math.floor((timer % 86400) / 3600);
	const minutes = Math.floor(((timer % 86400) % 3600) / 60);
	const seconds = ((timer % 86400) % 3600) % 60;
	document.getElementById(
		'timer'
	).innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
	// Store the elapsed time in Chrome's storage
	chrome.storage.local.set({ totalElapsedTime: timer });
}, 1000);
