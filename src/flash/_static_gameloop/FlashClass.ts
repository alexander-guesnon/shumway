module Shumway.AVMX.AS.flash.statics {

	export class FlashClass<T> {
		cl: any;
		context: FlashContext;
		sec: ISecurityDomain;

		constructor(cl: any, context?: FlashContext) {
			this.cl = cl;
			this.context = context || null;
			this.sec = context ? context.sec: null;
		}

		objectCreate(): T {
			return Object.create(this.cl.axClass.tPrototype);
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

		FromUntyped(obj: any): T {
			return null;
		}

		checkParameterType(argument: any, name: string) {
			checkParameterType(argument, name, this.cl.axClass);
		}
	}
}
