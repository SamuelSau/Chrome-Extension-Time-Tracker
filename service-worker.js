// Keep track of the current tab
let currentTab = null;

// Update the current tab whenever the active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    currentTab = tab;
  });
});

// Update the current tab whenever a new tab is created
chrome.tabs.onCreated.addListener(function(tab) {
  currentTab = tab;
});

// Send a message to the content script to start tracking the time spent on the page
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		chrome.tabs.sendMessage(tabId, { action: 'trackTime' });
	}
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action == 'saveTimeSpent') {
		// Save the time spent on the page to chrome.storage
		chrome.storage.local.set({ [location.href]: message.timeSpent }).then(() => {
			console.log(`Total time spent in seconds: ${message.timeSpent}`);
		});
	}
});

// // Track the time spent on the current tab
// setInterval(function() {
//   if (currentTab) {
//     let url = currentTab.url;
//     // Retrieve the time spent on the page from chrome.storage
//     chrome.storage.local.get([url], function(items) {
//       let timeSpent = items[url] || 0;
//       timeSpent++;
//       // Save the updated time spent on the page to chrome.storage
//       chrome.storage.local.set({ url: timeSpent });
//     });
//   }
// }, 1000);
