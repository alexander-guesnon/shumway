module Shumway {
	import flash = AVMX.AS.flash;

	export class FlashGeom {
		constructor(context: FlashContext) {
			this.context = context;


		}

		context: FlashContext;

		init() {
			const sec = this.context.sec;

			this._temporaryRectangle = new sec.flash.geom.Rectangle();
			this.FROZEN_IDENTITY_MATRIX = Object.freeze(sec.flash.geom.Matrix.axClass.axConstruct([]));
			this.TEMP_MATRIX = sec.flash.geom.Matrix.axClass.axConstruct([]);
		}

		/**
		 * Temporary rectangle that is used to prevent allocation.
		 */
		_temporaryRectangle : flash.geom.Rectangle;

		FROZEN_IDENTITY_MATRIX: flash.geom.Matrix;

		// Must only be used in cases where the members are fully initialized and then directly used.
		TEMP_MATRIX: flash.geom.Matrix;

	}
}