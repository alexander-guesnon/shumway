module Shumway.AVMX.AS.flash.statics {

	// static fabric
	export class PerspectiveProjectionClass extends FlashClass<geom.PerspectiveProjection> {
		FromDisplayObject(displayObject: display.DisplayObject) {
			release || Debug.assert(displayObject);
			let projection: geom.PerspectiveProjection = this.axConstruct();
			projection._displayObject = displayObject;
			return projection;
		}
	}

	export class Matrix3DClass extends FlashClass<geom.Matrix3D> {
		FromArray(matrix: any) {
			let result = Object.create(this.cl.tPrototype);
			result._matrix = new Float32Array(matrix);
			return result;
		}
	}

	export class FlashGeom {
		constructor(context: FlashContext) {
			this.context = context;
		}

		context: FlashContext;

		init() {
			const sec = this.context.sec;

			this.Matrix3D = new Matrix3DClass(sec.flash.geom.Matrix3D);
			this.PerspectiveProjection = new PerspectiveProjectionClass(sec.flash.geom.PerspectiveProjection);

			this._temporaryRectangle = new sec.flash.geom.Rectangle();
			this.FROZEN_IDENTITY_MATRIX = Object.freeze(sec.flash.geom.Matrix.axClass.axConstruct([]));
			this.TEMP_MATRIX = sec.flash.geom.Matrix.axClass.axConstruct([]);

			this.FROZEN_IDENTITY_COLOR_TRANSFORM = Object.freeze(sec.flash.geom.ColorTransform.axClass.axConstruct([]));
			this.TEMP_COLOR_TRANSFORM = sec.flash.geom.ColorTransform.axClass.axConstruct([]);
		}

		Matrix3D: Matrix3DClass;
		PerspectiveProjection: PerspectiveProjectionClass;

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