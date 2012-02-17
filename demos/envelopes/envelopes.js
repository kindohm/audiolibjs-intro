(function () {

	var device, 
		osc,
		envelope,
		released		= false,
		releasePhase	= false,
		envelope,
		channels 		= 2;
	
	$(document).ready(function () {
		device = audioLib.AudioDevice(audioCallback, channels);
		osc = audioLib.generators.Oscillator(device.sampleRate, 440);
		envelope = audioLib.ADSREnvelope(device.sampleRate);
		loadUI();
	});
	
	function down() {
		//envelope = audioLib.ADSREnvelope(device.sampleRate);
		envelope.state = 0;
		release = false;
		releasePhase = false;
		envelope.triggerGate(true);
	}
	
	function up() {
		if (!released) {
			releasePhase = true;
			envelope.triggerGate(false);
		}	
	}
		
	function audioCallback(buffer, channelCount) {	
		
		var sample;
		
		for (var i = 0; i < buffer.length; i += channelCount) {
			sample = 0;
				
		 	//envelope.append(buffer, 1);
			envelope.generate();
			
			// state #5 is a timed release, so enter the release phase if here
			if (envelope.state === 5) {
				releasePhase = true;
			}

			// if in the release phase, release key when state cycles back to 0
			if (releasePhase && envelope.state === 0 && released === false) {
				released = true;
			} else if (released === false) { // if released, don't return any buffer
				osc.generate();
				sample = osc.getMix() * envelope.getMix();
			} 
			
			buffer[i] = sample;
			buffer[i+1] = sample;
		}
		
		
	}
	
	function loadUI () {
		$('#hitArea').mousedown(down);
		$('#hitArea').mouseup(up);
		
		$('#attackSlider').slider({
			min: 1,
			max: 1000,
			step: 1,
			value: envelope.attack,
			change: function (event, ui) { envelope.attack = ui.value; }
		});
		
		$('#decaySlider').slider({
			min: 1,
			max: 1000,
			step: 1,
			value: envelope.decay,
			change: function (event, ui) { envelope.decay = ui.value; }
		});

		$('#sustainSlider').slider({
			min: 0,
			max: 1,
			step: .01,
			value: envelope.sustain,
			change: function (event, ui) { envelope.sustain = ui.value; }
		});

		$('#releaseSlider').slider({
			min: 1,
			max: 1000,
			step: 1,
			value: envelope.release,
			change: function (event, ui) { envelope.release = ui.value; }
		});

	}	
	
})();