module Shumway {
	export class FlashClass<T> {
		axConstruct: (args: any[]) => T = null;
		axIsType: (x: any) => boolean = null;
		axClass: AVMX.AXClass;

		constructor(cl?: any) {
			if (cl) {
				this.axConstruct = (args: any[]) => {
					return cl.axConstruct(args) as any;
				}
				this.axIsType = (x: any) => {
					return cl.axIsType(x) as any;
				}
			}
		}
	}
}
