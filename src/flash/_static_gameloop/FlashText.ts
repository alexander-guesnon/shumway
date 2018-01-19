module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	export class FlashText {
		constructor(context: FlashContext) {
			this.context = context;


		}

		init() {
			const sec = this.context.sec;

			this.StaticText = new FlashClass(sec.flash.text.StaticText);
		}

		context: FlashContext;

		StaticText: FlashClass<text.StaticText>;
	}
}