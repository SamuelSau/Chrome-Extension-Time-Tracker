let ctx = document.querySelector('canvas').getContext('2d');
const timers = {
	name: '',
	timeSpent: 0,
};

//Query URL that our extension runs on and apply the timer value to the pie chart
async function getResults() {
	await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

		const currentUrl = tabs[0].url;

		//currentUrl contains the URL of the website that the extension is running on
		chrome.storage.local.get([currentUrl], (result) => {
			
			const url = new URL(currentUrl);
			const websiteName = url.hostname;

			timers.name = websiteName;
			timers['timeSpent'] = result[currentUrl];
			
			console.log(timers.name); //youtube.com
			console.log(timers['timeSpent']); //2343
			console.log(timers) //name: youtube.com, timeSpent: 2343

			const results = [
				{ name: 'Youtube', total: timers.Youtube || 50, shade: '#ff0000' },
				{ name: 'Facebook', total: timers.Facebook || 50, shade: '#1877f2' },
				{ name: 'TikTok', total: timers.TikTok || 50, shade: '#010101' },
				{ name: 'WhatsApp', total: timers.WhatsApp || 50, shade: '#25d366' },
				{ name: 'Instagram', total: timers.Instagram || 50, shade: '#c32aa3' },
				{ name: 'Snapchat', total: timers.Snapchat || 50, shade: '#fffc00' },
				{ name: 'Reddit', total: timers.Reddit || 50, shade: '#ff5700' },
				{ name: 'Pinterest', total: timers.Pinterest || 50, shade: ' #bd081c' },
				{ name: 'Twitter', total: timers.Twitter || 50, shade: '#1da1f2' },
				{ name: 'Twitch', total: timers.Twitch ||50, shade: '#9146ff' },
				{ name: 'Discord', total: timers.Discord || 50, shade: '#5865f2' },
			];

			let sum = 0;
			let totalNumberOfWebsites = results.reduce((sum, { total }) => sum + total, 0);
			let currentAngle = 0;

			for (let name of results) {
				//calculating the angle the slice (portion) will take in the chart
				let portionAngle = (name.total / totalNumberOfWebsites) * 2 * Math.PI;
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

