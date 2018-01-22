module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;

	export class DropShadowFilterClass extends FlashClass<filters.DropShadowFilter> {
		public FromUntyped(obj: any) {
			// obj.colors is an array of RGBA colors.
			// Here it contains exactly one color object, which maps to color and alpha.
			release || assert(obj.colors && obj.colors.length === 1, "colors must be Array of length 1");
			let color: number = obj.colors[0] >>> 8;
			let alpha: number = (obj.colors[0] & 0xff) / 0xff;
			// obj.angle is represented in radians, the api needs degrees
			let angle: number = obj.angle * 180 / Math.PI;
			// obj.compositeSource maps to !hideObject
			let hideObject: boolean = !obj.compositeSource;
			return new (this.cl)(
				obj.distance,
				angle,
				color,
				alpha,
				obj.blurX,
				obj.blurY,
				obj.strength,
				obj.quality,
				obj.inner,
				obj.knockout,
				hideObject
			);
		}
	}

	export class BlurFilterClass extends FlashClass<filters.BlurFilter> {
		public FromUntyped(obj: any) {
			return new (this.cl)(obj.blurX, obj.blurY, obj.quality);
		}
	}

	export class GlowFilterClass extends FlashClass<filters.GlowFilter> {
		public FromUntyped(obj: any) {
			// obj.colors is an array of RGBA colors.
			// Here it contains exactly one color object, which maps to color and alpha.
			release || assert(obj.colors && obj.colors.length === 1, "colors must be Array of length 1");
			let color: number = obj.colors[0] >>> 8;
			let alpha: number = (obj.colors[0] & 0xff) / 0xff;
			return new (this.cl)(
				color,
				alpha,
				obj.blurX,
				obj.blurY,
				obj.strength,
				obj.quality,
				obj.inner,
				obj.knockout
			);
		}
	}

	export class BevelFilterClass extends FlashClass<filters.BevelFilter> {
		public FromUntyped(obj: any) {
			// obj.colors is an array of RGBA colors.
			// Here it contains exactly two color objects (spec might state it differently):
			//  - first maps to highlightColor and highlightAlpha;
			//  - second maps to shadowColor and shadowAlpha;
			release || assert(obj.colors && obj.colors.length === 2, "colors must be Array of length 2");
			let highlightColor: number = obj.colors[0] >>> 8;
			let highlightAlpha: number = (obj.colors[0] & 0xff) / 0xff;
			let shadowColor: number = obj.colors[1] >>> 8;
			let shadowAlpha: number = (obj.colors[1] & 0xff) / 0xff;
			// type is derived from obj.onTop and obj.innerShadow
			// obj.onTop true: type is FULL
			// obj.inner true: type is INNER
			// neither true: type is OUTER
			let type: string = flash.filters.BitmapFilterType.OUTER;
			if (!!obj.onTop) {
				type = flash.filters.BitmapFilterType.FULL;
			} else if (!!obj.inner) {
				type = flash.filters.BitmapFilterType.INNER;
			}
			// obj.angle is represented in radians, the api needs degrees
			let angle: number = obj.angle * 180 / Math.PI;
			return new (this.cl)(
				obj.distance,
				angle,
				highlightColor,
				highlightAlpha,
				shadowColor,
				shadowAlpha,
				obj.blurX,
				obj.blurY,
				obj.strength,
				obj.quality,
				type,
				obj.knockout
			);
		}
	}

	export class GradientGlowFilterClass extends FlashClass<filters.GradientGlowFilter> {
		public FromUntyped(obj: any) {
			// obj.colors is an array of RGBA colors.
			// The RGB and alpha parts must be separated into colors and alphas arrays.
			let colors: number[] = [];
			let alphas: number[] = [];
			for (let i = 0; i < obj.colors.length; i++) {
				let color = obj.colors[i];
				colors.push(color >>> 8);
				alphas.push((color & 0xff) / 0xff);
			}
			// type is derived from obj.onTop and obj.innerShadow
			// obj.onTop true: type is FULL
			// obj.inner true: type is INNER
			// neither true: type is OUTER
			let type: string = flash.filters.BitmapFilterType.OUTER;
			if (!!obj.onTop) {
				type = flash.filters.BitmapFilterType.FULL;
			} else if (!!obj.inner) {
				type = flash.filters.BitmapFilterType.INNER;
			}
			// obj.angle is represented in radians, the api needs degrees
			let angle: number = obj.angle * 180 / Math.PI;
			return new (this.cl) (
				obj.distance,
				angle,
				// Boxing these is obviously not ideal, but everything else is just annoying.
				this.sec.createArrayUnsafe(colors),
				this.sec.createArrayUnsafe(alphas),
				this.sec.createArrayUnsafe(obj.ratios),
				obj.blurX,
				obj.blurY,
				obj.strength,
				obj.quality,
				type,
				obj.knockout
			);
		}
	}

	export class ConvolutionFilterClass extends FlashClass<filters.ConvolutionFilter> {
		public FromUntyped(obj: any) {
			return new (this.cl) (
				obj.matrixX,
				obj.matrixY,
				obj.matrix,
				obj.divisor,
				obj.bias,
				obj.preserveAlpha,
				obj.clamp,
				// obj.color is an RGBA color.
				obj.color >>> 8,
				(obj.color & 0xff) / 0xff
			);
		}
	}

	export class ColorMatrixFilterClass extends FlashClass<filters.ColorMatrixFilter> {
		public FromUntyped(obj: { matrix: number[] }) {
			let filter = Object.create(this.cl.axClass.tPrototype);
			filter._matrix = obj.matrix;
			return filter;
		}
	}

	export class GradientBevelFilterClass extends FlashClass<filters.GradientBevelFilter> {
		public FromUntyped(obj: any) {
			// obj.colors is an array of RGBA colors.
			// The RGB and alpha parts must be separated into colors and alphas arrays.
			let colors: number[] = [];
			let alphas: number[] = [];
			for (let i = 0; i < obj.colors.length; i++) {
				let color = obj.colors[i];
				colors.push(color >>> 8);
				alphas.push((color & 0xff) / 0xff);
			}
			// type is derived from obj.onTop and obj.innerShadow
			// obj.onTop true: type is FULL
			// obj.inner true: type is INNER
			// neither true: type is OUTER
			let type: string = flash.filters.BitmapFilterType.OUTER;
			if (!!obj.onTop) {
				type = flash.filters.BitmapFilterType.FULL;
			} else if (!!obj.inner) {
				type = flash.filters.BitmapFilterType.INNER;
			}
			// obj.angle is represented in radians, the api needs degrees
			let angle: number = obj.angle * 180 / Math.PI;
			return new (this.cl) (
				obj.distance,
				angle,
				// Boxing these is obviously not ideal, but everything else is just annoying.
				this.sec.createArrayUnsafe(colors),
				this.sec.createArrayUnsafe(alphas),
				this.sec.createArrayUnsafe(obj.ratios),
				obj.blurX,
				obj.blurY,
				obj.strength,
				obj.quality,
				type,
				obj.knockout
			);
		}
	}


	export class FlashFilters {
		constructor(context: FlashContext) {
			this.context = context;
		}

		init() {
			const sec = this.context.sec;
			const context = this.context;

			this.BitmapFilter = new FlashClass(sec.flash.filters.BitmapFilter);
			this.DropShadowFilter = new DropShadowFilterClass(filters.DropShadowFilter);
			this.BlurFilter = new BlurFilterClass(filters.BlurFilter);
			this.GlowFilter = new GlowFilterClass(filters.GlowFilter);
			this.BevelFilter = new BevelFilterClass(filters.BevelFilter);
			this.GradientGlowFilter = new GradientGlowFilterClass(filters.GradientGlowFilter, context);
			this.ConvolutionFilter = new ConvolutionFilterClass(filters.ConvolutionFilter);
			this.ColorMatrixFilter = new ColorMatrixFilterClass(filters.ColorMatrixFilter);
			this.GradientBevelFilter = new GradientBevelFilterClass(filters.GradientBevelFilter, context);

			this.swfFilterTypes = [this.DropShadowFilter, this.BlurFilter, this.GlowFilter, this.BevelFilter,
				this.GradientGlowFilter, this.ConvolutionFilter, this.ColorMatrixFilter, this.GradientBevelFilter];
		}

		swfFilterTypes: Array<FlashClass<filters.BitmapFilter>>;

		context: FlashContext;

		BitmapFilter: FlashClass<filters.BitmapFilter>;
		DropShadowFilter: DropShadowFilterClass;
		BlurFilter: BlurFilterClass;
		GlowFilter: GlowFilterClass;
		BevelFilter: BevelFilterClass;
		GradientGlowFilter: GradientGlowFilterClass;
		ConvolutionFilter: ConvolutionFilterClass;
		ColorMatrixFilter: ColorMatrixFilterClass;
		GradientBevelFilter: GradientBevelFilterClass;
	}
}