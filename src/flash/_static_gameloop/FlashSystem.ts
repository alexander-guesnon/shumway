module Shumway {
	import assert = Shumway.Debug.assert;
	import flash = AVMX.AS.flash;
	import system = flash.system;

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