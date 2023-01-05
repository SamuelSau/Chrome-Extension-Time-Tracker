let timer = 0;

const timerDiv = document.createElement('div');
timerDiv.id = 'timer';
timerDiv.style.position = 'fixed';
timerDiv.style.bottom = '10px';
timerDiv.style.right = '10px';
timerDiv.style.width = '200px';
timerDiv.style.height = '100px';
timerDiv.style.borderRadius = '20px';
timerDiv.style.border = '2px solid black';
timerDiv.style.backgroundColor = 'white';
timerDiv.style.color = 'black';
timerDiv.style.fontSize = '24px';
timerDiv.style.display = 'flex';
timerDiv.style.alignItems = 'center';
timerDiv.style.justifyContent = 'center';
document.body.appendChild(timerDiv);

setInterval(() => {
	timer++;
	document.getElementById('timer').innerHTML = timer;
}, 1000);
