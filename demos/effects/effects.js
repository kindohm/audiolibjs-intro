(function () {
	var module = {};
	
	var device, 
		oscillators		= [],
		channels 		= 2;
	
	$(document).ready(function () {
		device = audioLib.AudioDevice(audioCallback, channels);

		$(document).keydown(handleKeyDown);
		$(document).keyup(handleKeyUp);

	});
	
	function handleKeyDown(e) {
		if (e.which >= 48 && e.which <= 90) {
		
			for (var i = 0; i < oscillators.length; i++) {
				if (oscillators[i].key === e.which) {
					return;
				}
			}
		
			var osc = audioLib.Oscillator(device.sampleRate, 440 + 10*(69 - e.which));
			osc.key = e.which;
			oscillators.push(osc);
			console.log('added osc. hz = ' + osc.frequency);
		}
	}
	
	function handleKeyUp(e) {
		if (e.which >= 48 && e.which <= 90 && oscillators.length > 0) {
			for (var i = 0; i < oscillators.length; i++) {
				if (oscillators[i].key === e.which) {
					oscillators.splice(i, 1);
					return;
				}
			}
		}
	}	
	
	function audioCallback(buffer, channelCount) {
		if (oscillators.length > 0) {
		
			var oscCount = oscillators.length, 
				oscMult = 1 / oscillators.length, 
				oscCurrent, 
				length = buffer.length, 
				n,
				sample;

			for (n = 0; n < length; n+=channelCount) {
				sample = 0;
				for (oscCurrent = 0; oscCurrent < oscCount; oscCurrent++) {
					oscillators[oscCurrent].generate();
					sample += oscillators[oscCurrent].getMix();	
				}
			
				buffer[n] = sample;
				buffer[n+1] = sample;			
			}
					
		}
	}
	
})();