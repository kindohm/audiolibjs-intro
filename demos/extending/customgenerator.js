(function () {
	
	var device, 
		llamaTone,
		playing
		channels = 2;
	
	function LlamaTone (sampleRate, awesome, sweet, crazy) {
		this.osc = audioLib.generators.Oscillator(sampleRate, 440);
		this.lfo = audioLib.generators.Oscillator(sampleRate, 0);	
		this.awesome = isNaN(awesome) ? 0 : awesome;
		this.sweet = isNaN(sweet) ? 0 : sweet;
		this.crazy = isNaN(crazy) ? 0 : crazy;
	}
	
	LlamaTone.prototype = {
		osc: 		null,
		lfo: 		null,
		awesome: 	0,
		sweet:		0,
		crazy:		0,
		sample:		0,
		
		generate:	function () {
		
			this.osc.frequency = 440 + (this.awesome - 50);
			this.lfo.frequency = this.sweet;
			
			this.lfo.generate();
			this.osc.fm = this.lfo.getMix() * this.crazy;
			this.osc.generate();
			this.sample = this.osc.getMix();
		},
		
		getMix:		function () {
			return this.sample;
		},
		
		reset: 		function () {
			this.awesome = 0;
			this.sweet = 0;
			this.crazy = 0;
			this.sample = 0;
		}
	
	};

	audioLib.generators('LlamaTone', LlamaTone);	
		
	$(document).ready(function () {
		device = audioLib.AudioDevice(audioCallback, channels);
		llamaTone = audioLib.generators.LlamaTone(device.sampleRate, 0, 0, 0);
			
		loadUI();
	});	
	
	function audioCallback(buffer, channelCount) {
		if (playing) {
			var sample;
			for (var i = 0; i < buffer.length; i += channelCount) {
				sample = 0;
				llamaTone.generate();
				sample = llamaTone.getMix();
				buffer[i] = sample;
				buffer[i+1] = sample;
			}
		}
	}
	
	function loadUI () {

		$('#playButton').click(function () {
			playing = !playing;
			$('#playButton').text(playing ? 'Stop' : 'Play');
		});
		
		$('#awesomeSlider').slider({
			min: 0,
			max: 100,
			value: llamaTone.awesome,
			change: function (event, ui) { llamaTone.awesome = ui.value; },
			slide: function (event, ui) { llamaTone.awesome = ui.value; }
		});
	
		$('#sweetSlider').slider({
			min: 0,
			max: 20,
			step: 0.1,
			value: llamaTone.sweet,
			change: function (event, ui) { llamaTone.sweet = ui.value; },
			slide: function (event, ui) { llamaTone.sweet = ui.value; }
		});

		$('#crazySlider').slider({
			min: 0,
			max: 1.0,
			step: 0.01,
			value: llamaTone.crazy,
			change: function (event, ui) { llamaTone.crazy = ui.value; },
			slide: function (event, ui) { llamaTone.crazy = ui.value; }
		});

	}
	
})();