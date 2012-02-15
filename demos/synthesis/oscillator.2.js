(function () {

	var device,
		osc1,
		osc2,
		channels = 2,
		playing;
		
	$(document).ready(function () {
	
		device = audioLib.AudioDevice(audioCallback, channels);
		osc1 = audioLib.Oscillator(device.sampleRate, 440);
		osc2 = audioLib.Oscillator(device.sampleRate, 300);
		
		$('#playButton2').click(function () {
			playing = !playing;
			$('#playButton2').text(playing ? 'Stop' : 'Play');
		});
		
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
	
})();