module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	export class FlashUtils {
		constructor(context: FlashContext) {
			this.context = context;


		}

		init() {
			const sec = this.context.sec;

			this.ByteArray = new FlashClass(sec.flash.utils.ByteArray);
		}

		context: FlashContext;

		ByteArray: FlashClass<utils.ByteArray>;
	}
}
