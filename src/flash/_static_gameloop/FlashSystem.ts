module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	export class FlashSystem {
		constructor(context: FlashContext) {
			this.context = context;


		}

		init() {
			const sec = this.context.sec;

			this.JPEGLoaderContext = new FlashClass(sec.flash.system.JPEGLoaderContext);
			this.ApplicationDomain = new FlashClass(sec.flash.system.ApplicationDomain);
		}

		context: FlashContext;

		JPEGLoaderContext: FlashClass<system.JPEGLoaderContext>;
		ApplicationDomain: FlashClass<system.ApplicationDomain>;
	}
}