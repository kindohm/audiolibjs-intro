(function () {
	
	var device, 
		oscillator,
		playing,
		distortion
		channels = 2;
	
	$(document).ready(function () {
		device = audioLib.AudioDevice(audioCallback, channels);
		oscillator = audioLib.Oscillator(device.sampleRate, 440);
		distortion = audioLib.Distortion(44100);
		
		$('#sinePlayButton').click(function () {
			playing = !playing;
			$('#sinePlayButton').text(playing ? 'Stop' : 'Play');
		});
	});	
	
	function audioCallback(buffer, channelCount) {
		if (playing) {
			oscillator.append(buffer, channelCount);
		}
	}
	
})();