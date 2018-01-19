module Shumway.AVMX.AS.flash.statics {
	export class FlashClass<T> {
		cl: AXClass;

		constructor(cl: any) {
			this.cl = cl;
		}

		axConstruct(args?: any[]): T {
			return this.cl.axConstruct(args) as any;
		}

		axIsType(x: any) {
			return this.cl.axIsType(x);
		}

		isSymbol(symbolClass: any)
		{
			return this.cl.axClass === symbolClass;
		}

		isSymbolPrototype(symbolClass: any) {
			return this.cl.axClass.dPrototype.isPrototypeOf(symbolClass.dPrototype);
		}
	}
}
