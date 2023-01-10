//Query URL that our extension runs on and apply the timer value to the pie chart
async function getResults() {
	await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// Get the elapsed time for each website from Chrome's local storage
		chrome.storage.local.get(null, (result) => {
			// Create an array of objects representing the elapsed times for each website
			let elapsedTimes = Object.keys(result).map((key) => {
				let shade; //custom colors that social media application uses
				switch (key) {
					case 'www.youtube.com':
						shade = '#ff0000';
						break;
					case 'www.facebook.com':
						shade = '#1877f2';
						break;
					case 'www.tiktok.com': //
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
					case 'twitter.com': //
						shade = '#1da1f2';
						break;
					case 'www.twitch.tv':
						shade = '#9146ff';
						break;
					case 'discord.com': //
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

			//Create the pie chart
			let sum = 0;
			let totalNumberOfWebsites = elapsedTimes.reduce(
				(sum, { timeSpent }) => sum + timeSpent,
				0
			);
			let currentAngle = 0;
			const canvas = document.querySelector('canvas');
			const ctx = canvas.getContext('2d');
			//Get the dimensions of the canvas element
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;

			//Calculate the center coordinates of the pie chart
			const centerX = width / 2;
			const centerY = height / 2;

			for (let name of elapsedTimes) {
				//Calculating the angle the slice (portion) will take in the chart
				let portionAngle =
					(name.timeSpent / totalNumberOfWebsites) * 2 * Math.PI;
				//Drawing an arc and a line to the center to differentiate the slice from the rest
				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					100,
					currentAngle,
					currentAngle + portionAngle
				);
				currentAngle += portionAngle;
				ctx.lineTo(centerX, centerY);
				//Filling the slices with the corresponding shade
				ctx.fillStyle = name.shade;
				ctx.fill();
			}

			const table = document.getElementById('time-spent-table');

			//Sort the array based on highest to lowest time spent
			elapsedTimes.sort((a, b) => b.timeSpent - a.timeSpent);

			//Dynamically display the website name, timespent (%), and total time spent
			for (let { name, timeSpent, shade } of elapsedTimes) {
				//Calculate the percentage of time spent on the website
				const percentage = (timeSpent / totalNumberOfWebsites) * 100;

				//Create a new row for the website
				const row = document.createElement('tr');

				//Create cells for the website name, percentage, and total time spent
				const nameCell = document.createElement('td');
				nameCell.textContent = name;
				row.appendChild(nameCell);

				const percentageCell = document.createElement('td');
				percentageCell.textContent = `${percentage.toFixed(2)}%`;
				row.appendChild(percentageCell);

				const timeSpentCell = document.createElement('td');
				const hours = (timeSpent / 86400) | 0;
				const minutes = ((timeSpent % 86400) / 3600) | 0;
				const seconds = (((timeSpent % 86400) % 3600) / 60) | 0;
				timeSpentCell.textContent = `${hours}h ${minutes}m ${seconds}s`;
				row.appendChild(timeSpentCell);

				const shadeCell = document.createElement('td');
				shadeCell.style.backgroundColor = shade;
				row.appendChild(shadeCell);

				//Add the row to the table
				table.appendChild(row);

				//Reset functionality
				const resetButton = document.querySelector('#reset-button');
				resetButton.addEventListener('click', resetTimers);

				function resetTimers() {
					chrome.storage.local.clear(function () {
						let error = chrome.runtime.lastError;
						if (error) {
							console.error(error);
						}
						// Reset the elapsed times and update the table and pie chart
						for (let { name, timeSpent, shade } of elapsedTimes) {
							name = null;
							timeSpent = null;
							shade = null;
						}
						removeTable();
						removeCanvas();
					});
				}

				function removeTable() {
					// Clear the table
					while (table.firstChild) {
						table.removeChild(table.firstChild);
					}
				}
				function removeCanvas() {
					// Clear the canvas
					const canvas = document.querySelector('canvas');
					const ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
			}
		});
	});
}
getResults();
