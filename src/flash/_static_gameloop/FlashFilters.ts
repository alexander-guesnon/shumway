module Shumway {
	import assert = Shumway.Debug.assert;
	import flash = AVMX.AS.flash;
	import filters = flash.filters;

	export class FlashFilters {
		constructor(context: FlashContext) {
			this.context = context;


		}

		init() {
			const sec = this.context.sec;

			this.BitmapFilter = new FlashClass(sec.flash.filters.BitmapFilter);
		}

		context: FlashContext;

		BitmapFilter: FlashClass<filters.BitmapFilter>;
	}
}