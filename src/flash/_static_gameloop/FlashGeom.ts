module Shumway {
	import flash = AVMX.AS.flash;
	import geom = flash.geom;

	export class FlashGeom {
		constructor(context: FlashContext) {
			this.context = context;


		}

		context: FlashContext;

		init() {
			const sec = this.context.sec;

			this.Matrix3D = new FlashClass(sec.flash.geom.Matrix3D);

			this._temporaryRectangle = new sec.flash.geom.Rectangle();
			this.FROZEN_IDENTITY_MATRIX = Object.freeze(sec.flash.geom.Matrix.axClass.axConstruct([]));
			this.TEMP_MATRIX = sec.flash.geom.Matrix.axClass.axConstruct([]);

			this.FROZEN_IDENTITY_COLOR_TRANSFORM = Object.freeze(sec.flash.geom.ColorTransform.axClass.axConstruct([]));
			this.TEMP_COLOR_TRANSFORM = sec.flash.geom.ColorTransform.axClass.axConstruct([]);
		}

		Matrix3D: FlashClass<geom.Matrix3D>;

		/**
		 * Temporary rectangle that is used to prevent allocation.
		 */
		_temporaryRectangle : geom.Rectangle;

		FROZEN_IDENTITY_MATRIX: geom.Matrix;

		// Must only be used in cases where the members are fully initialized and then directly used.
		TEMP_MATRIX: geom.Matrix;

		FROZEN_IDENTITY_COLOR_TRANSFORM: geom.ColorTransform;

		// Must only be used in cases where the members are fully initialized and then directly used.
		TEMP_COLOR_TRANSFORM: geom.ColorTransform;


	}
}