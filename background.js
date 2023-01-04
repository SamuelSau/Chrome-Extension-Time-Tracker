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

// Track the time spent on the current tab
setInterval(function() {
  if (currentTab) {
    let url = currentTab.url;
    let timeSpent = localStorage.getItem(url) || 0;
    localStorage.setItem(url, ++timeSpent);
  }
}, 1000);