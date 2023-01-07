let ctx = document.querySelector('canvas').getContext('2d');
let timers = {};

//Query URL that our extension runs on and apply the timer value to the pie chart
async function getResults() {
	await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentUrl = tabs[0].url;

		//currentUrl contains the URL of the website that the extension is running on
		chrome.storage.local.get([currentUrl], (result) => {
			const subdomains = [
				{ name: 'Youtube', regex: /^https?:\/\/[^.]*\.youtube\.com/ },
				{ name: 'Facebook', regex: /^https?:\/\/[^.]*\.facebook\.com/ },
				{ name: 'TikTok', regex: /^https?:\/\/[^.]*\.tiktok\.com/ },
				{ name: 'WhatsApp', regex: /^https?:\/\/[^.]*\.whatsapp\.com/ },
				{ name: 'Instagram', regex: /^https?:\/\/[^.]*\.instagram\.com/ },
				{ name: 'Snapchat', regex: /^https?:\/\/[^.]*\.snapchat\.com/ },
				{ name: 'Reddit', regex: /^https?:\/\/[^.]*\.reddit\.com/ },
				{ name: 'Pinterest', regex: /^https?:\/\/[^.]*\.pinterest\.com/ },
				{ name: 'Twitter', regex: /^https?:\/\/[^.]*\.twitter\.com/ },
				{ name: 'Twitch', regex: /^https?:\/\/[^.]*\.twitch\.tv/ },
				{ name: 'Discord', regex: /^https?:\/\/[^.]*\.discordapp\.com/ },
			];

			const subdomain = subdomains.find(({ regex }) => currentUrl.match(regex));
			const { name } = subdomain;

			timers[name] = result[currentUrl];

		});
	});
}
getResults();
//PiePart = {name: name, total: timer.Youtube, shade: '#394DFZ'}
//append to results?
const results = [
	{ name: 'Youtube', total: timers.Youtube || 0, shade: '#960A2C' },
	{ name: 'Facebook', total: timers.Facebook || 0, shade: '#332E2E' },
	{ name: 'TikTok', total: timers.TikTok || 0, shade: '#F73809' },
	{ name: 'WhatsApp', total: timers.WhatsApp || 0, shade: '#960A2C' },
	{ name: 'Instagram', total: timers.Instagram || 0, shade: '#332E2E' },
	{ name: 'Snapchat', total: timers.Snapchat || 0, shade: '#F73809' },
	{ name: 'Reddit', total: timers.Reddit || 0, shade: '#960A2C' },
	{ name: 'Pinterest', total: timers.Pinterest || 0, shade: '#332E2E' },
	{ name: 'Twitter', total: timers.Twitter || 0, shade: '#F73809' },
	{ name: 'Twitch', total: timers.Twitch || 0, shade: '#F73809' },
	{ name: 'Discord', total: timers.Discord || 0, shade: '#F73809' },
];
console.log(results)

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
