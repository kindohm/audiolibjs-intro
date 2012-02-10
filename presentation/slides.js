var SLIDES = (function () {
	
	var module = {},
		nextUri,
		prevUri,
		device,
		sampler,
		samplePitch = 440;

	module.setNext = function (next) {
		nextUri = next;
	};
	
	module.setPrev = function (prev) {
		prevUri = prev; 
	};
	
	module.next = function () {
		if (nextUri !== undefined && nextUri.length !== 0) {
			window.location.href = nextUri;
		}
	};
	
	module.prev = function () {
		if (prevUri !== undefined && prevUri.length !== 0) {
			window.location.href = prevUri;
		}
	};
	
	$(document).keyup(function (e) {		
		if (e.which === 37 || e.which === 38) {
			module.prev();
		} else if (e.which === 39 || e.which === 40) {
			module.next();
		} else if (e.which === 32) {
			sampler.noteOn(samplePitch);	
		} else if (e.which >= 49 && e.which <= 57) {
			setSamplePitch(e.which);
		}
	});
	
	function setSamplePitch (number) {
		samplePitch = 440 + 80*(number - 53);
	}

	function audioCallback(buffer, channelCount) {
		sampler.append(buffer, channelCount);
	}
	
	
	$(document).ready(function () {	

		if ($('#sample') !== undefined) {
			device = audioLib.AudioDevice(audioCallback, 2);
			sampler = audioLib.Sampler(device.sampleRate);
			var data = $('#sample').attr('src');
			data = data.substr(data.indexOf(',') + 1);
			data = atob(data);
			sampler.loadWav(data, true);
		}
		

	});
	return module;

})();

