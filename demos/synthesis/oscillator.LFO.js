(function () {

	var device,
		osc1,
		lfo,
		channels = 2,
		playing,
		oscInitialHz = 440,
		lfoInitialHz = 0,
		lfoAmount = 0;
		
	$(document).ready(function () {
	
		device = audioLib.AudioDevice(audioCallback, channels);
		osc = audioLib.Oscillator(device.sampleRate, oscInitialHz);
		lfo = audioLib.Oscillator(device.sampleRate, lfoInitialHz);
	
		loadUI();		
		
	});
	
	function audioCallback (buffer, channelCount) {
	
		if (playing) {
			var l = buffer.length, current, sample;
			for (current = 0; current < l; current += channelCount) {
			
				// calc. the next LFO value
				lfo.generate();
				
				// change the osc Frequency Modulation
				osc.fm = lfo.getMix() * lfoAmount;
				
				// calculate the next oscillator value
				osc.generate();
				
				// get the oscillator sample
				sample = osc.getMix();
				
				// fill left and right with the same sample
				buffer[current] = sample;
				buffer[current + 1] = sample;
			}
		}	
	}

	function loadUI () {
		$('#playButtonLFO').click(function () {
			playing = !playing;
			$('#playButtonLFO').text(playing ? 'Stop' : 'Play');
		});
		
		$('#oscWaveFormSelectLFO').change(function () {
			osc.waveShape = $(this).val();
			osc.waveShape = $(this).val();
		});
	
		$('#lfoWaveFormSelectLFO').change(function () {
			lfo.waveShape = $(this).val();
			lfo.waveShape = $(this).val();
		});

		$('#oscHzSliderLFO').slider( {
			min: 40,
			max: 1000,
			step: .5,
			value: oscInitialHz,
			change: function (event, ui) { updateOscillator(osc, ui.value); },
			slide: function (event, ui) { updateOscillator(osc, ui.value); }
		} );
	
		$('#lfoHzSliderLFO').slider( {
			min: 0,
			max: 100,
			step: .5,
			value: lfoInitialHz,
			change: function (event, ui) { updateOscillator(lfo, ui.value); },
			slide: function (event, ui) { updateOscillator(lfo, ui.value); }
		} );

		$('#lfoAmountSliderLFO').slider( {
			min: 0,
			max: 1,
			step: .01,
			value: 0,
			change: function (event, ui) { lfoAmount = ui.value; },
			slide: function (event, ui) { lfoAmount =  ui.value; }
		} );

	}
	
	function updateOscillator (oscillator, frequency) {
		oscillator.frequency = frequency;
	}
	
})();