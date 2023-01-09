let ctx = document.querySelector('canvas').getContext('2d');
const timers = {
	name: '',
	timeSpent: 0,
};

//Query URL that our extension runs on and apply the timer value to the pie chart
async function getResults() {
	await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// Get the elapsed time for each website from Chrome's local storage
		chrome.storage.local.get(null, (result) => {
			// Create an array of objects representing the elapsed times for each website
			const elapsedTimes = Object.keys(result).map((key) => {
				let shade;
				switch (key) {
					case 'www.youtube.com':
						shade = '#ff0000';
						break;
					case 'www.facebook.com':
						shade = '#1877f2';
						break;
					case 'www.tiktok.com':
						shade = '#010101';
						break;
					case 'www.whatsapp.com':
						shade = '#25d366';
						break;
					case 'www.instagram.com':
						shade = '#c32aa3';
						break;
					case 'www.snapchat.com':
						shade = '#fffc00';
						break;
					case 'www.reddit.com':
						shade = '#ff5700';
						break;
					case 'www.pinterest.com':
						shade = '#bd081c';
						break;
					case 'www.twiter.com':
						shade = '#1da1f2';
						break;
					case 'www.twitch.tv':
						shade = '#9146ff';
						break;
					case 'www.discord.com':
						shade = '#5865f2';
						break;
					default:
						shade = '#000000'; // default color for websites not listed
				}
				return {
					name: key,
					timeSpent: result[key],
					shade,
				};
			});

			let sum = 0;
			let totalNumberOfWebsites = elapsedTimes.reduce(
				(sum, { timeSpent }) => sum + timeSpent,
				0
			);
			let currentAngle = 0;

			for (let name of elapsedTimes) {
				//calculating the angle the slice (portion) will take in the chart
				let portionAngle = (name.timeSpent / totalNumberOfWebsites) * 2 * Math.PI;
				//drawing an arc and a line to the center to differentiate the slice from the rest
				ctx.beginPath();
				ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
				currentAngle += portionAngle;
				ctx.lineTo(100, 100);
				//filling the slices with the corresponding mood's color
				ctx.fillStyle = name.shade;
				ctx.fill();
			}
		});
	});
}
getResults();
