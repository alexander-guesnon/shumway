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

	export class MatrixClass extends FlashClass<geom.Matrix> {
		public clone(this_: geom.Matrix): geom.Matrix {
			let m = this_._data;
			return new (this.cl)(m[0], m[1], m[2], m[3], m[4], m[5]);
		}
	}

	export class PointClass extends FlashClass<geom.Point> {
		public clone(this_: geom.Point): geom.Point {
			return new (this.cl)(this_.x, this_.y);
		}
	}

	export class RectangleClass extends FlashClass<geom.Rectangle> {
		FromBounds(bounds: Bounds) {
			let xMin = bounds.xMin;
			let yMin = bounds.yMin;
			return new (this.cl)(xMin / 20, yMin / 20,
				(bounds.xMax - xMin) / 20,
				(bounds.yMax - yMin) / 20);
		}
		public clone(this_: geom.Rectangle): geom.Rectangle {
			return new (this.cl)(this_.x, this_.y, this_.width, this_.height);
		}
	}

	export class ColorTransformClass extends FlashClass<geom.ColorTransform> {
		clone(this_: geom.ColorTransform) {
			return new (this.cl)(
				this_.redMultiplier,
				this_.greenMultiplier,
				this_.blueMultiplier,
				this_.alphaMultiplier,
				this_.redOffset,
				this_.greenOffset,
				this_.blueOffset,
				this_.alphaOffset
			);
		}
	}

	export class FlashGeom {
		constructor(context: FlashContext) {
			this.context = context;
		}

		context: FlashContext;

		init() {
			const sec = this.context.sec;

			this.Point = new PointClass(sec.flash.geom.Point);
			this.Matrix = new MatrixClass(sec.flash.geom.Matrix);
			this.Matrix3D = new Matrix3DClass(sec.flash.geom.Matrix3D);
			this.PerspectiveProjection = new PerspectiveProjectionClass(sec.flash.geom.PerspectiveProjection);
			this.Rectangle = new RectangleClass(sec.flash.geom.Rectangle);
			this.ColorTransform = new ColorTransformClass(sec.flash.geom.ColorTransform);

			this._temporaryRectangle = new sec.flash.geom.Rectangle();
			this.FROZEN_IDENTITY_MATRIX = Object.freeze(sec.flash.geom.Matrix.axClass.axConstruct([]));
			this.TEMP_MATRIX = sec.flash.geom.Matrix.axClass.axConstruct([]);

			this.FROZEN_IDENTITY_COLOR_TRANSFORM = Object.freeze(sec.flash.geom.ColorTransform.axClass.axConstruct([]));
			this.TEMP_COLOR_TRANSFORM = sec.flash.geom.ColorTransform.axClass.axConstruct([]);
		}

		Point: PointClass;
		Matrix: MatrixClass;
		Matrix3D: Matrix3DClass;
		PerspectiveProjection: PerspectiveProjectionClass;
		Rectangle: RectangleClass;
		ColorTransform: ColorTransformClass;

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