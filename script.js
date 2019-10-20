let start = document.querySelector('#start');
		let pomodoro = document.querySelector('#pomodoro');
		let short = document.querySelector('#short');
		let long = document.querySelector('#long');

		start.addEventListener('click', () => {
			let pomValue = pomodoro.value;
			let shortValue = short.value;
			let longValue = long.value;
			console.log(pomValue, shortValue, longValue);
			startClock(pomValue, shortValue, longValue);
		});

		var startClock = (pomValue,shortValue,longValue) => {
			var onPom = true;
			var onShort = false;
			var onLong = false;
			var numPoms = 0;

			var now = new Date().getTime();
			var end = now + pomValue * 60000;
			console.log(((end - now) % (1000 * 60 * 60)) / (1000 * 60))
					
					setInterval(() => {
						var now = new Date().getTime();
						var distance = end - now;
						var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						var second = Math.floor((distance % (1000 * 60)) / 1000);
						var timer = document.querySelector('#timer');
						timer.innerText = minute + ':' + second;

						if(distance <= 0){
							if(onPom){
								onPom = false;
								numPoms++;
								document.querySelector('#pomCount').innerText = numPoms;
								PlaySound();
								if(numPoms != 0 && numPoms % 4 == 0){
									onLong = true;
									end = now + longValue * 60000;
									document.querySelector('#status').innerText = 'Status: Long Break'
								}else{
									onShort = true;
									end = now + shortValue * 60000;
									document.querySelector('#status').innerText = 'Status: Short Break'
								}
							}else if(onShort){
								onShort = false;
								onPom = true;
								end = now + pomValue * 60000;
								document.querySelector('#status').innerText = 'Status: Pomodoro'
								PlaySound();
							}else{
								onLong = false;
								onPom = true;
								end = now + pomValue * 60000;
								document.querySelector('#status').innerText = 'Status: Pomodoro'
								PlaySound();
							}
						} 

					},1000)

					PlaySound = function () {
						var audio = new Audio('down.mp3');
						audio.loop = false;
						audio.play(); 
					}

					}
