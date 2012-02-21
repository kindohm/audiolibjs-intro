(function () {

	var device,
		osc1,
		osc2,
		channels = 2,
		playing,
		osc1InitialHz = 440,
		osc2InitialHz = 300;
		
	$(document).ready(function () {
	
		device = audioLib.AudioDevice(audioCallback, channels);
		osc1 = audioLib.Oscillator(device.sampleRate, osc1InitialHz);
		osc2 = audioLib.Oscillator(device.sampleRate, osc2InitialHz);
	
		loadUI();		
		
	});
	
	function audioCallback (buffer, channelCount) {
	
		if (playing) {
		
			var l = buffer.length, current;
			
			for (current = 0; current < l; current += channelCount) {
			
				osc1.generate();
				osc2.generate();
				
				buffer[current] = osc1.getMix();
				buffer[current + 1] = osc2.getMix();
			}
		}	
	}

	function loadUI () {
		$('#playButton2').click(function () {
			playing = !playing;
			$('#playButton2').text(playing ? 'Stop' : 'Play');
		});
	
		$('#osc1Slider').slider( {
			min: 40,
			max: 1000,
			step: .5,
			value: osc1InitialHz,
			change: function (event, ui) { osc1.frequency = ui.value; },
			slide: function (event, ui) { osc1.frequency = ui.value; }
		} );
	
		$('#osc2Slider').slider( {
			min: 40,
			max: 1000,
			step: .5,
			value: osc2InitialHz,
			change: function (event, ui) { osc2.frequency = ui.value; },
			slide: function (event, ui) { osc2.frequency = ui.value; }
		} );
	}
		
})();