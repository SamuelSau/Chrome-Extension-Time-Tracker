let timer = 0;

// Get the current parsedUrl
const url = window.location.href;
const newUrl = new URL(url);
const parsedUrl = newUrl.hostname;

// Create timer div
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
timerDiv.style.zIndex = '9998';

document.body.appendChild(timerDiv);

function updateTimer() {
	timer++;
	const hours = (timer / 86400) | 0;
	const minutes = ((timer % 86400) / 3600) | 0;
	const seconds = (((timer % 86400) % 3600) / 60) | 0;
	document.getElementById(
		'timer'
	).innerHTML = `${hours}h ${minutes}m ${seconds}s`;
	//Check if extension runs on the social media site
	try {
		if(chrome.runtime.id){
			// Store the elapsed time in Chrome's storage
		   chrome.storage.local.set({ [parsedUrl]: timer });
		}
	  } catch(err) {
		  console.log("Error: extension context invalidated")
	  }
	requestAnimationFrame(updateTimer);
}

requestAnimationFrame(updateTimer);
