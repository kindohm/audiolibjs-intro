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
		$('#playButtonWaveForm').click(function () {
			playing = !playing;
			$('#playButtonWaveForm').text(playing ? 'Stop' : 'Play');
		});
		
		$('#waveFormSelect').change(function () {
			osc1.waveShape = $(this).val();
			osc2.waveShape = $(this).val();
		});
	
		$('#osc1SliderWaveForm').slider( {
			min: 40,
			max: 1000,
			step: .5,
			value: osc1InitialHz,
			change: function (event, ui) { updateOscillator(osc1, ui.value); },
			slide: function (event, ui) { updateOscillator(osc1, ui.value); }
		} );
	
		$('#osc2SliderWaveForm').slider( {
			min: 40,
			max: 1000,
			step: .5,
			value: osc2InitialHz,
			change: function (event, ui) { updateOscillator(osc2, ui.value); },
			slide: function (event, ui) { updateOscillator(osc2, ui.value); }
		} );
	}
	
	function updateOscillator (oscillator, frequency) {
		oscillator.frequency = frequency;
	}
	
})();