// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action == "trackTime") {
      trackTimeOnPage();
    }
  });
  
  // Track the time spent on the page
  function trackTimeOnPage() {
    let timeStarted = Date.now();
  
    // Record the time every second
    let timeInterval = setInterval(function() {
      let timeElapsed = Date.now() - timeStarted;
      console.log("Time elapsed on page: " + timeElapsed);
    }, 1000);
  
    // Stop tracking time when the user leaves the page
    window.onbeforeunload = function() {
      clearInterval(timeInterval);
      console.log("Total time spent on page: " + (Date.now() - timeStarted));
    };
  }