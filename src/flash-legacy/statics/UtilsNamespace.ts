module Shumway.flash.statics {
	export class UtilsNamespace extends LegacyNamespace implements UtilsNamespace {
		constructor() {
			super();

			this.ByteArray = new ByteArrayClass();
		}

		ByteArray: ByteArrayClass;
	}
}
