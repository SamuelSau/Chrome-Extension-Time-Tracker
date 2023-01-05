// Send a message to the service worker to get the elapsed time
chrome.runtime.sendMessage({ type: 'get-elapsed-time' }, function (response) {
	console.log('Time spent on website:', response.elapsedTime);

	// Create a new element to display the elapsed time
	let timeElement = document.createElement('div');
	timeElement.innerHTML = `${response.elapsedTime}`;
	timeElement.style.position = 'fixed';
	timeElement.style.bottom = '0';
	timeElement.style.right = '0';
	timeElement.style.backgroundColor = '#171717';
	timeElement.style.color = '#F7FAFF2E';
	timeElement.style.padding = '16px';
	timeElement.style.color = 'white';
	timeElement.style.padding = '10px';
	timeElement.style.zIndex = '9999';
	timeElement.style.height = '100px';
	timeElement.style.width = '350px';
	timeElement.style.borderRadius = '10%';
	timeElement.style.fontSize = '24px';
	timeElement.style.fontFamily = '-apple-system';
	timeElement.style.textAlign = 'center';
	timeElement.style.border = '2px solid white';
	timeElement.style.display = 'flex';
	timeElement.style.alignItems = 'center';
	timeElement.style.justifyContent = 'center';
	// Add the element to the body of the page
	document.body.appendChild(timeElement);
});
