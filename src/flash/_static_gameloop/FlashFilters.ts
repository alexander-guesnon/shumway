module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
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