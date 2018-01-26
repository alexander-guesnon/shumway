module Shumway.flash.statics {
	export interface ISecurityDomain {
		events: EventsNamespace
		display: DisplayNamespace
		geom: GeomNamespace

		throwError(className: string, error: any, replacement1?: any,
		           replacement2?: any, replacement3?: any, replacement4?: any): void;
	}

	export class LegacyError extends Error {
		code: number;

		constructor(msg: string, code: number) {
			super(msg);
		}
	}

	export class LegacySecurityDomain implements ISecurityDomain {
		constructor() {
			const oldDomain = statics._currentDomain;
			statics._currentDomain = this;

			this.events = new EventsNamespace();
			this.utils = new UtilsNamespace();
			this.display = new DisplayNamespace();
			this.geom = new GeomNamespace();

			if (oldDomain) {
				statics._currentDomain = oldDomain;
			}
		}

		events: EventsNamespace;
		utils: UtilsNamespace;
		display: DisplayNamespace;
		geom: GeomNamespace;

		throwError(className: string, error: any, replacement1?: any,
		           replacement2?: any, replacement3?: any, replacement4?: any) {
			throw this.createError.apply(this, arguments);
		}

		createError(className: string, error: any, replacement1?: any,
		            replacement2?: any, replacement3?: any, replacement4?: any) {
			let message = formatErrorMessage.apply(null, sliceArguments(arguments, 1));

			return new LegacyError(message, error.code);
			// let mn = Multiname.FromFQNString(className, NamespaceType.Public);
			// let axClass: AXClass = <any>this.system.getProperty(mn, true, true);
			// return axClass.axConstruct([message, error.code]);
		}
	}
}
