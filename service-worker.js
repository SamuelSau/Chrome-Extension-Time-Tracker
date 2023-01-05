// Keep track of the number of tabs that are open
let tabCount = 0;
let startTime = 0;
// Start a timer when the first tab is opened
chrome.tabs.onActivated.addListener(function (activeInfo) {
	tabCount++;
	if (tabCount === 1) {
		// Start the timer
		startTime = Date.now();
	}
});

// Stop the timer and save the elapsed time when the last tab is closed
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	tabCount--;
	if (tabCount === 0) {
		// Stop the timer and save the elapsed time
		let elapsedTime = Date.now() - startTime;
		chrome.storage.local.set({ 'elapsed-time': elapsedTime });
	}
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === 'get-elapsed-time') {
		// Get the elapsed time from storage and send it back in the response
		chrome.storage.local.get('elapsed-time', function (items) {
			sendResponse({ elapsedTime: items['elapsed-time'] });
		});
		return true; // required to use sendResponse asynchronously
	}
});
