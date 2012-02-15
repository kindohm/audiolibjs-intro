(function () {
	var module = {};
	
	var device, 
		oscillator,
		playing,
		channels = 2;
	
	$(document).ready(function () {
		device = audioLib.AudioDevice(audioCallback, channels);
		oscillator = audioLib.Oscillator(device.sampleRate, 440);

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