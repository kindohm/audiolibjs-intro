(function () {

function Voice (sampleRate, frequency, length, attack, release, sustain, waveShape) {
	this.sampleRate		= isNaN(sampleRate) || sampleRate === null ? this.sampleRate : sampleRate;
	this.frequency		= isNaN(frequency) || frequency === null ? this.frequency : frequency;
	this.length		    = isNaN(length) || length === null ? this.length : length;
	this.samplesLeft	= this.length * this.sampleRate;
	this.osc		    = audioLib.Oscillator(this.sampleRate, this.frequency);
    this.osc.waveShape  = waveShape != undefined ? waveShape : 'sine';

    var attackValue     = isNaN(attack) || attack === null ? 10 : attack;
    var releaseValue    = isNaN(release) || release === null ? 100 : release;
    var sustainValue    = isNaN(sustain) || sustain === null ? 100 : sustain;

	this.envelope		= audioLib.ADSREnvelope(this.sampleRate, attackValue, 1, 1, releaseValue, sustainValue, null );   

	this.envelope.triggerGate(true);
}

Voice.prototype = {
	sampleRate:	44100,
	frequency:	440,
	sample:		0,
	length:		0.2,
	samplesLeft:	null,
	mix:		0.5,
	envelope:	null,	
	osc:		null,

	generate: function () {
		if (this.samplesLeft > 0){
            this.osc.generate();
			this.sample = this.osc.getMix();;
			this.samplesLeft--;
		}
        else{
            this.sample = 0;
        }
    	this.envelope.generate();
        this.sample = this.sample * this.envelope.getMix();
	},
	getMix:	function () {
		return this.sample;// * (ch % 2 ? this.pan : 1 - this.pan);
	},

	
};

audioLib.generators('Voice', Voice);



})();